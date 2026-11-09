# Back-End Development and APIs — Final Conceptual Review

> A technical synthesis of how web back ends work: **request → validation → application logic → persistence → response**. This is an explanation-oriented study guide, not a transcript of freeCodeCamp lessons or a copy of their graders.

## How to use this review

Read the first eight chapters as the foundations, then follow a request through Node.js, Express, persistence, security, and testing. For every feature, apply six questions:

1. **What did we learn?** Identify the concept and why it exists.
2. **What does the server receive?** Method, URL, headers, body, connection, and context.
3. **What does the server do?** Routing, parsing, authentication, validation, business rules, I/O.
4. **What does the server return?** Status, headers, body, or a persistent connection.
5. **What can fail?** Input, access control, dependency, data, network, or server error.
6. **How do we test it?** Reproduce expected and failure cases, assert observable behavior.

Mental model:

```text
Browser / API client
    │  HTTP request (method + URL + headers + optional body)
    ▼
Node.js HTTP server
    ▼
Express middleware pipeline
    ▼
Router → controller/handler → service/business rules
    ▼
Data source: file, database, external API, or in-memory state
    ▼
HTTP response (status + headers + JSON/HTML/text)
    │
    ▼
Client interprets status and response data
```

A WebSocket connection extends this model: after the HTTP upgrade, the two endpoints can exchange messages bidirectionally rather than following one request/one response for every message.

---

# Part I — Web and API Foundations

## 1. How a website works

A website is a system of resources, connections, and processes—not merely an HTML file. A user enters a URL, the browser resolves the host (usually via DNS), establishes a connection, negotiates TLS for HTTPS, sends an HTTP request, and receives a response. The browser parses HTML, requests referenced CSS/JavaScript/images, builds its rendering model, and runs client-side JavaScript.

**Receive:** the server sees an HTTP request, not a rendered browser page. **Process:** choose a resource or application handler. **Return:** bytes and metadata such as `Content-Type`, status and caching policy. **Failures:** DNS/TLS errors, unreachable port, 404, 500, bad assets, or client JavaScript errors. **Test:** browser Network panel plus `curl -i` and the server terminal.

Distinguish *network delivery* from *application correctness*: `HTTP 200` only confirms the request was handled; it does not prove that the returned content or business result is right.

## 2. Front-end and back-end responsibilities

- **Front end:** displays interface, gathers input, manages client-side state, sends requests, presents results and errors. Client-side validation is useful for UX but cannot enforce security.
- **Back end:** accepts requests, authenticates identities, authorizes operations, validates untrusted input, enforces business rules, stores/reads data, and controls server-side secrets.
- **Infrastructure:** DNS, TLS termination, reverse proxies, storage, operating system, process manager, logging and deployment environments.

Example: a client may hide an “Admin” button. That does not prevent someone from sending an HTTP request manually. The server must still check the user's permissions.

**Design test:** Can someone bypass the visual interface and call the endpoint directly? If yes—and this is almost always possible—permissions must be enforced server-side.

## 3. Client–server architecture

**Client** and **server** are roles in an interaction, not necessarily different physical machines. A browser, mobile app, CLI and another server can all be API clients. A server can become a client when it calls a weather service or another API.

A TCP connection can be established locally with `127.0.0.1` or remotely. `localhost` refers to the machine where the client runs; it does not automatically refer to a different computer, container, or Codespace.

**Stateless HTTP** means each request should carry enough context to be processed; this does not mean an application cannot use a database, sessions, or cache. State may be stored server-side even when the HTTP interface is stateless.

**Test:** In one terminal run the process; in a *second* terminal send requests to the appropriate address/port. `ECONNREFUSED` or Node `fetch failed` is a connection problem, not evidence that route logic is wrong.

## 4. HTTP requests, responses, and status codes

An HTTP request consists of a method, a target, headers, and sometimes a body. A response consists of a status code, headers, and optionally a body.

```http
POST /api/auth/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"username":"example","password":"example-password"}
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error":"Invalid credentials."}
```

| Method | Usual purpose | Typical property |
|---|---|---|
| `GET` | Retrieve a representation | Safe and idempotent by design |
| `POST` | Create or process a submission | Generally not idempotent |
| `PUT` | Replace/update a target resource | Idempotent by HTTP semantics |
| `PATCH` | Partial modification | Idempotence depends on operation |
| `DELETE` | Remove a resource | Idempotent by HTTP semantics |

**Idempotent** means repeating the same operation has the same intended state effect, not that every repeated response has the same status/body.

| Status | Meaning | Example |
|---|---|---|
| `200 OK` | Successful request | Read/update/delete response |
| `201 Created` | New resource created | Register user or add movie |
| `204 No Content` | Success without a response body | Certain deletes |
| `400 Bad Request` | Malformed or insufficient input | Missing required fields |
| `401 Unauthorized` | Authentication needed/invalid | Missing or expired bearer token |
| `403 Forbidden` | Authenticated but not allowed | Child edits another user's list |
| `404 Not Found` | Requested resource not found | Unknown user/movie |
| `409 Conflict` | State conflict | Duplicate registration |
| `429 Too Many Requests` | Rate limit | Login abuse mitigation |
| `500 Internal Server Error` | Server-side failure | Uncaught application exception |
| `503 Service Unavailable` | Service unavailable | Overloaded or dependency unavailable |

**Receive:** method, URL, headers and body. **Do:** parse, route, validate, perform action. **Return:** a status appropriate to the outcome. **Failures:** mismatched method, wrong path, invalid JSON, missing credentials, resource conflict. **Test:** positive and negative requests with explicit status assertions.

## 5. URLs, routes, endpoints and parameters

A URL identifies how a resource is located:

```text
https://api.example.test:443/api/watchlist/3/movies/7?include=details
└scheme┘ └── host ──┘port └──── path ─────────┘└── query ───┘
```

- **Route:** method and path pattern registered by a server, such as `router.get('/:userId', ...)`.
- **Endpoint:** a callable API operation, commonly specified by method plus route.
- **Path parameter:** `req.params.userId` in `/api/watchlist/:userId`.
- **Query parameter:** `req.query.page` in `?page=2`.
- **Request body:** data submitted by a client, parsed for example by `express.json()`.
- **Header:** protocol metadata such as `Authorization` or `Content-Type`.

Important JavaScript detail: Express route params are strings. A starter data helper comparing numeric `user.id` with `req.params.userId` by `===` will fail unless types are normalized or converted safely.

**Test:** compare `/api/watchlist/3` with `/api/watchlist/03`, `/api/watchlist/not-a-number`, and an unknown numeric ID. Decide the expected contract rather than trusting coercion implicitly.

## 6. JSON as a data exchange format

JSON represents objects, arrays, strings, numbers, booleans and `null`; it does not represent JavaScript functions, `undefined`, comments or native `Date` objects. JSON property names and string values use double quotes.

```json
{"user":{"id":3,"role":"child"},"movies":[{"id":1,"title":"Sample","watched":false}]}
```

- `JSON.stringify(value)` creates JSON text from a JavaScript value.
- `JSON.parse(text)` parses JSON text into JavaScript values and can throw on malformed input.
- `res.json(value)` serializes a response and sets an appropriate JSON content type.
- `express.json()` parses incoming JSON bodies for matching content types.

**Receive:** raw bytes of a JSON document. **Do:** decode/parse, validate the *shape* and allowed values, then execute logic. **Return:** a stable response schema. **Failures:** invalid syntax, missing fields, unexpected types, cyclic structures during stringify. **Test:** malformed JSON, valid but wrong types, arrays/objects, and empty bodies.

JSON is a format, **not** a database and **not** automatic input validation.

## 7. Node.js: the server-side JavaScript runtime

Node.js runs JavaScript outside the browser and provides runtime APIs for files, networking, processes, streams and OS information. Browser-specific globals such as `document` are not generally available in a Node.js process.

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hello from Node.js');
});
server.listen(3000);
```

`node file.js` executes a module. The **REPL** (Read–Eval–Print Loop) evaluates expressions interactively. `process.env` exposes environment variables to the current process. `process.cwd()` is the working directory; `import.meta.dirname` is the module's directory in supported Node versions. They are not interchangeable.

**Test:** print only safe metadata such as port and current directory. Never print signing secrets or passwords to debug configuration.

## 8. The API mental model

An **API** is an interface/contract through which one component interacts with another. An **HTTP API** exposes operations through URLs, methods and responses; **REST** is a set of architectural constraints, not simply “any JSON endpoint.”

A good API contract specifies:

1. Resource names and routes.
2. Input fields, types and validation.
3. Authentication and authorization rules.
4. Success and failure status codes.
5. JSON response structure and error representation.
6. Idempotence expectations, side effects and persistence.
7. Tests for both allowed and forbidden behavior.

Example contract: `GET /api/watchlist/:userId` requires a JWT, permits any authenticated family member to read, returns `200 {"watchlist":[...]}` for an existing user, `401` if unauthenticated and `404` for an unknown user.

**Core principle:** A route is correct only when status, body, authorization and state changes all match its contract.

---

# Part II — JavaScript and Node.js for Back-End Work

## 9. Modules, packages, npm and the dependency graph

**ES modules (ESM)** use `import` and `export`. A named export such as `export function authenticate(...)` is imported with braces; a default export is imported without braces. A grader expecting a *named* export will not accept the right function exported only as default.

```js
// middleware/authenticate.js
export function authenticate(req, res, next) { /* ... */ }
// routes/watchlist.js
import { authenticate } from '../middleware/authenticate.js';
```

- `package.json`: metadata, scripts, declared direct dependencies and module type.
- `package-lock.json`: resolved dependency graph and integrity metadata for reproducible installs.
- `node_modules/`: installed packages; normally ignored by Git.
- `npm i`: install/update dependencies according to package constraints.
- `npm ci`: clean install from lockfile; useful in CI and for reproducing a project.
- `npm audit --omit=dev`: inspect published advisory findings for the production dependency tree; it does **not** prove an application secure or insecure by itself.

Avoid reflexive `npm audit fix --force`: major upgrades may break an exercise. Investigate advisory scope, installed version and compatible fixes, then rerun tests. A passing functional test suite and a clean security audit answer different questions.

## 10. JavaScript data, equality and defensive programming

Important distinctions:

- `===` compares values without implicit type coercion; `3 !== '3'`.
- `??` uses the right side only for `null` or `undefined`, unlike `||` which also triggers for `0`, `false` and `''`.
- `?.` safely navigates potentially absent properties.
- Array `.map()` transforms each element; `.find()` returns one matching element or `undefined`.
- Destructuring and rest syntax can exclude sensitive properties from responses.

```js
const safeUsers = users.map(({ passwordHash, ...publicUser }) => publicUser);
```

A field existing is not enough; its **type, length, range and semantics** matter. In real services, validate structured input before using it and prefer explicit allowlists of writable properties to spreading arbitrary client-supplied objects into persisted records.

## 11. Synchronous, asynchronous and concurrent execution

A synchronous call blocks the executing JavaScript thread until it finishes. Asynchronous operations can yield to the event loop while waiting for I/O. A Promise represents a future completion or failure; `async`/`await` makes Promise-based control flow easier to read.

```js
try {
  const response = await fetch('https://api.example.test/data');
  if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);
  const data = await response.json();
  // Handle validated data.
} catch (err) {
  // Distinguish networking, parsing and upstream HTTP errors.
}
```

**Key distinction:** `fetch()` normally rejects on network failures, but **does not reject merely because the server returned HTTP 404 or 500**. Check `response.ok` or `response.status` explicitly.

Node.js is not “one operation at a time” for I/O: the event loop coordinates callbacks and concurrent I/O. CPU-heavy synchronous work can still stall request handling. Correctness also requires considering race conditions, write ordering and shared mutable state.

## 12. File systems, paths, buffers and streams

- `fs.readFileSync` and `fs.writeFileSync` provide simple synchronous file access, often sufficient for small educational exercises.
- Asynchronous file APIs avoid blocking the event loop while I/O is pending.
- `path.join(...)` handles path separators appropriately across operating systems.
- Relative paths may resolve against the *current working directory*, which can differ between VS Code terminals and the module directory.
- **Buffers** represent raw binary data; **streams** process data incrementally instead of requiring it all in memory.

In a production data service, naïve read–modify–write to one JSON file is vulnerable to concurrent writes and process failures. Training fixtures demonstrate persistence concepts but are not a substitute for a transactional database.

**Test:** missing files, malformed JSON, write permissions, empty file, unexpected working directory and large input.

## 13. Algorithms, testing and module boundaries

Separate pure computation from side effects where practical. A case converter or prime checker is easy to test with inputs/outputs because its results do not depend on the network. HTTP handlers additionally require testing headers, authentication, status, data changes and external failures.

| Level | What to test | Example |
|---|---|---|
| Unit | Pure or isolated function | Is a number prime? |
| Module | Named/default exports and contracts | Does `authenticate` call `next()`? |
| Integration | Multiple components together | Does login return a usable JWT? |
| End-to-end | Client-visible workflow | Login → add movie → read → delete |
| Security regression | Forbidden actions remain forbidden | Child attempts to edit another user |

A successful `npm install` is not an application test. Conversely, `23/23 PASS` is strong evidence for those 23 scenarios but not a complete security assessment.

---

# Part III — HTTP Servers, Express and API Design

## 14. Native Node.js HTTP server versus Express

With `http.createServer`, the handler directly inspects `req.method`, `req.url` and writes responses. Express adds a routing and middleware abstraction while still relying on Node's HTTP server machinery.

```js
import express from 'express';
const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.listen(3000);
```

Express is not a database, a firewall or an authentication system. It does not automatically validate request bodies or enforce permissions; those remain application responsibilities.

## 15. Middleware: ordered request processing

Middleware functions receive `(req, res, next)`. They may change request state, terminate the response, or call `next()` to continue. Execution order matters.

```js
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
```

A protected route normally runs **authentication before authorization before the handler**:

```text
Request → parse JSON → authenticate JWT → authorize action → handler → response
                             │                    │
                             └─ invalid: 401       └─ forbidden: 403
```

The Express error-handling middleware has **four arguments** `(err, req, res, next)` and should be registered after the routes it handles. In Express 5, rejected Promises in async route handlers are forwarded to error handling. Guard against disclosing internal stack traces and sensitive details in production.

**Test:** missing token, invalid token, correct token/insufficient role, correct token/allowed role, thrown async handler exception.

## 16. Input processing, forms and validation

A server should validate all user-supplied values—not just forms in the browser. Relevant sources include route params, query strings, JSON bodies, headers, file uploads and upstream APIs.

A useful order is:

```text
Parse → validate shape → normalize carefully → authenticate → authorize →
apply business rules → persist → return a defined response
```

Actual order of authentication, validation and parsing depends on the endpoint. Do not perform privileged state changes before authorization. Treat user content as data, not executable source or shell commands. Use parameterized database queries when using SQL, and escape untrusted data when rendering HTML.

For an update endpoint, only update fields explicitly allowed by its contract (for example `title`, `genre`, `watched`); do not allow a user to update another user's role or the server-managed movie ID through a generic object spread.

## 17. REST resources and CRUD lifecycle

**CRUD** means Create, Read, Update, Delete. Example watchlist resource:

| Operation | Example | Expected state effect |
|---|---|---|
| Create | `POST /api/watchlist/3/movies` | A new movie is added |
| Read | `GET /api/watchlist/3` | Existing list is returned |
| Update | `PUT /api/watchlist/3/movies/7` | Movie 7 changes |
| Delete | `DELETE /api/watchlist/3/movies/7` | Movie 7 no longer exists |

A good test verifies not only the HTTP status but also the **subsequent persisted state**: after POST the new movie can be read; after PUT fields reflect the update; after DELETE the movie is absent.

A naming convention should make clear whether a resource is a user, a list or a movie. One URL pattern can support multiple methods, but each method has its own contract.

## 18. JSON-file persistence and consistency

The educational bank and movie-watchlist exercises demonstrate the distinction between *process memory* and *persistent storage*.

- A process-local array or `Set` is lost on restart.
- A JSON file survives process restart but is not transactional and can have concurrent-write problems.
- A database can provide concurrency controls, indexes, constraints, transactions and robust recovery depending on its design.

A typical file-backed mutation:

```text
Receive request → check user/permissions → read current data →
validate target → calculate updated state → write data → reply
```

Common failure cases: file missing, invalid JSON, corrupt encoding, permission denied, interrupted writes, simultaneous updates, and an ID not found. Track the difference between a validation error (`400`), an absent resource (`404`) and a server storage failure (`500`).

## 19. Calling external APIs and consuming upstream responses

An application can consume other HTTP services, transform their data and return a smaller contract to its clients. This can hide API keys on the server, normalize inconsistent upstream responses and centralize error handling.

The failure chain can involve: DNS, TLS, timeout, upstream rate limits, upstream 4xx/5xx, malformed JSON, missing fields, and an invalid application mapping. Use timeouts and validate upstream results. Don't expose API keys through query strings or responses unless the provider contract makes their publication explicitly safe.

**Diagnostic question:** Did our server fail before making the upstream request, during transport, while parsing the response, or while mapping the data?

---

# Part IV — Realtime Systems and Security

## 20. WebSockets and persistent two-way communication

HTTP is predominantly request/response. A WebSocket starts with an HTTP upgrade and then supports full-duplex messages over one persistent connection.

```text
Client A ─── WebSocket ──┐
                        ├── Server broadcasts chat/system events
Client B ─── WebSocket ──┘
```

A chat server typically handles `connection`, `message` and `close`. Broadcasts should check that each recipient is open. JSON messages need an explicit schema (`type`, sender, text). Validate user-provided messages to prevent oversized payloads, malformed JSON and unwanted display behavior. A connection closing unexpectedly is normal in real networks and should be handled.

**Test:** two independent browser tabs or clients, join/leave notifications, sender receiving broadcasts, invalid message behavior, reconnection and resource cleanup.

## 21. Security and privacy principles

**Security** protects confidentiality, integrity and availability. **Privacy** concerns how personal data is collected, used, retained, shared and controlled. They overlap but are not interchangeable.

- **HTTPS/TLS:** protects data in transit against passive observation and many active network attacks; does not correct a vulnerable application.
- **Same-Origin Policy (SOP):** browser security boundary restricting certain cross-origin interactions.
- **CORS:** a mechanism by which servers allow selected cross-origin browser access. CORS is **not authentication** and does not prevent non-browser clients from calling an API.
- **Cookies:** can carry state; relevant flags include `HttpOnly`, `Secure` and `SameSite`, with scope/expiry configured appropriately.
- **Content Security Policy (CSP):** can restrict resource execution/loading and reduce classes of injection impact.
- **Permissions-Policy:** controls availability of selected browser capabilities.
- **Secrets:** never commit `.env` or log plaintext credentials, JWT signing keys or live API tokens.
- **Least privilege:** grant only required operations and validate ownership on each sensitive route.
- **Availability:** rate limits, input bounds and resource cleanup help resist accidental overload and abuse.

An API returning 200, passing functional tests, or using `helmet()` is not automatically secure. Threat models, dependency management, validation and deployment controls remain essential.

## 22. Authentication: identities, password hashing and JWTs

**Authentication** asks: *Who is making this request?* The server must verify a claimed identity rather than trusting a client-submitted username or role.

1. Read login credentials over a protected channel.
2. Find the account by a stable identifier.
3. Compare the supplied password with the stored **hash** using `bcrypt.compare()`.
4. If valid, sign a JWT with a private server secret, appropriate claims and expiration.
5. Client sends `Authorization: Bearer <token>` to protected routes.
6. Server verifies signature, expiry and required claims before adding trusted identity data to `req.user`.

```js
const token = jwt.sign(
  { id: user.id, username: user.username, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);
```

**Hashing** a password differs from **encrypting** it: a password hash is intended for verification, not recovery. Use a password-hashing algorithm designed for passwords, with proper salt/work factor. Never store plaintext passwords.

JWT parts are typically `header.payload.signature` encoded in URL-safe Base64. The payload is **encoded, not secret**; anyone holding a token can usually read its non-encrypted claims. A signature prevents undetected modification when verified properly; it does not encrypt the claims. Keep JWT claims minimal and never place passwords or secrets inside them.

**Failure scenarios:** incorrect password (`401`), missing Bearer header (`401`), expired/bad signature (`401`), missing signing secret (server configuration error), and role claims no longer reflecting current permissions.

## 23. Authorization: RBAC and resource ownership

**Authorization** asks: *What is this authenticated identity allowed to do?* Role-Based Access Control (RBAC) uses roles such as `parent`, `child` and `admin`, but ownership checks are also important.

```js
export function authorizeModification(req, res, next) {
  const { id, role } = req.user ?? {};
  const ownsList = String(id) === String(req.params.userId);
  if (role === 'parent' || (role === 'child' && ownsList)) return next();
  return res.status(403).json({ error: 'Access denied' });
}
```

| Account / action | Read any watchlist | Modify own | Modify another's |
|---|---|---|---|
| Parent | Allowed | Allowed | Allowed |
| Child | Allowed | Allowed | Forbidden (`403`) |
| No valid JWT | Forbidden (`401`) | Forbidden (`401`) | Forbidden (`401`) |

**Ordering matters:** JWT verification must happen before role inspection; a forged `role: 'parent'` supplied in JSON must never grant parent privileges.

**Security limitation of role-in-JWT:** A valid old token can retain a stale role until it expires unless current permissions are checked from authoritative data.

## 24. Logout, token revocation and session limits

A stateless JWT cannot be erased from a client's copy by the server. A logout endpoint can ask the client to discard it, or the server may maintain a blacklist/revocation record and refuse that token on later requests.

A training implementation with `const blacklist = new Set()` has major limitations: tokens become valid again after restart, and separate server processes do not share the set. A production solution may store revocation identifiers in durable/shared storage until token expiry, use shorter-lived access tokens and manage refresh sessions.

**Test:** register/login → access protected route → logout → reuse the *same* token → expect `401`. Also test expiry, restart behavior and multiple server instances when designing a real deployment.

---

# Part V — Verification and Engineering Judgment

## 25. Error handling and diagnostics

Think from observable facts to probable layer, rather than editing random files.

| Symptom | Likely layer | First action |
|---|---|---|
| `fetch failed`, `ECONNREFUSED` | Network/process | Confirm server still running and correct port |
| `404 Cannot GET ...` | Routing | Inspect method/path and mount prefix |
| `400` | Client input/parse | Inspect JSON and required fields |
| `401` | Authentication | Inspect Bearer header, JWT signature/expiry |
| `403` | Authorization | Inspect role/ownership policy |
| `500` | Server error | Read server logs; identify thrown exception |
| Valid route, wrong data | Business logic/storage | Inspect helper return value, data types and persisted state |
| Module not found | Working directory/install | Check cwd, import path, `npm ci` |
| `.env not found` | Working directory/config | Run commands from project directory |
| `EADDRINUSE` | Port/process | Identify process bound to the port |
| Browser shows 200 but grader fails | Contract/coverage | Inspect required status, schema, state and test setup |

Debugging workflow: **reproduce → observe status/error → locate layer → inspect minimal code → change one cause → rerun affected tests → regression test all flows**.

Avoid putting secrets, raw passwords or complete live tokens in screenshots and bug reports. Redact sensitive inputs before sharing diagnostics.

## 26. Testing an HTTP API on Windows and Codespaces

A reliable two-terminal workflow:

```powershell
# Terminal A: inside the project folder
npm.cmd ci
npm.cmd start
```

```powershell
# Terminal B: inside the same project folder
curl.exe -i http://127.0.0.1:3000/
node --env-file=.env scripts/verify-movie-local.mjs
```

The server must remain alive while Terminal B sends requests. `curl.exe` avoids Windows PowerShell aliases for `curl`. A test that imports and inspects middleware directly may pass even if the HTTP server is stopped; this explains how module checks can pass while every network test reports `fetch failed`.

Test dimensions:

- **Status:** exact `201`, `200`, `400`, `401`, `403`, `404`, etc.
- **Body:** required fields, no `passwordHash`, correct value and type.
- **State:** POST persists, PUT changes, DELETE removes.
- **Identity:** valid parent and child credentials; JWT claims and expiry.
- **Permission:** child-own permitted, child-other denied, parent-any permitted.
- **Resilience:** malformed JSON, wrong URL/method, missing files or configuration.
- **Safety:** no secrets or runtime datasets staged for public GitHub.

`npm audit` findings should be recorded independently of functional test results and triaged before any non-training deployment.

## 27. End-to-end walk-through: adding a movie

Suppose the parent sends:

```http
POST /api/watchlist/3/movies HTTP/1.1
Authorization: Bearer <signed-jwt>
Content-Type: application/json

{"title":"Example Film","genre":"Drama"}
```

1. **Transport:** the client connects to host/port; failure here gives `fetch failed` or connection errors, before any route is called.
2. **Express:** `express.json()` parses the body, then router matches `POST /api/watchlist/:userId/movies`.
3. **Authenticate:** verify the JWT; missing or invalid yields `401`.
4. **Authorize:** check that `role === 'parent'` or child owns list. Parent is allowed.
5. **Validate:** require meaningful movie fields and normalize the numeric `userId`.
6. **Persistence:** `addMovie()` reads existing JSON, assigns ID, writes modified list.
7. **Respond:** return `201` with `{movie: ...}`.
8. **Verify:** a subsequent GET shows the new movie; after DELETE it disappears.

Compare the same request with a child's JWT targeting another user's list. The request still reaches authentication, but authorization stops it with `403`; no write should occur. Compare with no token: request stops at authentication with `401`.

## 28. Concept-to-code map

These links point to implementation records in this repository. Individual READMEs cover the lesson-specific commands and code; this review explains how the ideas connect.

| Concept | Example source |
|---|---|
| JavaScript runtime and REPL | [Learn Node.js REPL](workshops/learn-nodejs-repl/README.md) |
| File I/O, buffers, streams | [Build a File Processor](workshops/build-a-file-processor/README.md) |
| Packages, ESM and tests | [Build a Case Converter](workshops/build-a-case-converter/README.md) |
| Node HTTP, static resources | [Build a Web Server](workshops/build-a-web-server/README.md) |
| Express request/response | [Build a Random Joke App](workshops/build-a-random-joke-app/README.md) |
| Forms, middleware and errors | [Build a Submission Form](workshops/build-a-submission-form/README.md) |
| Input sanitization | [Build a Data Sanitizer](labs/build-a-data-sanitizer/README.md) |
| External services and API contracts | [Build a Weather Service API](workshops/build-a-weather-service-api/README.md) |
| CRUD and file persistence | [Build a Bank API](workshops/build-a-bank-api/README.md) |
| OS metrics and real-time data | [Build a Resource Monitor](workshops/build-a-resource-monitor/README.md) |
| WebSockets and broadcasting | [Build a Chat App](certification-projects/build-a-chat-app/README.md) |
| JWT, logout, RBAC | [Build JWT Protected Routes](workshops/build-jwt-protected-routes/README.md) |
| JWT + ownership + CRUD integration | [Build a Family Movie Watchlist API](certification-projects/build-a-family-movie-watchlist-api/README.md) |
| Algorithm correctness | [Build a Prime Number Checker Module](certification-projects/build-a-prime-number-checker-module/README.md) |
| Basic web app and user data | [Build a Personal Profile App](certification-projects/build-a-personal-profile-app/README.md) |
| Parsing URLs and timestamps | [Build a Timestamp Microservice](certification-projects/build-a-timestamp-microservice/README.md) |

## 29. Review scenarios: explain the cause, not only the answer

1. **A test passes when importing `authenticate`, but HTTP tests all say `fetch failed`.** The direct middleware tests do not need a running server; check process and port before editing middleware.
2. **A child with a valid token edits another child's watchlist.** Authentication succeeded but authorization must deny with `403`; ownership must be checked server-side.
3. **A `GET` endpoint returns a user object including `passwordHash`.** It may be functionally successful but violates the response contract and unnecessary-data principle; build a safe projection/allowlist.
4. **A valid `fetch` returns status 404 without throwing.** Transport succeeded; inspect `response.ok`, then handle the HTTP error response.
5. **An API works until Node.js restarts, then previously logged-out JWTs work again.** An in-memory blacklist was lost; use an appropriately durable revocation/session design.
6. **The app works in Codespaces but says `.env not found` from Windows terminal.** The command may be running in repository root rather than the project's directory.
7. **An API field is numeric in JSON data but a path parameter is string.** Strict equality fails; validate and convert safely.
8. **`npm audit` reports a critical advisory but 23 functional tests pass.** Both can be true; resolve the dependency finding separately from API behavior.
9. **A client disables its own submit button but can still call an endpoint using `curl`.** Client-side UI restrictions are not authorization.
10. **A resource returns `200` but after POST the new item is missing.** Inspect persistence/write and the follow-up GET; success status alone is insufficient.

## 30. Practical readiness checklist

You should be able to do the following without relying on a memorized tutorial:

- [ ] Trace an HTTP request from DNS/connection to routing, middleware, persistence and response.
- [ ] Explain the difference between Node.js and Express, and between a route and an API contract.
- [ ] Choose appropriate HTTP methods/status codes and design failure cases.
- [ ] Explain JSON serialization and validate bodies/path/query inputs.
- [ ] Explain ESM imports, npm lockfiles, environment variables and safe secret handling.
- [ ] Compare synchronous I/O with async I/O; distinguish network errors from HTTP error responses.
- [ ] Explain CRUD persistence, idempotence and file-backed limitations.
- [ ] Test requests in two terminals, including deliberate `401` and `403` checks.
- [ ] Explain WebSocket connection/message/close versus HTTP request–response.
- [ ] Explain bcrypt password hashing, JWT signing/verification and token expiry.
- [ ] Distinguish authentication from authorization and test resource ownership.
- [ ] Describe why CORS, HTTPS, CSP, Helmet and security audit are different controls.
- [ ] Interpret error reports without guessing and confirm the affected execution layer.
- [ ] Keep `.env`, runtime JSON data and `node_modules/` out of public commits.

---

# Bilingual technical glossary (English pronunciation → Vietnamese meaning)

Pronunciation is approximate standard American/British IPA; accents vary. Read stress marks (`ˈ`) as the primary stressed syllable.

| English term | Pronunciation (IPA) | Vietnamese meaning |
|---|---|---|
| Back end | /ˌbæk ˈend/ | Phần xử lý phía máy chủ |
| Front end | /ˌfrʌnt ˈend/ | Phần giao diện phía người dùng |
| Client | /ˈklaɪənt/ | Phía gửi yêu cầu |
| Server | /ˈsɜːrvər/ | Máy chủ hoặc tiến trình phục vụ |
| Request | /rɪˈkwest/ | Yêu cầu |
| Response | /rɪˈspɑːns/ | Phản hồi |
| Endpoint | /ˈendpɔɪnt/ | Điểm truy cập API |
| Route | /ruːt/ hoặc /raʊt/ | Tuyến định tuyến |
| Middleware | /ˈmɪdəlwer/ | Thành phần trung gian xử lý request |
| Authentication | /ɔːˌθentɪˈkeɪʃən/ | Xác thực danh tính |
| Authorization | /ˌɔːθərəˈzeɪʃən/ | Phân quyền truy cập |
| Credential | /krɪˈdenʃəl/ | Thông tin xác thực |
| Token | /ˈtoʊkən/ | Mã thông báo |
| Bearer token | /ˈberər ˈtoʊkən/ | Token do bên giữ token sử dụng |
| Hash | /hæʃ/ | Giá trị băm |
| Secret | /ˈsiːkrət/ | Bí mật dùng để ký hoặc bảo vệ |
| Payload | /ˈpeɪloʊd/ | Phần dữ liệu mang theo |
| Role | /roʊl/ | Vai trò |
| Ownership | /ˈoʊnərʃɪp/ | Quyền sở hữu tài nguyên |
| Validation | /ˌvælɪˈdeɪʃən/ | Kiểm tra tính hợp lệ của dữ liệu |
| Persistence | /pərˈsɪstəns/ | Lưu trữ bền vững |
| Database | /ˈdeɪtəbeɪs/ | Cơ sở dữ liệu |
| Concurrency | /kənˈkɜːrənsi/ | Xử lý đồng thời |
| Idempotent | /ˌaɪdəmˈpoʊtənt/ | Lặp thao tác không đổi hiệu ứng trạng thái chủ đích |
| Asynchronous | /eɪˈsɪŋkrənəs/ | Bất đồng bộ |
| Event loop | /ɪˈvent luːp/ | Vòng lặp sự kiện |
| WebSocket | /ˈwebˌsɑːkɪt/ | Giao thức kết nối hai chiều bền |
| Stream | /striːm/ | Luồng dữ liệu |
| Buffer | /ˈbʌfər/ | Bộ đệm dữ liệu nhị phân |
| Dependency | /dɪˈpendənsi/ | Thư viện/phụ thuộc |
| Vulnerability | /ˌvʌlnərəˈbɪləti/ | Lỗ hổng bảo mật |
| Regression test | /rɪˈɡreʃən test/ | Kiểm thử hồi quy |
| Debugging | /diːˈbʌɡɪŋ/ | Gỡ lỗi |

## Final synthesis

The difference between a **working demo** and a **reliable back-end system** is not the number of routes. It is the correctness of the interface contract, the discipline of validation, the boundaries of authentication and authorization, the consistency of state changes, the quality of error handling, and the evidence from tests.

The guiding question for every feature is:

> **What does the server trust, what does it verify, what changes, what does it return, and how can we prove each outcome?**

This review is preparation for the official **Back-End Development and APIs Review** and **Certification Exam**; neither official assessment is implicitly completed by creating this repository document.
