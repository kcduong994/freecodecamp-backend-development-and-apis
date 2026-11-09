/**
 * Windows/local HTTP integration verification: 23 user stories.
 * Run in the project directory, with npm start running in another terminal:
 *   node --env-file=.env scripts/verify-movie-local.mjs
 *
 * Uses ONLY the public sample/demo credentials from the freeCodeCamp fixture.
 * Creates short-lived demo movies, then removes them if requests permit.
 * Never prints JWTs or the JWT signing secret.
 *
 * This is a self-contained local regression suite, not the official grader.
 */
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModification } from '../middleware/authorize.js';

const API = process.env.MOVIE_API_URL ?? 'http://127.0.0.1:3000';
const results = [];
const label = randomUUID().slice(0,8);
const parentTitle = `Local Parent Movie ${label}`;
const childTitle = `Local Child Movie ${label}`;
let parentToken, childToken, parentMovieId, childMovieId;
const basic = { username: 'dad_miller', password: 'parent456' };
const child = { username: 'jake_miller', password: 'child123' };

function mockRes() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode=code; return this; },
    json(body) { this.body=body; return this; },
    send(body) { this.body=body; return this; }
  };
}
async function api(path, {method='GET', token, body}={}) {
  const headers={};
  if (token) headers.Authorization=`Bearer ${token}`;
  if (body!==undefined) headers['Content-Type']='application/json';
  const response = await fetch(API+path, {
    method, headers,
    ...(body!==undefined?{body:JSON.stringify(body)}:{}),
    signal:AbortSignal.timeout(10000)
  });
  const raw=await response.text();
  let data;
  try { data=JSON.parse(raw); } catch { data=raw; }
  return {status:response.status, data};
}
async function test(description, fn) {
  const n=results.length+1;
  try { await fn(); results.push(true);console.log(`PASS ${n}/23 ${description}`); }
  catch(e) { results.push(false);console.error(`FAIL ${n}/23 ${description}: ${e.message}`); }
}
function listOf(data) { return Array.isArray(data)?data:
    (data?.watchlist ?? data?.movies ?? data?.list ?? data?.data ?? []); }
function getNamed(data,title) { return listOf(data).find(m=>m.title===title); }
async function watch(userId,token) {
  const r=await api(`/api/watchlist/${userId}`,{token});
  assert.equal(r.status,200);
  assert.ok(Array.isArray(listOf(r.data)),'GET did not return a movie list');
  return listOf(r.data);
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET missing. Run with: node --env-file=.env scripts/verify-movie-local.mjs');
  process.exit(1);
}

await test('HTTP server responds on port 3000', async()=>{
  const r=await api('/'); assert.equal(r.status,200);
});
await test('authenticate named export exists', async()=>{assert.equal(typeof authenticate,'function');});
await test('authenticate rejects missing bearer token with exact 401 body', async()=>{
  const r=mockRes();let next=false;
  authenticate({headers:{}},r,()=>next=true);
  assert.equal(r.statusCode,401);assert.deepEqual(r.body,{error:'No token provided.'});assert.equal(next,false);
});
await test('authenticate rejects invalid JWT with exact 401 body', async()=>{
  const r=mockRes();let next=false;
  authenticate({headers:{authorization:'Bearer x.y.z'}},r,()=>next=true);
  assert.equal(r.statusCode,401);assert.deepEqual(r.body,{error:'Invalid or expired token.'});assert.equal(next,false);
});
await test('authenticate sets req.user and calls next for valid JWT',async()=>{
  const token=jwt.sign({id:3,username:'jake_miller',role:'child'},process.env.JWT_SECRET,{expiresIn:'1h'});
  const req={headers:{authorization:`Bearer ${token}`}};
  const r=mockRes();let next=false;authenticate(req,r,()=>next=true);
  assert.equal(next,true);assert.equal(req.user.id,3);assert.equal(req.user.role,'child');
});
await test('authorizeModification named export exists',async()=>{assert.equal(typeof authorizeModification,'function');});
await test('role policy: parent and child-own pass, child-other gets 403',async()=>{
  for(const [role,id,userId,allowed] of [['parent',1,'3',true],['child',3,'3',true],['child',3,'1',false]]){
    const r=mockRes();let next=false;
    authorizeModification({user:{role,id},params:{userId}},r,()=>next=true);
    if(allowed)assert.equal(next,true);
    else {assert.equal(next,false);assert.equal(r.statusCode,403);assert.deepEqual(r.body,{error:'Access denied'});}
  }
});
await test('login rejects missing username/password (400)',async()=>{
  for(const body of [{},{username:basic.username}]) assert.equal((await api('/api/auth/login',{method:'POST',body})).status,400);
});
await test('login rejects unknown username (401)',async()=>{
  assert.equal((await api('/api/auth/login',{method:'POST',body:{username:'ghost_user',password:'wrong'}})).status,401);
});
await test('login rejects wrong password (401)',async()=>{
  assert.equal((await api('/api/auth/login',{method:'POST',body:{username:basic.username,password:'wrong-password'}})).status,401);
});
await test('login issues JWT to valid parent and child (200)',async()=>{
  const p=await api('/api/auth/login',{method:'POST',body:basic});
  assert.equal(p.status,200);assert.equal(typeof p.data?.token,'string');parentToken=p.data.token;
  const c=await api('/api/auth/login',{method:'POST',body:child});
  assert.equal(c.status,200);assert.equal(typeof c.data?.token,'string');childToken=c.data.token;
});
await test('watchlist rejects missing Authorization (401)',async()=>{
  assert.equal((await api('/api/watchlist/1')).status,401);
});
await test('watchlist rejects malformed Authorization (401)',async()=>{
  assert.equal((await api('/api/watchlist/1',{token:'malformed.token.value'})).status,401);
});
await test('child can read parent watchlist (200)',async()=>{
  const list=await watch(1,childToken);
  assert.ok(list.some(m=>m.title==='The Dark Knight'),'Seed movie missing: The Dark Knight');
});
await test('parent can add movie to a child watchlist (201)',async()=>{
  const r=await api('/api/watchlist/3/movies',{method:'POST',token:parentToken,body:{title:parentTitle,genre:'Drama'}});
  assert.equal(r.status,201);
  const list=await watch(3,parentToken);const movie=list.find(m=>m.title===parentTitle);
  assert.ok(movie,'New parent movie not persisted');parentMovieId=movie.id;
});
await test('child cannot add movie to another watchlist (403)',async()=>{
  const r=await api('/api/watchlist/1/movies',{method:'POST',token:childToken,body:{title:'Blocked',genre:'Action'}});
  assert.equal(r.status,403);
});
await test('child can add movie to own watchlist (201)',async()=>{
  const r=await api('/api/watchlist/3/movies',{method:'POST',token:childToken,body:{title:childTitle,genre:'Action'}});
  assert.equal(r.status,201);
  const list=await watch(3,childToken);const movie=list.find(m=>m.title===childTitle);
  assert.ok(movie,'New child movie not persisted');childMovieId=movie.id;
});
await test('parent can update any child watchlist movie (200)',async()=>{
  assert.ok(parentMovieId!=null,'Create test 15 failed');
  const r=await api(`/api/watchlist/3/movies/${parentMovieId}`,{method:'PUT',token:parentToken,body:{watched:true}});
  assert.equal(r.status,200);
  assert.equal((await watch(3,parentToken)).find(m=>m.id===parentMovieId)?.watched,true);
});
await test('child cannot update other user movie (403)',async()=>{
  assert.equal((await api('/api/watchlist/1/movies/1',{method:'PUT',token:childToken,body:{watched:true}})).status,403);
});
await test('child can update own movie (200)',async()=>{
  assert.ok(childMovieId!=null,'Create test 17 failed');
  const r=await api(`/api/watchlist/3/movies/${childMovieId}`,{method:'PUT',token:childToken,body:{watched:true}});
  assert.equal(r.status,200);
  assert.equal((await watch(3,childToken)).find(m=>m.id===childMovieId)?.watched,true);
});
await test('parent can delete movie (200)',async()=>{
  assert.ok(parentMovieId!=null,'Create test 15 failed');
  const r=await api(`/api/watchlist/3/movies/${parentMovieId}`,{method:'DELETE',token:parentToken});
  assert.equal(r.status,200);
  assert.ok(!(await watch(3,parentToken)).some(m=>m.id===parentMovieId));parentMovieId=null;
});
await test('child cannot delete another user movie (403)',async()=>{
  assert.equal((await api('/api/watchlist/1/movies/1',{method:'DELETE',token:childToken})).status,403);
});
await test('child can delete own movie (200)',async()=>{
  assert.ok(childMovieId!=null,'Create test 17 failed');
  const r=await api(`/api/watchlist/3/movies/${childMovieId}`,{method:'DELETE',token:childToken});
  assert.equal(r.status,200);
  assert.ok(!(await watch(3,childToken)).some(m=>m.id===childMovieId));childMovieId=null;
});

// Best-effort cleanup if an earlier step failed after adding demo data.
for(const id of [parentMovieId,childMovieId]) {
  if(id!=null && parentToken) {
    try {await api(`/api/watchlist/3/movies/${id}`,{method:'DELETE',token:parentToken});}
    catch(e) {console.error(`Cleanup warning: movie id ${id}: ${e.message}`);}
  }
}
const passed=results.filter(Boolean).length;
console.log(`\nIntegration results: ${passed}/23 ${passed===23?'PASS':'INCOMPLETE'}`);
process.exitCode=passed===23?0:1;
