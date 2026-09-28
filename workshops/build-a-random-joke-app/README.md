# Build a Random Joke App

A hands-on Express.js workshop from the freeCodeCamp **Back-End Development and APIs** curriculum.

**Status:** Completed — **8/8 steps**

---

## Overview

This workshop introduces basic Express routing and response methods by building a small Random Joke server.

The app:

- imports and initializes Express;
- listens on port `3000`;
- defines `GET` routes;
- uses `res.send()` to return responses;
- selects a random joke from an array;
- demonstrates the Express request/response model.

This workshop follows the lower-level Node.js HTTP server workshop and shows how Express simplifies routing and response handling.

---

## Project Structure

```text
build-a-random-joke-app/
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

The following freeCodeCamp/runtime files are intentionally not preserved:

```text
node_modules/
_solution/
test/
```

`node_modules/` can be recreated locally with `npm install`.

---

## Final `server.js`

```js
const express = require("express");
const app = express();
const port = 3000;

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are only 10 kinds of people in the world: those who understand binary and those who don't.",
  'I told my computer I needed a break, and it said "No problem, I\'ll go to sleep.',
  "Why do Java developers wear glasses? Because they don't see sharp.",
];

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Random Joke Server! Visit /joke to get a random joke.",
  );
});

app.get("/joke", (req, res) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(randomJoke);
});

app.get("/about", (req, res) => {
  res.send("This Random Joke Server was built with Express.js");
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

The server port is:

```js
const port = 3000;
```

The server starts with:

```js
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

Expected console output:

```text
Server is running on port 3000
```

---

## Routes

The app defines three routes:

| Method | Path | Response |
|---|---|---|
| `GET` | `/` | Welcome message |
| `GET` | `/joke` | One random joke |
| `GET` | `/about` | About message |

### Root route

```js
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Random Joke Server! Visit /joke to get a random joke.",
  );
});
```

Expected response:

```text
Welcome to the Random Joke Server! Visit /joke to get a random joke.
```

### Random joke route

```js
app.get("/joke", (req, res) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(randomJoke);
});
```

Random selection:

```text
Math.random()
      ↓
number from 0 to < 1
      ↓
× jokes.length
      ↓
Math.floor(...)
      ↓
0, 1, 2, or 3
      ↓
jokes[index]
```

### About route

```js
app.get("/about", (req, res) => {
  res.send("This Random Joke Server was built with Express.js");
});
```

Expected response:

```text
This Random Joke Server was built with Express.js
```

---

## Request and Response Objects

Every Express route handler receives:

```js
(req, res) => {
  // ...
}
```

Conceptually:

```text
req
→ incoming HTTP request

res
→ outgoing HTTP response
```

`res.send()` sends the response body and completes the response.

Successful routes return `200 OK` by default.

---

## Node.js HTTP vs Express

Previous workshop:

```js
http.createServer((request, response) => {
  // manual URL and response handling
});
```

Express:

```js
app.get("/", (req, res) => {
  res.send("Hello");
});
```

Comparison:

```text
Node.js http                  Express
-------------------------     -------------------------
http.createServer()           express()
request.url                   app.get("/path", ...)
response.end()                res.send()
server.listen()               app.listen()
```

Express runs on top of Node.js and provides higher-level APIs for common web-server tasks.

---

## Local Installation

From the repository root:

```powershell
cd ".\workshops\build-a-random-joke-app"
npm install
```

`npm install` recreates `node_modules/` from `package.json` and `package-lock.json`.

Do not commit `node_modules/`.

---

## Local Syntax Test

Run:

```powershell
node --check server.js
```

If the JavaScript syntax is valid, Node.js exits without reporting an error.

---

## Run the Server

```powershell
node server.js
```

Expected:

```text
Server is running on port 3000
```

Keep this terminal running while testing.

---

## Browser Test

Open:

```text
http://localhost:3000/
http://localhost:3000/joke
http://localhost:3000/about
```

Expected behavior:

```text
/       → welcome message
/joke   → one joke from the jokes array
/about  → Express.js information message
```

Refresh `/joke` several times to observe random selection.

---

## PowerShell HTTP Test

Open a second PowerShell terminal while the server is running.

### Test `/`

```powershell
curl.exe -i http://localhost:3000/
```

Expected:

```text
HTTP/1.1 200 OK
```

with:

```text
Welcome to the Random Joke Server! Visit /joke to get a random joke.
```

### Test `/joke`

```powershell
curl.exe -i http://localhost:3000/joke
```

Expected:

```text
HTTP/1.1 200 OK
```

The response body must be one of the four values in the `jokes` array.

### Test `/about`

```powershell
curl.exe -i http://localhost:3000/about
```

Expected:

```text
HTTP/1.1 200 OK
```

with:

```text
This Random Joke Server was built with Express.js
```

---

## Repeat Random Joke Test

Run ten requests:

```powershell
1..10 | ForEach-Object {
  curl.exe -s http://localhost:3000/joke
}
```

Every returned value should belong to the `jokes` array.

Repeated values are valid because each request selects independently.

---

## Recommended Full Local Verification

Terminal 1:

```powershell
cd ".\workshops\build-a-random-joke-app"
npm install
node --check server.js
node server.js
```

Terminal 2:

```powershell
curl.exe -i http://localhost:3000/
curl.exe -i http://localhost:3000/joke
curl.exe -i http://localhost:3000/about
```

Expected summary:

```text
GET /       → 200 OK
GET /joke   → 200 OK + one random joke
GET /about  → 200 OK
```

Stop the server with:

```text
Ctrl + C
```

---

## Workshop Progression

```text
Lesson 1
→ enter the project directory

Lesson 2
→ require("express")
→ create app
→ set port 3000

Lesson 3
→ app.listen()
→ start server

Lesson 4
→ GET /
→ res.send()

Lesson 5
→ create jokes array

Lesson 6
→ GET /joke
→ random joke selection

Lesson 7
→ GET /about

Completion
→ 8 / 8
```

---

## Concepts Practiced

```text
Express.js
CommonJS
require()
express()
app.listen()

HTTP
GET
routing
route handlers

app.get()
req
res
res.send()

HTTP 200 OK
localhost
port 3000

arrays
global scope
array indexing
Math.random()
Math.floor()
array.length

npm
package.json
package-lock.json
npm install

curl
local HTTP testing
```

---

## Key Takeaways

1. Express reduces boilerplate compared with the Node.js `http` module.
2. `app.get()` maps a GET method and URL path to a route handler.
3. `req` represents the incoming request.
4. `res` represents the outgoing response.
5. `res.send()` sends and completes a response.
6. `Math.random()` and array indexing can be used to return dynamic content.
7. `package.json` and `package-lock.json` are enough to recreate dependencies with `npm install`.

---

## Completion

```text
Build a Random Joke App
8 / 8
✅ Completed
```

The final request flow is:

```text
Client
  ↓
HTTP GET
  ↓
Express
  ↓
Route match
  ↓
Route handler
  ↓
res.send()
  ↓
HTTP response
```
