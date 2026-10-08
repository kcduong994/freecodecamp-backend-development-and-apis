# Build a Data Sanitizer

**freeCodeCamp Back-End Development and APIs — Express Middleware Lab**

**Status:** ✅ Completed — **1 / 1**

---

## Overview

This lab practices custom Express middleware by building a small data sanitizer and validator.

The application:

- parses URL-encoded form submissions;
- normalizes the submitted username to lowercase;
- removes HTML tags from comments;
- validates that usernames contain at least 3 characters;
- redirects invalid submissions back to the form;
- serves a static HTML form;
- returns sanitized data from `POST /submit`.

---

## Project Structure

```text
build-a-data-sanitizer/
├── public/
│   └── index.html
├── middleware.js
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

`node_modules/` is installed locally but intentionally excluded from Git.

---

## freeCodeCamp Requirements

The lab required:

1. A `middleware.js` file exporting `inputCleaner` and `inputValidator`.
2. `inputCleaner` must:
   - lowercase `req.body.username` when present;
   - strip HTML tags from `req.body.comment` when present;
   - call `next()`.
3. `inputValidator` must:
   - call `next()` when the username has at least 3 characters;
   - otherwise redirect to:

```text
/form?error=Username must be at least 3 characters.
```

4. An HTTP server must listen on port `3000`.
5. `GET /` must redirect to `/form`.
6. `GET /form` must serve the static HTML form.
7. `POST /submit` must apply:

```text
inputCleaner
↓
inputValidator
↓
final handler
```

before responding with the sanitized `username` and `comment`.

---

## Dependencies

The project uses Express:

```json
{
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

Install dependencies with:

```bash
npm install
```

---

## Module System

This project uses CommonJS.

Middleware import:

```js
const { inputCleaner, inputValidator } = require("./middleware");
```

Middleware export:

```js
module.exports = {
  inputCleaner,
  inputValidator,
};
```

---

# Custom Middleware

## `middleware.js`

```js
function inputCleaner(req, res, next) {
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }

  if (req.body.comment) {
    req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
  }

  next();
}

function inputValidator(req, res, next) {
  if (req.body.username && req.body.username.length >= 3) {
    return next();
  }

  res.redirect(
    "/form?error=Username must be at least 3 characters."
  );
}

module.exports = {
  inputCleaner,
  inputValidator,
};
```

---

## `inputCleaner`

The cleaner modifies request data before later middleware and handlers use it.

Username normalization:

```js
req.body.username = req.body.username.toLowerCase();
```

Example:

```text
CuOnG
↓
cuong
```

Comment sanitization:

```js
req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
```

Example:

```text
<b>Hello</b>
↓
Hello
```

After cleaning:

```js
next();
```

passes control to the next middleware.

---

## `inputValidator`

```js
function inputValidator(req, res, next) {
  if (req.body.username && req.body.username.length >= 3) {
    return next();
  }

  res.redirect(
    "/form?error=Username must be at least 3 characters."
  );
}
```

Valid username:

```text
cuong
↓
length >= 3
↓
next()
```

Invalid username:

```text
ab
↓
length < 3
↓
302 redirect
```

The invalid branch does not call `next()`, so the final route handler does not run.

---

# Express Server

## `server.js`

```js
const express = require("express");
const path = require("path");

const { inputCleaner, inputValidator } = require("./middleware");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post(
  "/submit",
  inputCleaner,
  inputValidator,
  (req, res) => {
    res.send({
      username: req.body.username,
      comment: req.body.comment,
    });
  }
);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
```

---

## URL-Encoded Body Parsing

The form submits URL-encoded data.

Express parses it with:

```js
app.use(express.urlencoded({ extended: true }));
```

Example encoded body:

```text
username=CuOnG&comment=%3Cb%3EHello%3C%2Fb%3E
```

becomes a request body similar to:

```js
{
  username: "CuOnG",
  comment: "<b>Hello</b>"
}
```

The custom middleware then cleans and validates those values.

---

# Routes

## `GET /`

```js
app.get("/", (req, res) => {
  res.redirect("/form");
});
```

Result:

```text
302 Found
Location: /form
```

---

## `GET /form`

```js
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
```

This serves:

```text
public/index.html
```

with a successful `200` response.

---

## `POST /submit`

```js
app.post(
  "/submit",
  inputCleaner,
  inputValidator,
  (req, res) => {
    res.send({
      username: req.body.username,
      comment: req.body.comment,
    });
  }
);
```

Express runs the handlers from left to right:

```text
POST /submit
      ↓
inputCleaner
      ↓
inputValidator
      ↓
final handler
      ↓
response
```

This order is important because the final handler only sees sanitized, valid input.

---

# Request Flow

## Successful Submission

Input:

```text
username = CuOnG
comment  = <b>Hello</b>
```

Flow:

```text
POST /submit
      ↓
express.urlencoded()
      ↓
inputCleaner
      ├── CuOnG → cuong
      └── <b>Hello</b> → Hello
      ↓
inputValidator
      ↓
username length >= 3
      ↓
next()
      ↓
final handler
      ↓
200 OK
```

Response:

```json
{
  "username": "cuong",
  "comment": "Hello"
}
```

---

## Invalid Submission

Input:

```text
username = ab
comment  = test
```

Flow:

```text
POST /submit
      ↓
inputCleaner
      ↓
inputValidator
      ↓
username length < 3
      ↓
redirect
```

Response:

```text
302 Found
```

Location:

```text
/form?error=Username%20must%20be%20at%20least%203%20characters.
```

---

# Local Verification

The completed lab was copied from the freeCodeCamp Codespace into:

```text
labs/build-a-data-sanitizer/
```

The course infrastructure and installed dependencies were not copied:

```text
test/
node_modules/
```

---

## Dependency Installation

```powershell
npm install
```

Observed result:

```text
68 packages installed
69 packages audited
0 vulnerabilities
```

---

## Syntax Verification

```powershell
node --check middleware.js
node --check server.js
```

Both checks passed without syntax errors.

---

## Server Startup

```powershell
node server.js
```

Observed output:

```text
Server is running at http://localhost:3000
```

---

# HTTP Verification

## Form Routes

```powershell
curl.exe -i http://localhost:3000/
curl.exe -i http://localhost:3000/form
```

Verified:

```text
GET /      → redirect to /form
GET /form  → 200 OK
```

---

## Sanitization Test

```powershell
curl.exe -i -X POST `
  -H "Content-Type: application/x-www-form-urlencoded" `
  --data "username=CuOnG&comment=%3Cb%3EHello%3C%2Fb%3E" `
  http://localhost:3000/submit
```

Observed response:

```json
{
  "username": "cuong",
  "comment": "Hello"
}
```

This confirms:

```text
username lowercasing ✅
HTML tag stripping    ✅
```

---

## Validation Test

```powershell
curl.exe -i -X POST `
  -H "Content-Type: application/x-www-form-urlencoded" `
  --data "username=ab&comment=test" `
  http://localhost:3000/submit
```

Observed response:

```text
HTTP/1.1 302 Found
```

with:

```text
Location: /form?error=Username%20must%20be%20at%20least%203%20characters.
```

This confirms:

```text
short username rejected ✅
redirect performed       ✅
final handler skipped    ✅
```

---

# Verification Summary

```text
freeCodeCamp lab tests                         ✅ 1/1
npm install                                    ✅
0 vulnerabilities                              ✅
node --check middleware.js                     ✅
node --check server.js                         ✅
server startup on port 3000                    ✅
GET / → redirect /form                         ✅
GET /form → 200                                ✅
username converted to lowercase                ✅
HTML tags removed from comment                 ✅
valid username calls next()                    ✅
short username redirects                       ✅
POST /submit returns sanitized values          ✅
```

---

# Concepts Practiced

## Custom Middleware

Middleware can inspect and modify a request before the final route handler runs.

```text
request
↓
middleware
↓
middleware
↓
route handler
```

---

## Sanitization

Sanitization transforms input into a controlled form.

In this lab:

```text
CuOnG        → cuong
<b>Hello</b> → Hello
```

---

## Validation

Validation checks whether input satisfies application rules.

The rule here is:

```text
username.length >= 3
```

Valid input continues with:

```js
next();
```

Invalid input terminates normal flow with:

```js
res.redirect(...);
```

---

## Route-Level Middleware

The lab attaches middleware directly to one route:

```js
app.post(
  "/submit",
  inputCleaner,
  inputValidator,
  handler
);
```

This is different from application-level middleware such as:

```js
app.use(express.urlencoded({ extended: true }));
```

---

## Middleware Ordering

Express executes middleware in registration order.

For this project:

```text
parse body
↓
clean input
↓
validate input
↓
send response
```

Changing the order changes application behavior.

---

## Redirects

Express uses:

```js
res.redirect(...)
```

to return a redirect response.

In this lab, invalid usernames redirect back to the form with an error message in the query string.

---

# Comparison with the Previous Workshop

The previous **Build a Submission Form** workshop introduced the general middleware pipeline:

```text
request
↓
application middleware
↓
router
↓
404 handler
↓
error handler
```

This lab applies the same middleware model directly to submitted data:

```text
form request
↓
body parser
↓
inputCleaner
↓
inputValidator
↓
route handler
```

The emphasis therefore moves from middleware architecture to middleware-based sanitization and validation.

---

# Key Takeaways

1. Middleware can modify `req` before later handlers use it.
2. `express.urlencoded()` parses standard HTML form bodies.
3. Sanitization and validation are different responsibilities.
4. Sanitization transforms input.
5. Validation decides whether input is acceptable.
6. Route-level middleware can be chained directly in `app.post()`.
7. Middleware executes left to right.
8. `next()` continues the chain.
9. A redirect can stop the normal request flow without calling `next()`.
10. Invalid input should not reach the final handler.
11. Normalized input makes downstream application behavior more consistent.
12. `curl` is useful for verifying middleware behavior independently of the browser.

---

# freeCodeCamp Completion

```text
Build a Data Sanitizer
Lab
1 / 1
✅ Completed
```

This lab belongs to the **Express Middleware** section of the freeCodeCamp Back-End Development and APIs curriculum.

---

## Completion

**Build a Data Sanitizer — Lab — 1 / 1 — Completed ✅**
