# **freeCodeCamp Back-End Development and APIs**

Personal learning repository for the **freeCodeCamp Back-End Development and APIs Certification**.

This repository follows the curriculum sequentially. The purpose is not only to complete the certification, but also to understand how back-end systems work, document the concepts learned, and preserve the code produced in workshops, labs, and certification projects.

---

## **Learning Approach**

The curriculum is studied in its official order without skipping ahead.

The repository follows this workflow:

```text
Theory
↓
Workshop / Lab
↓
Review
↓
Quiz
↓
Certification Project
↓
Final Back-End Review
```

Each type of lesson is handled differently.

### **Theory**

Theory lessons are studied directly through freeCodeCamp.

Separate source files are not created for every theory lesson.

Important concepts will eventually be consolidated into:

```text
BACKEND_REVIEW.md
```

This file will be completed after progressing through the curriculum rather than being used as a running lesson transcript.

### **Workshops**

Every workshop that produces code receives its own directory.

Current workshops:

```text
workshops/
├── learn-nodejs-repl/
│   ├── hello.js
│   └── README.md
│
├── build-a-file-processor/
│   ├── server.js
│   ├── README.md
│   └── assets/
│       ├── poem.txt
│       ├── output.txt
│       └── stream-output.txt
│
├── build-a-case-converter/
│   ├── .npmignore
│   ├── index.js
│   ├── index.test.js
│   ├── package.json
│   └── README.md
│
├── build-a-web-server/
│   ├── public/
│   │   ├── 404.html
│   │   ├── about.html
│   │   ├── forrest1.png
│   │   ├── forrest2.png
│   │   ├── forrest3.png
│   │   ├── index.html
│   │   ├── products.html
│   │   └── style.css
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── build-a-random-joke-app/
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── build-a-submission-form/
│   ├── middleware/
│   │   └── error.middleware.js
│   ├── routes/
│   │   └── api.routes.js
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── build-a-weather-service-api/
│   ├── public/
│   │   └── index.html
│   ├── index.js
│   ├── weather.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
└── build-a-bank-api/
    ├── accounts.json
    ├── db.js
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── README.md
```

Each workshop README documents:

- the purpose of the workshop;

- the commands and source code used;

- how the code works;

- important terminology;

- expected output;

- concepts demonstrated by the workshop;

- concepts introduced but intentionally deferred until later lessons;

- workshop completion and verification.

### **Labs**

Independent practice labs are stored separately from guided workshops:

```text
labs/
└── build-a-data-sanitizer/
    ├── public/
    │   └── index.html
    ├── middleware.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    └── README.md
```

Labs are requirement-driven practice exercises. They are used to apply concepts introduced by the surrounding theory and workshops with less step-by-step guidance.

Each lab README documents:

- the lab objective and user stories;

- the final source structure;

- the middleware or application flow;

- local verification;

- freeCodeCamp completion status.

### **Reviews and Quizzes**

Reviews and quizzes are used to verify understanding.

Answers are not stored as standalone projects merely to increase repository size.

Important knowledge will later be summarized in `BACKEND_REVIEW.md`.

### **Certification Projects**

Certification projects are stored separately from workshops:

```text
certification-projects/
├── build-a-prime-number-checker-module/
│   ├── index.js
│   ├── package.json
│   └── README.md
├── build-a-personal-profile-app/
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── README.md
└── build-a-timestamp-microservice/
    ├── public/
    │   └── styles.css
    ├── views/
    │   └── index.html
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── README.md
```

Certification projects are requirement-driven rather than step-by-step workshop exercises.

Each project directory preserves:

- the final source code;

- the required package or project metadata;

- a dedicated README;

- implementation reasoning;

- algorithm or architecture notes;

- local verification;

- freeCodeCamp completion status.

---

## **Repository Structure**

Current structure:

```text
freecodecamp-backend-development-and-apis/
├── workshops/
│   ├── learn-nodejs-repl/
│   │   ├── hello.js
│   │   └── README.md
│   ├── build-a-file-processor/
│   │   ├── server.js
│   │   ├── README.md
│   │   └── assets/
│   │       ├── poem.txt
│   │       ├── output.txt
│   │       └── stream-output.txt
│   ├── build-a-case-converter/
│   │   ├── .npmignore
│   │   ├── index.js
│   │   ├── index.test.js
│   │   ├── package.json
│   │   └── README.md
│   ├── build-a-web-server/
│   │   ├── public/
│   │   │   ├── 404.html
│   │   │   ├── about.html
│   │   │   ├── forrest1.png
│   │   │   ├── forrest2.png
│   │   │   ├── forrest3.png
│   │   │   ├── index.html
│   │   │   ├── products.html
│   │   │   └── style.css
│   │   ├── package.json
│   │   ├── server.js
│   │   └── README.md
│   ├── build-a-random-joke-app/
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── server.js
│   │   └── README.md
│   ├── build-a-submission-form/
│   │   ├── middleware/
│   │   │   └── error.middleware.js
│   │   ├── routes/
│   │   │   └── api.routes.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── server.js
│   │   └── README.md
│   ├── build-a-weather-service-api/
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── index.js
│   │   ├── weather.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   └── README.md
│   └── build-a-bank-api/
│       ├── accounts.json
│       ├── db.js
│       ├── package.json
│       ├── package-lock.json
│       ├── server.js
│       └── README.md
├── labs/
│   └── build-a-data-sanitizer/
│       ├── public/
│       │   └── index.html
│       ├── middleware.js
│       ├── package-lock.json
│       ├── package.json
│       ├── server.js
│       └── README.md
├── certification-projects/
│   ├── build-a-prime-number-checker-module/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── README.md
│   ├── build-a-personal-profile-app/
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── server.js
│   │   └── README.md
│   └── build-a-timestamp-microservice/
│       ├── public/
│       │   └── styles.css
│       ├── views/
│       │   └── index.html
│       ├── server.js
│       ├── package.json
│       ├── package-lock.json
│       └── README.md
├── .gitignore
├── BACKEND_REVIEW.md
└── README.md
```

The structure will expand naturally as the curriculum introduces additional workshops, labs, and certification projects.

No project directories are created before they are reached in the official curriculum.

---

## **Current Checkpoint**

**Date:** October 20, 2026

Latest completed practical checkpoint:

```text
Build a Bank API
Workshop 08
35 / 35 completed
Official freeCodeCamp status: Passed
Windows local verification: GET /, /accounts, /accounts/1, /health passed
```

Tiny Bank API uses Express 5 async error propagation, structured JSON errors, JSON-backed account persistence, a health-check endpoint, and SIGTERM/SIGINT graceful shutdown. Its source is preserved under `workshops/build-a-bank-api/`.

The previous checkpoint was **Build a Timestamp Microservice**, Certification Project 03 (1/1 official and 7/7 local checks), completed October 17, 2026. Its source remains archived at `certification-projects/build-a-timestamp-microservice/`.

**Current totals:** 8 completed workshops, 1 completed lab, and 3 completed certification projects.

---

## **Completed Workshops**

| # | Workshop | Type | Status |

|---|---|---|---|

| 1 | Learn Node.js REPL | Workshop | ✅ Completed — 23/23 |

| 2 | Build a File Processor | Workshop | ✅ Completed — 30/30 |

| 3 | Build a Case Converter | Workshop | ✅ Completed — 45/45 |

| 4 | Build a Web Server | Workshop | ✅ Completed — 60/60 |

| 5 | Build a Random Joke App | Workshop | ✅ Completed — 8/8 |

| 6 | Build a Submission Form | Workshop | ✅ Completed — 22/22 |

| 7 | Build a Weather Service API | Workshop | ✅ Completed — 20/20 |
| 8 | Build a Bank API | Workshop | ✅ Completed — 35/35 |

---

## **Completed Labs**

| # | Lab | Type | Status |

|---|---|---|---|

| 1 | Build a Data Sanitizer | Lab | ✅ Completed — 1/1 |

---

## **Completed Certification Projects**

| # | Project | Type | Status |

|---|---|---|---|

| 1 | Build a Prime Number Checker Module | Certification Project | ✅ Completed — 1/1 |

| 2 | Build a Personal Profile App | Certification Project | ✅ Completed — 1/1 |

| 3 | Build a Timestamp Microservice | Certification Project | ✅ Completed — 1/1 |

---

## **Workshop 01 — Learn Node.js REPL**

Location:

```text
workshops/learn-nodejs-repl/
```

Permanent source code:

```js
console.log("Hello from a file");
```

The workshop primarily focused on terminal and runtime interaction rather than application development.

Topics practiced include:

```text
Node.js version checking
npm version checking
Node.js CLI flags
node -e
node -p
node --check
running JavaScript files
Node.js REPL
REPL expressions
variables
functions
the special _ variable
built-in Node.js modules
require()
CommonJS
ES Modules
.help
.exit
```

Full notes and explanations are available in:

```text
workshops/learn-nodejs-repl/README.md
```

---

## **Workshop 02 — Build a File Processor**

Location:

```text
workshops/build-a-file-processor/
```

Main source file:

```text
workshops/build-a-file-processor/server.js
```

Workshop assets:

```text
workshops/build-a-file-processor/assets/
├── poem.txt
├── output.txt
└── stream-output.txt
```

This workshop introduced practical file processing and several major Node.js core APIs.

Topics practiced include:

```text
fs
fs.readFileSync()
fs.readFile()
fs/promises
async / await
fs.writeFileSync()
fs.appendFileSync()
fs.existsSync()
fs.readdirSync()
Buffer
Buffer.from()
Buffer.alloc()
UTF-8
hexadecimal encoding
Base64 encoding and decoding
crypto
SHA-256 hashing
crypto.randomBytes()
crypto.randomUUID()
os
os.platform()
os.arch()
os.hostname()
os.totalmem()
os.freemem()
os.uptime()
os.cpus()
path
path.join()
path.resolve()
path.basename()
path.dirname()
path.extname()
path.parse()
process
process.version
process.platform
process.env
process.argv
process.stdout
process.stderr
Streams
fs.createReadStream()
fs.createWriteStream()
data events
end events
chunks
readable.pipe(writable)
```

The final workshop code connects a readable file stream directly to a writable file stream:

```js
const readable = fs.createReadStream("assets/poem.txt");
const writable = fs.createWriteStream("assets/stream-output.txt");
readable.pipe(writable);
```

Conceptually:

```text
poem.txt
   ↓
Readable Stream
   ↓
pipe()
   ↓
Writable Stream
   ↓
stream-output.txt
```

Full notes and explanations are available in:

```text
workshops/build-a-file-processor/README.md
```

---

## **Workshop 03 — Build a Case Converter**

Location:

```text
workshops/build-a-case-converter/
```

Main source file:

```text
workshops/build-a-case-converter/index.js
```

Automated tests:

```text
workshops/build-a-case-converter/index.test.js
```

npm package metadata:

```text
workshops/build-a-case-converter/package.json
```

npm publication exclusions:

```text
workshops/build-a-case-converter/.npmignore
```

This workshop introduced the complete lifecycle of a small reusable Node.js package: initialization, implementation, module exports, documentation, automated testing, npm scripts, and publication preparation.

Topics practiced include:

```text
npm init
package.json
package metadata
entry point
Semantic Versioning (SemVer)
String transformation
toUpperCase()
toLowerCase()
charAt()
slice()
split()
map()
join()
CommonJS
module.exports
require()
Package README documentation
usage examples
node:assert/strict
assert.strictEqual()
automated tests
intentional test failure
test repair
npm scripts
npm test
npm publish --dry-run
npm package inspection
.npmignore
.gitignore vs .npmignore
npm publication preparation
```

The package exposes four public functions:

```js
getUpperCase();
getLowerCase();
getSentenceCase();
getProperCase();
```

Example:

```js
const caseConverter = require("./index");
const str = "hello free Code Camp!";
console.log(caseConverter.getUpperCase(str));
// HELLO FREE CODE CAMP!
console.log(caseConverter.getLowerCase(str));
// hello free code camp!
console.log(caseConverter.getSentenceCase(str));
// Hello free code camp!
console.log(caseConverter.getProperCase(str));
// Hello Free Code Camp!
```

The module exports its public API through CommonJS:

```js
module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase,
};
```

The automated test suite uses Node.js's built-in strict assertion API:

```js
const assert = require("node:assert/strict");
const caseConverter = require("./index");
assert.strictEqual(
  caseConverter.getUpperCase("hello free Code Camp!"),
  "HELLO FREE CODE CAMP!",
);
```

The test script is executed through npm:

```bash
npm test
```

The package publication process is inspected safely with:

```bash
npm publish --dry-run
```

The test file is intentionally excluded from the npm publication package with:

```text
.npmignore
```

containing:

```text
index.test.js
```

Full notes and explanations are available in:

```text
workshops/build-a-case-converter/README.md
```

---

## **Workshop 04 — Build a Web Server**

Location:

```text
workshops/build-a-web-server/
```

Main source file:

```text
workshops/build-a-web-server/server.js
```

ESM configuration:

```text
workshops/build-a-web-server/package.json
```

Static client files:

```text
workshops/build-a-web-server/public/
├── 404.html
├── about.html
├── forrest1.png
├── forrest2.png
├── forrest3.png
├── index.html
├── products.html
└── style.css
```

This workshop built a working HTTP server from scratch using Node.js core modules rather than a framework.

The server listens on:

```text
http://localhost:3001
```

Topics practiced include:

```text
HTTP client-server architecture
HTTP request-response model
Node.js http module
http.createServer()
server.listen()
TCP ports
localhost
curl
curl --verbose
request object
request.headers
request.url
response object
response.end()
response.writeHead()
URL-to-file mapping
root path /
index.html
path.join()
path.extname()
file extensions
fs.readFile()
callback-based asynchronous I/O
ErrnoException
ENOENT
error.message
control flow with return
custom 404 page
HTTP 200 OK
HTTP 404 Not Found
Content-Type
MIME types
text/html
text/css
text/javascript
image/png
application/octet-stream
CommonJS
require()
ECMAScript Modules
import
package.json
"type": "module"
wrk
load testing
threads
concurrent connections
requests per second
server logging overhead
```

The server maps the root request:

```text
/
```

to:

```text
/index.html
```

using:

```js
const url = request.url === "/" ? "/index.html" : request.url;
```

It then builds the requested file path:

```js
const filePath = join("public", url);
```

The file extension is normalized:

```js
const ext = extname(filePath).toLowerCase();
```

A MIME mapping is used to choose the correct response media type:

```js
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".js": "text/javascript",
};
const contentType = mimeTypes[ext] || "application/octet-stream";
```

Requested files are read asynchronously:

```js
readFile(filePath, (error, file) => {
  // success or 404 handling*
});
```

Successful responses use:

```js
response.writeHead(200, {
  "Content-Type": contentType,
});
```

Missing resources cause the server to read:

```text
public/404.html
```

and return:

```text
404 Not Found
Content-Type: text/html
```

The project was also converted from CommonJS:

```js
const http = require("http");
```

to ESM:

```js
import http from "http";
import { join, extname } from "path";
import { readFile } from "fs";
```

with:

```json
{
  "type": "module"
}
```

in `package.json`.

The server was tested manually with `curl`:

```bash
curl http://localhost:3001
curl -v http://localhost:3001/not-found
```

and load-tested with:

```bash
wrk -t2 -c5 -d5s http://localhost:3001
```

The load test uses:

```text
2 worker threads
5 concurrent connections
5 second duration
```

The workshop also demonstrated why unnecessary per-request logging can reduce throughput.

Full notes and explanations are available in:

```text
workshops/build-a-web-server/README.md
```

Completion status:

```text
Build a Web Server
60 / 60
✅ Completed
```

---

## **Workshop 05 — Build a Random Joke App**

Location:

```text
workshops/build-a-random-joke-app/
```

Main source file:

```text
workshops/build-a-random-joke-app/server.js
```

Dependency metadata:

```text
workshops/build-a-random-joke-app/package.json
workshops/build-a-random-joke-app/package-lock.json
```

This workshop introduced basic Express.js routing and response methods by building a small HTTP service that returns a welcome message, a random joke, and an about message.

Topics practiced include:

```text
Express.js
CommonJS
require()
express()
Express application
app.listen()
HTTP GET
routing
route handlers
app.get()
req
res
res.send()
HTTP 200 OK
localhost
port 3000
JavaScript arrays
global scope
array indexing
Math.random()
Math.floor()
array.length
random selection
npm install
package.json
package-lock.json
node --check
curl
local HTTP verification
```

The application defines three routes:

| Method | Path | Purpose |

|---|---|---|

| `GET` | `/` | Return the welcome message |

| `GET` | `/joke` | Return one random joke |

| `GET` | `/about` | Return information about the Express server |

The Express application is created with:

```js
const express = require("express");
const app = express();
const port = 3000;
```

A route follows the pattern:

```js
app.get("/path", (req, res) => {
  res.send("response");
});
```

The random joke route uses:

```js
app.get("/joke", (req, res) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(randomJoke);
});
```

Conceptually:

```text
Client
  ↓
HTTP GET request
  ↓
Express router
  ↓
matching app.get(...)
  ↓
route handler
  ↓
res.send(...)
  ↓
HTTP response
```

Compared with the previous Node.js HTTP workshop:

```text
Node.js http                  Express
-------------------------     -------------------------
http.createServer()           express()
request.url                   app.get("/path", ...)
response.end()                res.send()
server.listen()               app.listen()
```

Local verification completed successfully:

```text
npm install                   ✅
node --check server.js        ✅
node server.js                ✅
GET /                         ✅ 200 OK
GET /joke                     ✅ 200 OK
GET /about                    ✅ 200 OK
```

Full notes and explanations are available in:

```text
workshops/build-a-random-joke-app/README.md
```

Completion status:

```text
Build a Random Joke App
8 / 8
✅ Completed
```

---

## **Workshop 06 — Build a Submission Form**

Location:

```text
workshops/build-a-submission-form/
```

Main source file:

```text
workshops/build-a-submission-form/server.js
```

Router module:

```text
workshops/build-a-submission-form/routes/api.routes.js
```

Error middleware:

```text
workshops/build-a-submission-form/middleware/error.middleware.js
```

Dependency metadata:

```text
workshops/build-a-submission-form/package.json
workshops/build-a-submission-form/package-lock.json
```

This workshop introduced the Express middleware execution model by building a structured API with application-level middleware, router-level organization, request-body parsing, 404 handling, and centralized error handling.

Topics practiced include:

```text
Express.js
ES Modules
import
export default
named exports
app.use()
application-level middleware
router-level middleware
express.json()
express.urlencoded()
req
res
next
NextFunction
Router()
router.get()
base paths
route mounting
HTTP 200
HTTP 400
HTTP 404
HTTP 500
next(error)
error.status
req.originalUrl
error-handling middleware
(err, req, res, next)
res.status()
res.json()
middleware ordering
JSON error responses
npm start
node --check
curl
local API verification
```

The application-level middleware stack is assembled in `server.js`:

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(finalErrorHandler);
```

The API router defines three routes:

| Method | Path | Purpose |

|---|---|---|

| `GET` | `/api` | Return `API is available!` |

| `GET` | `/api/crash` | Demonstrate an internal `500` error |

| `GET` | `/api/bad-request` | Demonstrate a custom `400` error |

The router is mounted under a shared base path:

```js
app.use("/api", apiRouter);
```

The workshop demonstrates the difference between normal middleware flow:

```text
next()
↓
continue to the next regular middleware or route
```

and error flow:

```text
next(error)
↓
skip regular handlers
↓
enter error-handling middleware
```

A catch-all handler creates controlled `404` errors:

```js
function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
}
```

The final error middleware uses Express's four-parameter error-handler signature:

```js
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
```

Conceptually:

```text
Incoming Request
      ↓
Logger Middleware
      ↓
express.json()
      ↓
express.urlencoded()
      ↓
API Router
      ↓
notFoundHandler
      ↓
finalErrorHandler
      ↓
HTTP Response
```

Local verification completed successfully:

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
```

Full notes and explanations are available in:

```text
workshops/build-a-submission-form/README.md
```

Completion status:

```text
Build a Submission Form
22 / 22
✅ Completed
```

---

## **Workshop 07 — Build a Weather Service API**

**Location:** `workshops/build-a-weather-service-api/`

**Completion:** ✅ **20 / 20 steps passed**, October 14, 2026.

This workshop builds an Express weather service with a modular weather router, route parameters, calls to an external weather proxy, a browser-based interface, and a lightweight endpoint-discovery response.

Project files:

```text
build-a-weather-service-api/
├── public/
│   └── index.html
├── index.js
├── weather.js
├── package.json
├── package-lock.json
└── README.md
```

The project uses **ES Modules**, **Express 5**, and Node.js's built-in `fetch()` API. `index.js` holds application-level routing and static middleware. `weather.js` exports a separate Express router.

### **Router mounting and dynamic paths**

```js
// weather.js (excerpt)
import express from "express";
const router = express.Router();
const SUPPORTED_CITIES = ["London", "Tokyo", "New York", "Paris", "Seoul"];
router.get("/", (req, res) => {
  res.json({ supportedCities: SUPPORTED_CITIES });
});
export default router;
```

```js
// index.js (excerpt)
import weatherRouter from "./weather.js";
// app is the Express application created with express().
app.use("/api/weather", weatherRouter);
```

The router's relative `/` path resolves to `GET /api/weather`. The relative `/:city` path resolves to `GET /api/weather/:city`, with its city name available through `req.params.city`.

### **Fetching weather data**

The route handler uses `async`/`await` and a server-to-server request:

```js
router.get("/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const data = await response.json();
    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (error) {
    res.status(404).json({
      error: `Could not fetch weather data for "${city}".`,
    });
  }
});
```

The check of `response.ok` is important because `fetch()` does not automatically throw on HTTP `404` or `500`. The workshop intentionally maps failed requests to a `404` JSON response. A production service should distinguish invalid city names from external provider/network failures.

### **Serving the browser interface**

`express.static(path.join(__dirname, "public"))` serves the assets under `public/`, while the root handler defines `res.sendFile(path.join(__dirname, "public", "index.html"))`. The ESM entry point derives `__dirname` from `fileURLToPath(import.meta.url)` and `path.dirname()`.

**Frontend integration fix (October 14, 2026):** The original course HTML expected optional `country` and `iconUrl` fields that were not included in the workshop's weather JSON response. A follow-up fix in `public/index.html` now displays the available `city`, `temperature`, and `description` fields, hides the icon when `iconUrl` is absent, URL-encodes city names, and matches the city list in `weather.js`. The Express backend and successful **20/20** workshop result were preserved.

### **Main routes**

| Method | Path | Behavior |

|---|---|---|

| `GET` | `/` | Return `public/index.html` |

| `GET` | `/api/info` | Return service metadata and `endpoints` array |

| `GET` | `/api/status` | Return `{ "status": "ok" }` |

| `GET` | `/docs` | Redirect to `/api/info` |

| `GET` | `/api/greet/:name` | Return a greeting containing the name |

| `GET` | `/api/data` | Return demo API data |

| `POST` | `/api/data` | Return `201` demo creation message |

| `GET` | `/api/weather` | Return the supported cities list |

| `GET` | `/api/weather/:city` | Return weather data or `404` JSON error |

### **Local verification**

```powershell
npm install
node --check index.js
node --check weather.js
npm start
```

The server launched on port `3000`. Manual HTTP checks verified the homepage, info, status, cities, successful London weather response, and `NotARealCity` error behavior. Installation reported `0 vulnerabilities`.

The complete explanation, reproducible commands, and workshop results are preserved in `workshops/build-a-weather-service-api/README.md`.

---

## **Workshop 08 — Build a Bank API**

**Location:** `workshops/build-a-bank-api/`

**Completion:** ✅ **35 / 35 freeCodeCamp steps passed**, October 20, 2026.

This workshop implements a small Express 5 REST API backed by `accounts.json`, with asynchronous reading and writing through `db.js`. It covers HTTP validation, structured JSON errors, health diagnostics, and graceful shutdown.

Project files:

```text
build-a-bank-api/
├── accounts.json
├── db.js
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

The `db.js` module exports `getAccounts()` and `saveAccounts()` using `fs/promises`. A successful transfer updates account balances and saves the modified array.

### API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Return the Express 5 status message |
| `GET` | `/accounts` | List all accounts |
| `GET` | `/accounts/:id` | Retrieve an account by ID |
| `POST` | `/transfer` | Validate and persist a funds transfer |
| `GET` | `/health` | Report status, uptime, UTC timestamp, and memory metrics |

The API demonstrates HTTP `200`, `400`, `404`, `409`, and `500` responses. Express 5 forwards errors thrown by async route handlers to centralized four-argument error middleware without repetitive `try/catch` blocks. The temporary `GET /broken` route was used to verify the error response before being commented out.

The `SIGTERM` and `SIGINT` handlers call `server.close()` for graceful shutdown.

### Local Windows verification

The workshop was transferred from GitHub Codespaces to the Windows development environment. Dependencies were installed using `npm.cmd ci`; the application was started using `node server.js` on port `9000`.

Manual browser and `curl.exe -i` checks confirmed:

```text
GET /             ✅
GET /accounts     ✅
GET /accounts/1   ✅
GET /health       ✅
```

During installation, npm reported **three dependency vulnerabilities** (one low, one moderate, and one critical). They should be reviewed using `npm audit` before any deployment.

**Full documentation:** `workshops/build-a-bank-api/README.md`

---

## **Lab 01 — Build a Data Sanitizer**

Location:

```text
labs/build-a-data-sanitizer/
```

Main server:

```text
labs/build-a-data-sanitizer/server.js
```

Custom middleware:

```text
labs/build-a-data-sanitizer/middleware.js
```

Static form:

```text
labs/build-a-data-sanitizer/public/index.html
```

Dependency metadata:

```text
labs/build-a-data-sanitizer/package.json
labs/build-a-data-sanitizer/package-lock.json
```

This lab applies custom Express middleware to submitted form data.

The route-level middleware chain is:

```text
POST /submit
      ↓
inputCleaner
      ↓
inputValidator
      ↓
final route handler
```

The cleaner normalizes the username:

```js
req.body.username = req.body.username.toLowerCase();
```

and removes HTML tags from the comment for the purposes of this curriculum exercise:

```js
req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
```

The validator allows valid usernames to continue:

```js
if (req.body.username && req.body.username.length >= 3) {
  return next();
}
```

and redirects invalid submissions:

```js
res.redirect(
  "/form?error=Username must be at least 3 characters."
);
```

The application defines these behaviors:

| Method | Path | Purpose |

|---|---|---|

| `GET` | `/` | Redirect to `/form` |

| `GET` | `/form` | Serve `public/index.html` |

| `POST` | `/submit` | Clean, validate, and return submitted data |

Successful example:

```text
username = CuOnG
comment  = \<b>Hello\</b>
```

becomes:

```json
{
  "username": "cuong",
  "comment": "Hello"
}
```

Invalid example:

```text
username = ab
```

produces:

```text
302 Found
Location: /form?error=Username%20must%20be%20at%20least%203%20characters.
```

Local verification completed successfully:

```text
npm install                    ✅
0 vulnerabilities              ✅
node --check middleware.js     ✅
node --check server.js         ✅
node server.js                 ✅
GET / → redirect /form         ✅
GET /form                      ✅ 200
POST /submit sanitization      ✅ 200
short username redirect        ✅ 302
```

The HTML-tag removal used here is intentionally the simple transformation required by the lab. It should not be treated as a general-purpose production HTML sanitizer.

Full notes and explanations are available in:

```text
labs/build-a-data-sanitizer/README.md
```

Completion status:

```text
Build a Data Sanitizer
Lab
1 / 1
✅ Completed
```

---

## **Certification Project 01 — Build a Prime Number Checker Module**

Location:

```text
certification-projects/build-a-prime-number-checker-module/
```

Main source file:

```text
certification-projects/build-a-prime-number-checker-module/index.js
```

npm package metadata:

```text
certification-projects/build-a-prime-number-checker-module/package.json
```

Project documentation:

```text
certification-projects/build-a-prime-number-checker-module/README.md
```

This is the first certification project preserved in the repository.

Unlike the previous workshops, freeCodeCamp supplied user stories rather than step-by-step implementation instructions.

The project required a reusable npm module exposing:

```js
isPrime(number)
```

through CommonJS.

Final implementation:

```js
function isPrime(number) {
  if (!Number.isInteger(number) || number <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}
module.exports = {
  isPrime,
};
```

Important concepts applied:

```text
npm package creation
package.json
CommonJS
module.exports
named exports
Number.isInteger()
input validation
prime-number definition
modulo operator %
divisibility testing
Math.sqrt()
factor-pair reasoning
O(√n) time complexity
require()
destructuring import
local Node.js verification
user stories
automated certification tests
```

Local verification:

```powershell
node -e "const { isPrime } = require('./index'); console.log(isPrime(2), isPrime(11), isPrime(9), isPrime(1))"
```

Expected output:

```text
true true false false
```

The project passed the official freeCodeCamp certification-project tests:

```text
Build a Prime Number Checker Module
1 / 1
✅ Completed
```

Full notes and explanations are available in:

```text
certification-projects/build-a-prime-number-checker-module/README.md
```

---

## **Certification Project 02 — Build a Personal Profile App**

Location:

```text
certification-projects/build-a-personal-profile-app/
```

Main source file:

```text
certification-projects/build-a-personal-profile-app/server.js
```

Dependency metadata:

```text
certification-projects/build-a-personal-profile-app/package.json
certification-projects/build-a-personal-profile-app/package-lock.json
```

Project documentation:

```text
certification-projects/build-a-personal-profile-app/README.md
```

This is the second certification project preserved in the repository.

The project required an Express HTTP server listening on port `3000` with three plain-text routes and one JSON API route.

Required routes:

| Method | Path | Response |

|---|---|---|

| `GET` | `/` | `Welcome to Camper Bot's homepage!` |

| `GET` | `/hobbies` | `I cycle, go boating, and play guitar.` |

| `GET` | `/skills` | `JavaScript, Node.js, and Express.js!` |

| `GET` | `/api/profile` | JSON profile object |

Final JSON route:

```js
app.get("/api/profile", (req, res) => {
  res.json({
    name: "Camper Bot",
    hobbies: ["cycling", "boating", "guitar"],
    skills: ["JavaScript", "Node.js", "Express.js"],
  });
});
```

Expected JSON response:

```json
{
  "name": "Camper Bot",
  "hobbies": ["cycling", "boating", "guitar"],
  "skills": ["JavaScript", "Node.js", "Express.js"]
}
```

Important concepts applied:

```text
Express.js
CommonJS
require()
app.get()
app.listen()
HTTP GET
route handlers
req
res
res.send()
res.json()
HTTP 200 OK
Content-Type
application/json
JSON serialization
JavaScript objects
JavaScript arrays
npm init
npm install
package.json
package-lock.json
node --check
curl
local API verification
user stories
automated certification tests
```

Local verification completed successfully:

```text
npm install                      ✅
node --check server.js           ✅
node server.js                   ✅
GET /                            ✅ 200 OK
GET /hobbies                     ✅ 200 OK
GET /skills                      ✅ 200 OK
GET /api/profile                 ✅ 200 OK
JSON Content-Type                ✅ application/json
JSON object shape                ✅
```

The project passed the official freeCodeCamp certification-project tests:

```text
Build a Personal Profile App
1 / 1
✅ Completed
```

Full notes and explanations are available in:

```text
certification-projects/build-a-personal-profile-app/README.md
```

---

## **Certification Project 03 — Build a Timestamp Microservice**

**Location:** `certification-projects/build-a-timestamp-microservice/`

**Completion:** ✅ **1 / 1** freeCodeCamp certification project, October 17, 2026. The archived source passed **7 / 7** local user-story checks.

This project implements a RESTful timestamp API with Node.js and Express 5. Its input is a URL date string, a numeric Unix timestamp in milliseconds, or an omitted date parameter. Valid inputs return a JSON object with the `unix` number and `utc` GMT string; invalid inputs return `{ "error": "Invalid Date" }`.

Project files:

```text
build-a-timestamp-microservice/
├── public/
│   └── styles.css
├── views/
│   └── index.html
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

API examples:

| Path | Expected result |

|---|---|

| `GET /api/2016-12-25` | `unix: 1482624000000`, UTC date |

| `GET /api/1451001600000` | `Fri, 25 Dec 2015 00:00:00 GMT` |

| `GET /api/05%20October%202011` | Parsed human-readable date |

| `GET /api/this-is-not-a-date` | `{ "error": "Invalid Date" }` |

| `GET /api` | Current time in Unix milliseconds and UTC |

Important concepts: Express routing, `req.params`, the JavaScript `Date` object, numeric Unix milliseconds, `new Date()`, `Date.getTime()`, `Date.toUTCString()`, invalid-date validation, CORS, ESM, and local API verification.

The official project uses port `8000`. To run the archived project: `npm ci`, then `npm start`. The project-specific README includes architecture notes, expected responses, and commands for verifying all seven requirements.

**Documentation:** `certification-projects/build-a-timestamp-microservice/README.md`

---

## **Repository Principles**

This repository follows several rules throughout the certification.

### **1. Curriculum First**

The official freeCodeCamp curriculum determines the learning order.

Topics are not implemented early simply because they will be needed later.

### **2. Understand Before Expanding**

Code is kept as small as the lesson requires.

Additional files are not created simply to make a workshop or project look more complex.

### **3. Preserve Practical Work**

Workshop, lab, and certification-project source code is stored after the corresponding freeCodeCamp work has been successfully completed.

### **4. Document How Things Work**

README files are intended to explain the reasoning behind the code rather than merely repeat instructions.

### **5. Separate Workshops, Labs, and Certification Projects**

Guided workshops are stored under:

```text
workshops/
```

Independent practice labs are stored under:

```text
labs/
```

Requirement-driven certification projects are stored under:

```text
certification-projects/
```

This keeps guided practice, independent labs, and certification assessment work clearly separated.

### **6. Separate Practice from Final Review**

Workshop, lab, and certification-project README files document individual practical exercises.

`BACKEND_REVIEW.md` will eventually serve as the consolidated theoretical review for the complete back-end curriculum.

### **7. Do Not Copy Course Infrastructure**

freeCodeCamp testing infrastructure, course runners, loggers, and internal grading files are not copied into this repository unless they are explicitly part of a project requirement.

Only the learner's relevant source code and documentation are preserved.

---

## **Development Environment**

The repository is developed locally using:

```text
Git
GitHub
Visual Studio Code
Node.js
npm
PowerShell
```

Official freeCodeCamp workshops, labs, and projects may also use:

```text
GitHub Codespaces
Linux
Bash
freeCodeCamp course tooling
wrk
curl
```

The local development environment and the freeCodeCamp Codespace are separate environments and may use different Node.js or npm versions.

---

## **Node.js in This Curriculum**

Node.js is the JavaScript runtime used throughout the back-end curriculum.

The first workshop demonstrated several ways Node.js can execute JavaScript:

```text
JavaScript expression
        ↓
node -e / node -p
JavaScript file
        ↓
node file.js
Interactive input
        ↓
Node.js REPL
```

The second workshop extended that foundation into practical Node.js runtime APIs:

```text
Node.js
├── File System
├── Buffer
├── Crypto
├── Operating System
├── Path
├── Process
└── Streams
```

The third workshop extended the foundation into npm package development:

```text
Node.js
   ↓
npm
   ↓
package.json
   ↓
Reusable module
   ↓
Automated tests
   ↓
npm scripts
   ↓
Publication dry run
   ↓
Publishable package
```

The first certification project required those concepts to be applied independently:

```text
User Stories
    ↓
npm Package
    ↓
Algorithm Design
    ↓
CommonJS Export
    ↓
Local Verification
    ↓
Certification Tests
```

The fourth workshop then moved into networking and HTTP:

```text
Client
   ↓
HTTP Request
   ↓
Node.js http Server
   ↓
URL → File Path
   ↓
File System
   ↓
HTTP Status + Headers + Body
   ↓
HTTP Response
   ↓
Client
```

The fifth workshop introduced Express on top of Node.js:

```text
Node.js
   ↓
Express
   ↓
app.get() routing
   ↓
req / res
   ↓
res.send()
   ↓
HTTP response
```

The second certification project then applies Express independently and introduces a JSON API:

```text
User Stories
    ↓
Express Server
    ↓
GET Routes
    ↓
res.send() / res.json()
    ↓
JSON API
    ↓
Local Verification
    ↓
Certification Tests
```

The sixth workshop then introduces Express middleware and centralized error handling:

```text
Incoming Request
    ↓
Application Middleware
    ↓
Body Parsers
    ↓
Mounted Router
    ↓
Route Handler
    ↓
404 / Error Pipeline
    ↓
JSON Response
```

The first lab applies middleware directly to user-submitted form data:

```text
HTML Form
    ↓
express.urlencoded()
    ↓
inputCleaner
    ↓
inputValidator
    ↓
Route Handler
    ↓
Sanitized Response / Redirect
```

This extends the Express foundation into input normalization, sanitization, validation, route-level middleware composition, and controlled redirects.

The seventh workshop builds on that foundation with a modular HTTP service:

```text
Browser / API Client
    ↓
Express Application
    ├── Static HTML frontend
    ├── API metadata and status
    └── Mounted Weather Router
            ↓
        req.params.city
            ↓
        async fetch() → Weather Proxy
            ↓
        JSON Response / 404 Error
```

The eighth workshop consolidates Express 5, JSON file persistence, and Node.js process management:

```text
HTTP Request
    ↓
Express 5 Route
    ↓
Read / Validate / Transfer / Health
    ↓
JSON Success Response or Thrown Error
    ↓
Centralized Error Middleware (on error)
```

It also introduces health monitoring and graceful shutdown using `server.close()`, `SIGTERM`, and `SIGINT`.

This leads naturally to later certification projects involving REST APIs, WebSockets, authentication, and more complex back-end applications.

---

## **Real-World Learning**

When useful, concepts from the curriculum are compared with real-world back-end development.

Examples from the completed work include:

```text
File System
→ reading and writing application data
Buffer
→ binary data, files, network payloads
Crypto
→ hashing, secure random values, identifiers
Path
→ safe cross-platform file paths
Process
→ environment configuration and command-line arguments
Streams
→ large files, uploads, downloads, networking, media processing
CommonJS modules
→ organizing reusable application functionality
ES Modules
→ modern JavaScript module organization
package.json
→ package metadata, module configuration, and npm scripts
Automated assertions
→ detecting regressions and incorrect behavior
Semantic Versioning
→ communicating release compatibility
npm publish --dry-run
→ validating package contents before publication
.npmignore
→ controlling what is distributed in an npm package
Modulo arithmetic
→ divisibility and algorithmic checks
Math.sqrt()
→ reducing unnecessary search work
O(√n)
→ reasoning about algorithmic efficiency
User stories
→ translating requirements into implementation
HTTP requests
→ communication from clients to web servers
HTTP responses
→ status, headers, and body returned by servers
HTTP status codes
→ machine-readable request outcomes
Content-Type
→ telling clients how to interpret response bodies
MIME types
→ mapping file formats to media types
404 handling
→ returning controlled responses for missing resources
curl
→ direct HTTP inspection and endpoint testing
wrk
→ simple HTTP load and throughput testing
Request logging
→ useful for debugging but potentially expensive at high request volume
Express routing
→ mapping HTTP methods and URL paths to application behavior
app.get()
→ declaring GET endpoints without manually inspecting request.url
res.send()
→ sending and completing Express responses with a high-level helper
package-lock.json
→ preserving a reproducible dependency resolution
Random route responses
→ generating dynamic server output from application data
Application-level middleware
→ applying shared behavior before requests reach route handlers
Express Router
→ separating route definitions from the application entry point
next()
→ continuing the normal middleware execution chain
next(error)
→ transferring control into the Express error-handling pipeline
Centralized error handling
→ producing consistent API error responses from one shared location
Route-level middleware
→ composing request-specific processing steps before a final route handler
Input normalization
→ converting equivalent user input into a consistent representation
Input validation
→ rejecting data that does not satisfy application rules
Input sanitization
→ cleaning selected external input before downstream application logic
HTTP redirects
→ directing the client to another route when a request cannot continue normally
Route parameters (`req.params`)
→ using URL segments as request input
Express Router mounting
→ grouping endpoints under one shared base path
`fetch()` and `async`/`await`
→ contacting another HTTP service without blocking the event loop
`response.ok` and `try/catch`
→ handling failed upstream requests and controlled error responses
`express.static()` / `res.sendFile()`
→ serving a browser UI alongside API routes
Self-documenting endpoint lists
→ helping clients discover supported paths

Express 5 automatic async error propagation
→ forwarding rejected Promises and thrown errors to centralized middleware

Health monitoring
→ uptime, UTC timestamps, and process memory usage

Graceful shutdown
→ stopping HTTP acceptance when SIGTERM or SIGINT is received

JSON file persistence
→ reading and saving sample account data using fs/promises
```

These comparisons are supplementary.

They do not replace the official curriculum or change its learning order.

---

## **Documentation Strategy**

Documentation is organized at four levels:

```text
Individual Workshop README
        ↓
Individual Lab README
        ↓
Certification Project README
        ↓
BACKEND_REVIEW.md
```

### **Workshop README**

Explains one guided practical workshop in detail.

### **Lab README**

Documents one independent practice lab, including user stories, implementation flow, local verification, and completion status.

### **Certification Project README**

Documents a complete requirement-driven project, including implementation, algorithm or architecture, verification, and completion status.

### **BACKEND_REVIEW.md**

Will consolidate the major theoretical concepts learned throughout the complete certification.

---

## **Progress**

```text
Repository initialized                              ✅
Node.js and npm local environment verified          ✅
Git remote configured                               ✅
Main branch synchronized                            ✅
Learn Node.js REPL                                  ✅ 23/23
├── Workshop source preserved                       ✅
└── Workshop README documented                      ✅
Build a File Processor                              ✅ 30/30
├── Workshop source preserved                       ✅
├── Workshop assets preserved                       ✅
└── Workshop README documented                      ✅
Build a Case Converter                              ✅ 45/45
├── Workshop source preserved                       ✅
├── package.json preserved                          ✅
├── automated tests preserved                       ✅
├── .npmignore preserved                            ✅
└── Workshop README documented                      ✅
Build a Prime Number Checker Module                 ✅ 1/1
├── Certification project passed                    ✅
├── Project source preserved                        ✅
├── package.json preserved                          ✅
├── Local Node.js verification completed            ✅
└── Project README documented                       ✅
Build a Web Server                                  ✅ 60/60
├── Workshop source preserved                       ✅
├── Static public assets preserved                  ✅
├── package.json / ESM configuration preserved      ✅
├── HTTP server implementation preserved            ✅
├── Workshop README documented                      ✅
└── freeCodeCamp workshop completed                 ✅
Build a Random Joke App                             ✅ 8/8
├── Workshop source preserved                       ✅
├── package.json preserved                          ✅
├── package-lock.json preserved                     ✅
├── Express dependency installed locally            ✅
├── JavaScript syntax verification completed        ✅
├── All three routes verified with HTTP 200         ✅
├── Workshop README documented                      ✅
└── freeCodeCamp workshop completed                 ✅
Build a Personal Profile App                        ✅ 1/1
├── Certification project passed                    ✅
├── Project source preserved                        ✅
├── package.json preserved                          ✅
├── package-lock.json preserved                     ✅
├── Express dependency installed locally            ✅
├── JavaScript syntax verification completed        ✅
├── All four routes verified with HTTP 200          ✅
├── JSON Content-Type verified                      ✅
├── JSON response shape verified                    ✅
└── Project README documented                       ✅
Build a Submission Form                             ✅ 22/22
├── Workshop source preserved                       ✅
├── middleware/error.middleware.js preserved        ✅
├── routes/api.routes.js preserved                  ✅
├── package.json preserved                          ✅
├── package-lock.json preserved                     ✅
├── Local dependency installation completed         ✅
├── JavaScript syntax verification completed        ✅
├── 200 / 400 / 404 / 500 routes verified          ✅
├── Workshop README documented                      ✅
└── freeCodeCamp workshop completed                 ✅
Build a Data Sanitizer                              ✅ 1/1
├── Lab source preserved                            ✅
├── public/index.html preserved                     ✅
├── middleware.js preserved                         ✅
├── package.json preserved                          ✅
├── package-lock.json preserved                     ✅
├── Local dependency installation completed         ✅
├── 0 vulnerabilities reported by npm install       ✅
├── JavaScript syntax verification completed        ✅
├── Sanitization behavior verified                  ✅
├── Validation redirect verified                    ✅
├── Lab README documented                           ✅
└── freeCodeCamp lab completed                      ✅
Build a Weather Service API                         ✅ 20/20
├── Workshop source preserved                       ✅
├── public/index.html preserved                     ✅
├── index.js / weather.js preserved                 ✅
├── package.json / package-lock.json preserved      ✅
├── Local npm install: 0 vulnerabilities            ✅
├── Local Node.js server startup verified           ✅
├── Success and 404 responses verified              ✅
├── Workshop README documented                      ✅
└── freeCodeCamp workshop completed                 ✅
Build a Timestamp Microservice                     ✅ 1/1
├── Certification project completed                 ✅
├── 7 / 7 local user-story checks passed            ✅
├── server.js and static assets archived            ✅
├── package.json / package-lock.json preserved      ✅
└── Project README documented                       ✅
Build a Bank API                                      ✅ 35/35
├── Express 5 async error handling documented         ✅
├── Account persistence and transfer routes preserved ✅
├── Health check and shutdown handlers preserved      ✅
├── Windows localhost read endpoints verified         ✅
└── Workshop README documented                         ✅
Final back-end review                               ⏳ Deferred until later
```

---

## **Current Learning Summary**

**Completed guided workshops:** 8

**Completed labs:** 1

**Completed certification projects:** 3

Latest practical record:

```text
Learn Node.js REPL                      23 / 23 ✅
Build a File Processor                  30 / 30 ✅
Build a Case Converter                  45 / 45 ✅
Build a Prime Number Checker Module      1 / 1  ✅
Build a Web Server                      60 / 60 ✅
Build a Random Joke App                  8 / 8  ✅
Build a Personal Profile App             1 / 1  ✅
Build a Submission Form                 22 / 22 ✅
Build a Data Sanitizer                   1 / 1  ✅
Build a Weather Service API             20 / 20 ✅
Build a Timestamp Microservice           1 / 1  ✅
Build a Bank API                          35 / 35 ✅
```

Current checkpoint: **Build a Bank API** — official 35/35 and Windows localhost read-endpoint verification completed, October 20, 2026. Continue with the next exercise in the official freeCodeCamp sequence.

---

## **Goal**

The long-term objective of this repository is to demonstrate both:

```text
Understanding
+
Implementation
```

Completing a lesson is useful.

Understanding why the code works, being able to explain it, and applying the same concepts to real systems is the larger goal.

---

## **Current Status**

**freeCodeCamp Back-End Development and APIs Certification:** In Progress

**Latest completed practical checkpoint:** Build a Bank API — Workshop 08, **35 / 35** passed, October 20, 2026.

**Windows local verification:** `GET /`, `GET /accounts`, `GET /accounts/1`, and `GET /health` passed on port `9000`.

**Previous certification checkpoint:** Build a Timestamp Microservice — Certification Project 03, **1 / 1** official and **7 / 7** local checks passed, October 17, 2026.

**Repository totals:** 8 completed workshops, 1 completed lab, and 3 completed certification projects.

Previously completed projects and detailed technical notes are preserved above and in their individual README files.

**Next:** Continue in the official freeCodeCamp curriculum order.
