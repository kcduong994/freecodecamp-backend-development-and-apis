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
└── build-a-case-converter/
    ├── .npmignore
    ├── index.js
    ├── index.test.js
    ├── package.json
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
└── build-a-prime-number-checker-module/
    ├── index.js
    ├── package.json
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
│   └── build-a-case-converter/
│       ├── .npmignore
│       ├── index.js
│       ├── index.test.js
│       ├── package.json
│       └── README.md
│
├── certification-projects/
│   └── build-a-prime-number-checker-module/
│       ├── index.js
│       ├── package.json
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

**Date:** September 4, 2026

Current curriculum area:

```text
Back-End Development and APIs Certification
└── Node.js and npm module development
    ├── Node.js runtime and REPL
    ├── Node.js core modules and streams
    ├── npm package development and testing
    └── Certification Project:
        Build a Prime Number Checker Module
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
```

Completed certification projects:

```text
Build a Prime Number Checker Module
1 / 1 completed
Status: Passed
```

The latest checkpoint moves from guided npm-package exercises into a requirement-driven certification project.

The project applies:

```text
npm package structure
package.json metadata
CommonJS
module.exports
algorithm design
Number.isInteger()
modulo arithmetic
Math.sqrt()
O(√n) reasoning
freeCodeCamp automated project tests
```

The next curriculum item will only be started after this checkpoint has been documented, committed, pushed, and submitted to freeCodeCamp.

---

## Completed Workshops

| # | Workshop | Type | Status |
|---|---|---|---|
| 1 | Learn Node.js REPL | Workshop | ✅ Completed — 23/23 |
| 2 | Build a File Processor | Workshop | ✅ Completed — 30/30 |
| 3 | Build a Case Converter | Workshop | ✅ Completed — 45/45 |

---

## Completed Certification Projects

| # | Project | Type | Status |
|---|---|---|---|
| 1 | Build a Prime Number Checker Module | Certification Project | ✅ Completed — 1/1 |

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

The package metadata includes:

```text
name
version
description
keywords
license
author
type: commonjs
main: index.js
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

Conceptually:

```text
Input number
     ↓
Integer and > 1?
     ├── No → false
     └── Yes
           ↓
Check divisors from 2 to √number
           ↓
Any exact divisor?
     ├── Yes → false
     └── No  → true
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

The first certification project then required those concepts to be applied independently:

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

These concepts establish a foundation for later work with dependencies, servers, HTTP, APIs, middleware, databases, and larger back-end applications.

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

Final back-end review                               ⏳ Deferred until later
```

---

## Current Learning Summary

Completed guided workshops:

```text
3
```

Completed certification projects:

```text
1
```

Current practical record:

```text
Learn Node.js REPL                     23 / 23 ✅
Build a File Processor                 30 / 30 ✅
Build a Case Converter                 45 / 45 ✅
Build a Prime Number Checker Module     1 / 1  ✅
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
Build a Prime Number Checker Module
Certification Project
1 / 1
✅ Completed
```

Previously completed:

```text
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
