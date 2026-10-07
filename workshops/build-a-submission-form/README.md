# Build a Submission Form

**freeCodeCamp Back-End Development and APIs — Express Middleware Workshop**

**Status:** ✅ Completed — **22 / 22**

---

## Overview

This workshop builds a structured Express API to demonstrate how middleware works across an application.

The project progresses from a minimal Express server to a middleware stack that includes:

- application-level middleware;
- built-in Express body-parsing middleware;
- an Express `Router`;
- router-level routes;
- 404 handling;
- custom error propagation with `next(error)`;
- centralized error-handling middleware.

The final application exposes routes that demonstrate successful responses, client errors, server errors, and unmatched routes.

---

## Project Structure

```text
build-a-submission-form/
├── middleware/
│   └── error.middleware.js
├── routes/
│   └── api.routes.js
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

`node_modules/` is installed locally when needed but is intentionally excluded from Git.

---

## Main Learning Goals

```text
Express.js
ES Modules
application-level middleware
router-level middleware
built-in middleware
custom middleware
middleware order
req
res
next
NextFunction
express.json()
express.urlencoded()
Router
route mounting
base paths
404 handling
error propagation
error-handling middleware
HTTP status codes
JSON error responses
```

---

## package.json

The project uses ES Modules and a start script:

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}
```

Run the server with:

```bash
npm start
```

---

## Application Entry Point

### `server.js`

```js
import express from "express";
import apiRouter from "./routes/api.routes.js";
import {
  notFoundHandler,
  finalErrorHandler,
} from "./middleware/error.middleware.js";

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(finalErrorHandler);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
```

The middleware stack is registered in execution order.

---

## Application-Level Logger Middleware

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

Conceptually:

```text
Incoming Request
      ↓
Logger Middleware
      ↓
console.log(...)
      ↓
next()
      ↓
Next Middleware / Route
```

Calling `next()` passes control to the next middleware or route. If middleware neither sends a response nor calls `next()`, the request-response cycle does not continue.

---

## Built-In Express Middleware

### JSON Body Parser

```js
app.use(express.json());
```

This parses incoming JSON request bodies and exposes the parsed object through:

```js
req.body
```

### URL-Encoded Body Parser

```js
app.use(express.urlencoded({ extended: true }));
```

This parses URL-encoded form data, including the default format submitted by HTML forms.

Example:

```text
name=Camper&email=camper@example.com
```

The parsed values become available through `req.body`.

---

## Express Router

### `routes/api.routes.js`

```js
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is available!");
});

router.get("/crash", (req, res, next) => {
  const error = new Error("Database connection failed.");
  next(error);
});

router.get("/bad-request", (req, res, next) => {
  const err = new Error("Client-side data is missing.");
  err.status = 400;
  next(err);
});

export default router;
```

The router is mounted at:

```js
app.use("/api", apiRouter);
```

So the final routes are:

```text
/api
/api/crash
/api/bad-request
```

---

## Route Summary

| Method | URL | Expected Result |
|---|---|---|
| `GET` | `/api` | `200 OK` — `API is available!` |
| `GET` | `/api/crash` | `500 Internal Server Error` — JSON error |
| `GET` | `/api/bad-request` | `400 Bad Request` — specific JSON error |
| `GET` | unmatched path such as `/nonsense` | `404 Not Found` — JSON error |

---

## Passing Errors with `next(error)`

Express treats normal middleware flow and error flow differently:

```text
next()
  ↓
continue normal middleware / routing
```

```text
next(error)
  ↓
skip regular handlers
  ↓
find error-handling middleware
```

This is the mechanism used by the `/crash` and `/bad-request` routes.

---

## `GET /api/crash`

```js
router.get("/crash", (req, res, next) => {
  const error = new Error("Database connection failed.");
  next(error);
});
```

Because the error has no custom `status`, the final handler falls back to `500`.

Client response:

```json
{
  "error": true,
  "status": 500,
  "message": "Internal Server Error (Check Server Logs)"
}
```

The real error is still logged on the server.

---

## `GET /api/bad-request`

```js
router.get("/bad-request", (req, res, next) => {
  const err = new Error("Client-side data is missing.");
  err.status = 400;
  next(err);
});
```

This produces:

```json
{
  "error": true,
  "status": 400,
  "message": "Client-side data is missing."
}
```

---

## Error Middleware

### `middleware/error.middleware.js`

```js
function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

function finalErrorHandler(err, req, res, next) {
  const status = err.status || 500;

  console.error(err);

  res.status(status).json({
    error: true,
    status,
    message:
      status === 500
        ? "Internal Server Error (Check Server Logs)"
        : err.message,
  });
}

export { notFoundHandler, finalErrorHandler };
```

---

## Catch-All 404 Handler

```js
function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
}
```

For example:

```text
GET /nonsense
```

becomes:

```text
Not Found - /nonsense
```

with:

```text
status = 404
```

and is passed to the final error handler.

---

## Final Error Handler

Express identifies an error handler by its four-parameter signature:

```js
(err, req, res, next)
```

The response status is derived from:

```js
const status = err.status || 500;
```

So:

```text
err.status exists  → use it
err.status missing → use 500
```

The response body always contains:

```json
{
  "error": true,
  "status": 0,
  "message": "..."
}
```

with the actual status inserted at runtime.

For `500`, the client receives the generic message:

```text
Internal Server Error (Check Server Logs)
```

For other statuses, the handler uses:

```js
err.message
```

---

## Middleware Order

Order is fundamental in Express.

The completed stack is:

```text
Incoming Request
      ↓
Logger Middleware
      ↓
express.json()
      ↓
express.urlencoded()
      ↓
/api Router
      ↓
notFoundHandler
      ↓
finalErrorHandler
      ↓
HTTP Response
```

The 404 handler comes after normal routes so valid requests get a chance to match first.

The final error handler comes last because it must catch errors generated or forwarded earlier in the stack.

---

## Request Flow Examples

### Successful Request

```text
GET /api
    ↓
Logger
    ↓
Body Parsers
    ↓
API Router
    ↓
Matching Route
    ↓
res.send(...)
    ↓
200 OK
```

### Explicit 400 Error

```text
GET /api/bad-request
    ↓
new Error(...)
    ↓
err.status = 400
    ↓
next(err)
    ↓
finalErrorHandler
    ↓
400 JSON Response
```

### Internal 500 Error

```text
GET /api/crash
    ↓
new Error(...)
    ↓
next(error)
    ↓
finalErrorHandler
    ↓
status defaults to 500
    ↓
Generic JSON Response
```

### Unmatched Route

```text
GET /nonsense
    ↓
No Route Matches
    ↓
notFoundHandler
    ↓
status = 404
    ↓
next(error)
    ↓
finalErrorHandler
    ↓
404 JSON Response
```

---

## ESM Module Organization

The workshop uses ECMAScript Modules.

### Default Export

```js
export default router;
```

Imported with:

```js
import apiRouter from "./routes/api.routes.js";
```

### Named Exports

```js
export { notFoundHandler, finalErrorHandler };
```

Imported with:

```js
import {
  notFoundHandler,
  finalErrorHandler,
} from "./middleware/error.middleware.js";
```

This demonstrates the practical difference between default and named exports.

---

## Local Installation

From the workshop directory:

```powershell
npm install
```

Dependencies install locally into:

```text
node_modules/
```

The repository-level `.gitignore` excludes `node_modules/`, so it is not committed.

---

## Syntax Verification

The copied source was checked locally with:

```powershell
node --check server.js
node --check routes/api.routes.js
node --check middleware/error.middleware.js
```

All syntax checks passed.

---

## Running the Server

```powershell
npm start
```

This executes:

```text
node server.js
```

and starts the Express application on port `3000`.

---

## Local HTTP Verification

The completed workshop was tested locally with:

```powershell
curl.exe -i http://localhost:3000/api
curl.exe -i http://localhost:3000/api/crash
curl.exe -i http://localhost:3000/api/bad-request
curl.exe -i http://localhost:3000/nonsense
```

Observed behavior:

```text
GET /api
✅ 200 OK
✅ API is available!

GET /api/crash
✅ 500
✅ Content-Type: application/json
✅ error: true
✅ generic internal-server-error message

GET /api/bad-request
✅ 400 Bad Request
✅ Content-Type: application/json
✅ error: true
✅ Client-side data is missing.

GET /nonsense
✅ 404 Not Found
✅ Content-Type: application/json
✅ error: true
✅ Not Found - /nonsense
```

---

## Verification Summary

```text
npm install                                  ✅
node --check server.js                       ✅
node --check routes/api.routes.js            ✅
node --check middleware/error.middleware.js  ✅
npm start                                    ✅

GET /api                                     ✅ 200
GET /api/crash                               ✅ 500
GET /api/bad-request                         ✅ 400
GET /nonsense                                ✅ 404

JSON error responses                         ✅
404 handling                                 ✅
500 handling                                 ✅
custom status propagation                    ✅
```

---

## freeCodeCamp Completion

Official workshop status:

```text
Build a Submission Form
22 / 22
✅ Completed
```

The workshop belongs to the **Express Middleware** section of the freeCodeCamp Back-End Development and APIs curriculum.

---

## Concepts Practiced

### Application-Level Middleware

Registered with:

```js
app.use(...)
```

### Router-Level Organization

Routes live in:

```text
routes/api.routes.js
```

and are mounted with:

```js
app.use("/api", apiRouter);
```

### Middleware Control Flow

```js
next();
```

continues the regular middleware chain.

```js
next(error);
```

switches Express to error-handling flow.

### Centralized Error Handling

Errors from routes and unmatched requests are funneled into one final handler, producing consistent JSON responses.

### HTTP Status Semantics

```text
200 → successful request
400 → bad request
404 → resource not found
500 → internal server error
```

---

## Key Takeaways

1. Express middleware executes in registration order.
2. `app.use()` can register middleware and routers.
3. `express.json()` parses JSON request bodies.
4. `express.urlencoded()` parses HTML form-style bodies.
5. `Router()` keeps route definitions in separate modules.
6. Routers can be mounted under a shared base path.
7. `next()` continues normal processing.
8. `next(error)` switches to the error pipeline.
9. Error middleware uses the four-parameter signature `(err, req, res, next)`.
10. A catch-all 404 handler should come after normal routes.
11. The final error handler should be last.
12. Internal 500 errors can expose a generic client-facing message while logging detailed server-side errors.
13. Centralized error handling makes API behavior more consistent and maintainable.

---

## Completion

**Build a Submission Form — 22 / 22 — Completed ✅**
