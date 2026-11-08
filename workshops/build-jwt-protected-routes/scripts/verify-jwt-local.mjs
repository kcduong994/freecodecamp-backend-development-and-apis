/**
 * Local integration verification for freeCodeCamp Build JWT Protected Routes.
 * Start the server on port 8800 in another terminal first:
 *   npm.cmd start
 * Run with the local JWT secret loaded (not printed):
 *   node --env-file=.env scripts/verify-jwt-local.mjs
 *
 * IMPORTANT: Registers a disposable fake user in data/users.json.
 */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jwt from "jsonwebtoken";

const baseURL = "http://127.0.0.1:8800";
const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const userFile = path.join(projectDir, "data/users.json");
const email = `verify_${randomUUID()}@example.test`;
const password = `DevTest!${randomUUID()}`;
const checks = [];

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing. Run: node --env-file=.env scripts/verify-jwt-local.mjs");
}

async function request(endpoint, { method = "GET", token, body } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const response = await fetch(`${baseURL}${endpoint}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(10000),
  });
  const data = await response.json();
  return { status: response.status, data };
}

async function check(description, fn) {
  try {
    await fn();
    checks.push(true);
    console.log(`PASS ${checks.length}/7: ${description}`);
  } catch (error) {
    checks.push(false);
    console.error(`FAIL ${checks.length}/7: ${description} — ${error.message}`);
  }
}

let registerToken;
let loginToken;

await check("Registration returns 201 and JWT; password is hashed", async () => {
  const r = await request("/api/auth/register", {
    method: "POST", body: { email, password },
  });
  assert.equal(r.status, 201);
  assert.equal(typeof r.data.token, "string");
  registerToken = r.data.token;
  const users = JSON.parse(await readFile(userFile, "utf8"));
  const user = users.find((u) => u.email === email);
  assert.ok(user, "Registered user is missing from the users JSON file");
  assert.equal(user.role, "user");
  assert.equal(typeof user.passwordHash, "string");
  assert.ok(user.passwordHash.startsWith("$2"), "Password is not stored as bcrypt hash");
  assert.ok(!Object.hasOwn(user, "password"), "Plain-text password leaked into stored data");
});

await check("Login with valid credentials returns 200 and JWT", async () => {
  const r = await request("/api/auth/login", {
    method: "POST", body: { email, password },
  });
  assert.equal(r.status, 200);
  assert.equal(typeof r.data.token, "string");
  loginToken = r.data.token;
  const wrong = await request("/api/auth/login", {
    method: "POST", body: { email, password: "WrongPassword" },
  });
  assert.equal(wrong.status, 401);
});

await check("Profile without JWT returns 401", async () => {
  const r = await request("/api/auth/profile");
  assert.equal(r.status, 401);
});

await check("Profile with valid JWT returns 200 and correct identity", async () => {
  assert.ok(registerToken, "Registration step must pass first");
  const r = await request("/api/auth/profile", { token: registerToken });
  assert.equal(r.status, 200);
  assert.equal(r.data.user.email, email);
});

await check("Normal user cannot view admin users (403)", async () => {
  assert.ok(registerToken, "Registration step must pass first");
  const r = await request("/api/admin/users", { token: registerToken });
  assert.equal(r.status, 403);
});

await check("Local test admin token lists users without password hashes", async () => {
  const adminToken = jwt.sign(
    { id: "local-admin-test", email: "local-admin@example.test", role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  const r = await request("/api/admin/users", { token: adminToken });
  assert.equal(r.status, 200);
  assert.ok(Array.isArray(r.data.users));
  for (const user of r.data.users) {
    assert.ok(!Object.hasOwn(user, "passwordHash"));
  }
});

await check("Logout invalidates JWT so reuse returns 401", async () => {
  assert.ok(loginToken, "Login step must pass first");
  const logout = await request("/api/auth/logout", { method: "POST", token: loginToken });
  assert.equal(logout.status, 200);
  const after = await request("/api/auth/profile", { token: loginToken });
  assert.equal(after.status, 401);
});

const passed = checks.filter(Boolean).length;
console.log(`\nIntegration results: ${passed}/7 ${passed === 7 ? "PASS" : "FAIL"}`);
console.log("NOTE: A disposable test account was written to data/users.json (not to GitHub).");
if (passed !== 7) process.exitCode = 1;
