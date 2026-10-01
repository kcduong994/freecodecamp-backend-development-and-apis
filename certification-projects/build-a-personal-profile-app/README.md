# Build a Personal Profile App

A certification project from the freeCodeCamp **Back-End Development and APIs** curriculum.

**Status:** Completed — **1/1 certification project**

---

## Overview

This project builds a small personal profile application using:

- Node.js
- Express.js
- CommonJS
- HTTP GET routes
- plain-text responses
- a JSON API
- npm dependency management

The project is requirement-driven rather than step-by-step.

freeCodeCamp provides the user stories and automated tests, and the implementation must satisfy all of them.

---

## Project Structure

```text
build-a-personal-profile-app/
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

The following is intentionally not committed:

```text
node_modules/
```

`node_modules/` can be recreated at any time with:

```bash
npm install
```

---

## User Stories

The completed project satisfies the following requirements:

1. Use Express to create an HTTP server listening on port `3000`.
2. Create a `GET /` route returning:

```text
Welcome to Camper Bot's homepage!
```

3. Create a `GET /hobbies` route returning:

```text
I cycle, go boating, and play guitar.
```

4. Create a `GET /skills` route returning:

```text
JavaScript, Node.js, and Express.js!
```

5. Create a `GET /api/profile` route returning JSON with:

```json
{
  "name": "Camper Bot",
  "hobbies": ["cycling", "boating", "guitar"],
  "skills": ["JavaScript", "Node.js", "Express.js"]
}
```

---

## Final `server.js`

```js
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Camper Bot's homepage!");
});

app.get("/hobbies", (req, res) => {
  res.send("I cycle, go boating, and play guitar.");
});

app.get("/skills", (req, res) => {
  res.send("JavaScript, Node.js, and Express.js!");
});

app.get("/api/profile", (req, res) => {
  res.json({
    name: "Camper Bot",
    hobbies: ["cycling", "boating", "guitar"],
    skills: ["JavaScript", "Node.js", "Express.js"],
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

---

## Express Setup

Express is imported with CommonJS:

```js
const express = require("express");
```

An Express application is created with:

```js
const app = express();
```

The server listens on:

```js
const port = 3000;
```

and starts with:

```js
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

Expected startup output:

```text
Server is running on port 3000
```

---

## Route Summary

| Method | Path | Response Type | Purpose |
|---|---|---|---|
| `GET` | `/` | text | homepage message |
| `GET` | `/hobbies` | text | hobbies message |
| `GET` | `/skills` | text | skills message |
| `GET` | `/api/profile` | JSON | profile API |

---

## Root Route

```js
app.get("/", (req, res) => {
  res.send("Welcome to Camper Bot's homepage!");
});
```

Expected:

```text
HTTP/1.1 200 OK
```

Response body:

```text
Welcome to Camper Bot's homepage!
```

---

## Hobbies Route

```js
app.get("/hobbies", (req, res) => {
  res.send("I cycle, go boating, and play guitar.");
});
```

Expected response:

```text
I cycle, go boating, and play guitar.
```

---

## Skills Route

```js
app.get("/skills", (req, res) => {
  res.send("JavaScript, Node.js, and Express.js!");
});
```

Expected response:

```text
JavaScript, Node.js, and Express.js!
```

---

## JSON API Route

```js
app.get("/api/profile", (req, res) => {
  res.json({
    name: "Camper Bot",
    hobbies: ["cycling", "boating", "guitar"],
    skills: ["JavaScript", "Node.js", "Express.js"],
  });
});
```

The important difference from the text routes is:

```js
res.json(...)
```

instead of:

```js
res.send(...)
```

`res.json()` serializes the JavaScript object and sends the correct JSON response headers.

Expected response header:

```text
Content-Type: application/json; charset=utf-8
```

Expected body:

```json
{
  "name": "Camper Bot",
  "hobbies": ["cycling", "boating", "guitar"],
  "skills": ["JavaScript", "Node.js", "Express.js"]
}
```

---

## Request / Response Flow

```text
Client
  ↓
HTTP GET request
  ↓
Express server
  ↓
Route matching
  ↓
Route handler
  ↓
res.send() or res.json()
  ↓
HTTP response
  ↓
Client
```

For example:

```text
GET /api/profile
      ↓
app.get("/api/profile", ...)
      ↓
res.json(...)
      ↓
application/json response
```

---

## `package.json`

The project was initialized with:

```bash
npm init -y
```

Express was installed with:

```bash
npm install express
```

Important fields in the local package metadata:

```json
{
  "name": "build-a-personal-profile-app",
  "version": "1.0.0",
  "main": "server.js",
  "type": "commonjs",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

The generated `package-lock.json` preserves the exact installed dependency tree.

---

## Local Installation

From the repository root:

```powershell
cd ".\certification-projects\build-a-personal-profile-app"
npm install
```

This recreates:

```text
node_modules/
```

from:

```text
package.json
package-lock.json
```

`node_modules/` is excluded from Git.

---

## Syntax Verification

Run:

```powershell
node --check server.js
```

If no syntax error is printed, the JavaScript syntax is valid.

---

## Run Locally

Start the server:

```powershell
node server.js
```

or:

```powershell
npm start
```

Expected output:

```text
Server is running on port 3000
```

The local server is available at:

```text
http://localhost:3000
```

---

## Local HTTP Verification

The project was verified locally with `curl.exe`.

### Homepage

```powershell
curl.exe -i http://localhost:3000/
```

Expected:

```text
HTTP/1.1 200 OK
```

Body:

```text
Welcome to Camper Bot's homepage!
```

### Hobbies

```powershell
curl.exe -i http://localhost:3000/hobbies
```

Expected body:

```text
I cycle, go boating, and play guitar.
```

### Skills

```powershell
curl.exe -i http://localhost:3000/skills
```

Expected body:

```text
JavaScript, Node.js, and Express.js!
```

### Profile API

```powershell
curl.exe -i http://localhost:3000/api/profile
```

Expected:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

Body:

```json
{"name":"Camper Bot","hobbies":["cycling","boating","guitar"],"skills":["JavaScript","Node.js","Express.js"]}
```

---

## Verification Summary

The local project was verified with:

```text
npm install                      ✅
node --check server.js           ✅
node server.js                   ✅

GET /                            ✅ 200 OK
GET /hobbies                     ✅ 200 OK
GET /skills                      ✅ 200 OK
GET /api/profile                 ✅ 200 OK
JSON Content-Type                ✅
JSON object shape                ✅
```

The project also passed the official freeCodeCamp certification tests:

```text
Build a Personal Profile App
1 / 1
✅ Completed
```

---

## Concepts Practiced

```text
Node.js
Express.js
CommonJS
require()

npm
npm init
npm install
package.json
package-lock.json
dependencies

HTTP
GET requests
routing
route handlers
status 200

app.get()
app.listen()

req
res
res.send()
res.json()

JSON
application/json
arrays
objects

localhost
port 3000

curl
local API verification
```

---

## Express Text Responses vs JSON Responses

Text response:

```js
res.send("Hello");
```

Typical content type:

```text
text/html; charset=utf-8
```

JSON response:

```js
res.json({
  name: "Camper Bot",
});
```

Typical content type:

```text
application/json; charset=utf-8
```

This distinction is important because APIs must communicate both the response body and how the client should interpret that body.

---

## Comparison with the Previous Express Workshop

The previous **Build a Random Joke App** workshop introduced:

```text
Express setup
app.get()
res.send()
app.listen()
random content
```

This certification project applies those concepts independently and adds:

```text
requirement-driven implementation
multiple fixed routes
JSON API responses
res.json()
API content-type verification
certification tests
```

---

## Key Takeaways

1. Express routing connects an HTTP method and URL path to a handler.
2. `res.send()` is suitable for simple text responses.
3. `res.json()` is the correct Express helper for JSON API responses.
4. Express automatically provides successful `200 OK` responses unless another status is explicitly set.
5. `package.json` declares project dependencies.
6. `package-lock.json` preserves an exact dependency resolution.
7. `node_modules/` should not be committed because it can be recreated with `npm install`.
8. Certification projects require translating user stories directly into working code.

---

## Completion

```text
Certification Project 02
Build a Personal Profile App

1 / 1
✅ Completed
```

The final application flow is:

```text
Express
   ↓
GET routes
   ├── /
   ├── /hobbies
   ├── /skills
   └── /api/profile
          ↓
       res.json()
          ↓
       JSON API
```
