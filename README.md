# freeCodeCamp Back-End Development and APIs
Personal learning repository for the **freeCodeCamp Back-End Development and APIs Certification**.

This repository follows the curriculum sequentially. The purpose is not only to complete the certification, but also to understand how back-end systems work, document the concepts learned, and preserve the code produced in workshops and certification projects.

---

## Learning Approach
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

### Theory
Theory lessons are studied directly through freeCodeCamp.

Separate source files are not created for every theory lesson.

Important concepts will eventually be consolidated into:

```text
BACKEND_REVIEW.md
```

This file will be completed after progressing through the curriculum rather than being used as a running lesson transcript.

### Workshops
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
└── build-a-random-joke-app/
    ├── package-lock.json
    ├── package.json
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

### Reviews and Quizzes
Reviews and quizzes are used to verify understanding.

Answers are not stored as standalone projects merely to increase repository size.

Important knowledge will later be summarized in `BACKEND_REVIEW.md`.

### Certification Projects
Certification projects are stored separately from workshops:

```text
certification-projects/
├── build-a-prime-number-checker-module/
│   ├── index.js
│   ├── package.json
│   └── README.md
│
└── build-a-personal-profile-app/
    ├── package-lock.json
    ├── package.json
    ├── server.js
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

## Repository Structure
Current structure:

```text
freecodecamp-backend-development-and-apis/
│
├── workshops/
│   ├── learn-nodejs-repl/
│   │   ├── hello.js
│   │   └── README.md
│   │
│   ├── build-a-file-processor/
│   │   ├── server.js
│   │   ├── README.md
│   │   └── assets/
│   │       ├── poem.txt
│   │       ├── output.txt
│   │       └── stream-output.txt
│   │
│   ├── build-a-case-converter/
│   │   ├── .npmignore
│   │   ├── index.js
│   │   ├── index.test.js
│   │   ├── package.json
│   │   └── README.md
│   │
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
│   │
│   └── build-a-random-joke-app/
│       ├── package-lock.json
│       ├── package.json
│       ├── server.js
│       └── README.md
│
├── certification-projects/
│   ├── build-a-prime-number-checker-module/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── build-a-personal-profile-app/
│       ├── package-lock.json
│       ├── package.json
│       ├── server.js
│       └── README.md
│
├── .gitignore
├── BACKEND_REVIEW.md
└── README.md
```

The structure will expand naturally as the curriculum introduces additional workshops and certification projects.

No project directories are created before they are reached in the official curriculum.

---

## Current Checkpoint
**Date:** October 1, 2026

Current practical curriculum area:

```text
Back-End Development and APIs Certification
└── Express.js fundamentals and JSON APIs
    ├── Build a Random Joke App
    │   └── 8 / 8 completed
    ├── Certification Project — Build a Personal Profile App
    │   └── 1 / 1 completed
    └── Next practical item:
        Build a Submission Form
```

Latest completed practical checkpoint:

```text
Build a Personal Profile App
Certification Project
1 / 1 completed
Status: Passed
```

Completed practical workshops:

```text
Learn Node.js REPL
23 / 23 steps completed
Status: Passed
Build a File Processor
30 / 30 steps completed
Status: Passed
Build a Case Converter
45 / 45 steps completed
Status: Passed
Build a Web Server
60 / 60 steps completed
Status: Passed
Build a Random Joke App
8 / 8 steps completed
Status: Passed
```

Completed certification projects:

```text
Build a Prime Number Checker Module
1 / 1 completed
Status: Passed
Build a Personal Profile App
1 / 1 completed
Status: Passed
```

The latest certification project applies Express routing independently and introduces a JSON API response with `res.json()`.

It applies:

```text
Express.js
CommonJS
require("express")
express()
app.listen()
app.get()
req
res
res.send()
res.json()
HTTP GET routing
HTTP 200 responses
JSON APIs
application/json
JavaScript objects
JavaScript arrays
package.json
package-lock.json
npm install
node --check
curl HTTP verification
local server/API testing
```

The project was verified locally after being copied from Codespaces: dependencies installed successfully, JavaScript syntax passed `node --check`, the Express server started on port `3000`, all four routes returned `HTTP/1.1 200 OK`, and `/api/profile` returned the expected JSON payload with the correct `application/json` content type.

The next practical item shown in the curriculum is **Build a Submission Form**.

---

## Completed Workshops
| # | Workshop | Type | Status |
|---|---|---|---|
| 1 | Learn Node.js REPL | Workshop | ✅ Completed — 23/23 |
| 2 | Build a File Processor | Workshop | ✅ Completed — 30/30 |
| 3 | Build a Case Converter | Workshop | ✅ Completed — 45/45 |
| 4 | Build a Web Server | Workshop | ✅ Completed — 60/60 |
| 5 | Build a Random Joke App | Workshop | ✅ Completed — 8/8 |

---

## Completed Certification Projects
| # | Project | Type | Status |
|---|---|---|---|
| 1 | Build a Prime Number Checker Module | Certification Project | ✅ Completed — 1/1 |
| 2 | Build a Personal Profile App | Certification Project | ✅ Completed — 1/1 |

---

## Workshop 01 — Learn Node.js REPL
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

## Workshop 02 — Build a File Processor
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

## Workshop 03 — Build a Case Converter
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

## Workshop 04 — Build a Web Server
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
  // success or 404 handling
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

## Workshop 05 — Build a Random Joke App
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

## Certification Project 01 — Build a Prime Number Checker Module
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

## Certification Project 02 — Build a Personal Profile App
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

## Repository Principles
This repository follows several rules throughout the certification.

### 1. Curriculum First
The official freeCodeCamp curriculum determines the learning order.

Topics are not implemented early simply because they will be needed later.

### 2. Understand Before Expanding
Code is kept as small as the lesson requires.

Additional files are not created simply to make a workshop or project look more complex.

### 3. Preserve Practical Work
Workshop and certification-project source code is stored after the corresponding freeCodeCamp work has been successfully completed.

### 4. Document How Things Work
README files are intended to explain the reasoning behind the code rather than merely repeat instructions.

### 5. Separate Workshops from Certification Projects
Guided workshops are stored under:

```text
workshops/
```

Requirement-driven certification projects are stored under:

```text
certification-projects/
```

This keeps practice exercises separate from independently completed assessment work.

### 6. Separate Practice from Final Review
Workshop and certification-project README files document individual practical exercises.

`BACKEND_REVIEW.md` will eventually serve as the consolidated theoretical review for the complete back-end curriculum.

### 7. Do Not Copy Course Infrastructure
freeCodeCamp testing infrastructure, course runners, loggers, and internal grading files are not copied into this repository unless they are explicitly part of a project requirement.

Only the learner's relevant source code and documentation are preserved.

---

## Development Environment
The repository is developed locally using:

```text
Git
GitHub
Visual Studio Code
Node.js
npm
PowerShell
```

Official freeCodeCamp workshops and projects may also use:

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

## Node.js in This Curriculum
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

This establishes a foundation for later Express middleware, parameters, JSON APIs, REST services, error handling, databases, and larger back-end applications.

---

## Real-World Learning
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
```

These comparisons are supplementary.

They do not replace the official curriculum or change its learning order.

---

## Documentation Strategy
Documentation is organized at three levels:

```text
Individual Workshop README
        ↓
Certification Project README
        ↓
BACKEND_REVIEW.md
```

### Workshop README
Explains one guided practical workshop in detail.

### Certification Project README
Documents a complete requirement-driven project, including implementation, algorithm or architecture, verification, and completion status.

### BACKEND_REVIEW.md
Will consolidate the major theoretical concepts learned throughout the complete certification.

---

## Progress
```text
Repository initialized                              ✅
Node.js and npm local environment verified          ✅
Git remote configured                               ✅
Main branch synchronized                             ✅
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
├── All three routes verified with HTTP 200          ✅
├── Workshop README documented                      ✅
└── freeCodeCamp workshop completed                 ✅
Build a Personal Profile App                        ✅ 1/1
├── Certification project passed                    ✅
├── Project source preserved                        ✅
├── package.json preserved                          ✅
├── package-lock.json preserved                     ✅
├── Express dependency installed locally            ✅
├── JavaScript syntax verification completed        ✅
├── All four routes verified with HTTP 200           ✅
├── JSON Content-Type verified                      ✅
├── JSON response shape verified                    ✅
└── Project README documented                       ✅
Build a Submission Form                             ⏳ Next practical item
Final back-end review                               ⏳ Deferred until later
```

---

## Current Learning Summary
Completed guided workshops:

```text
5
```

Completed certification projects:

```text
2
```

Current practical record:

```text
Learn Node.js REPL                     23 / 23 ✅
Build a File Processor                 30 / 30 ✅
Build a Case Converter                 45 / 45 ✅
Build a Prime Number Checker Module     1 / 1  ✅
Build a Web Server                     60 / 60 ✅
Build a Random Joke App                 8 / 8  ✅
Build a Personal Profile App            1 / 1  ✅
```

Current practical checkpoint:

```text
Certification Project
Build a Personal Profile App
1 / 1 completed
Local verification:
- npm install: passed
- node --check server.js: passed
- server startup on port 3000: passed
- GET /: 200 OK
- GET /hobbies: 200 OK
- GET /skills: 200 OK
- GET /api/profile: 200 OK
- /api/profile Content-Type: application/json
- JSON profile object: verified
```

Next practical curriculum item:

```text
Build a Submission Form
```

---

## Goal
The long-term objective of this repository is to demonstrate both:

```text
Understanding
+
Implementation
```

Completing a lesson is useful.

Understanding why the code works, being able to explain it, and applying the same concepts to real systems is the larger goal.

---

## Current Status
**freeCodeCamp Back-End Development and APIs Certification**

```text
In Progress
```

Latest completed practical checkpoint:

```text
Build a Personal Profile App
Certification Project
1 / 1
✅ Completed
```

Local verification:

```text
npm install                      ✅
node --check server.js           ✅
node server.js                   ✅
GET /                            ✅ 200 OK
GET /hobbies                     ✅ 200 OK
GET /skills                      ✅ 200 OK
GET /api/profile                 ✅ 200 OK
Content-Type: application/json   ✅
JSON profile payload             ✅
```

Previously completed:

```text
Build a Random Joke App
8 / 8
✅ Completed
Build a Web Server
60 / 60
✅ Completed
Build a Prime Number Checker Module
Certification Project
1 / 1
✅ Completed
Build a Case Converter
45 / 45
✅ Completed
Build a File Processor
30 / 30
✅ Completed
Learn Node.js REPL
23 / 23
✅ Completed
```

Next practical item:

```text
Build a Submission Form
```
