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

Current examples:

```text
workshops/
├── learn-nodejs-repl/
│   ├── hello.js
│   └── README.md
│
└── build-a-file-processor/
    ├── server.js
    ├── README.md
    └── assets/
        ├── poem.txt
        ├── output.txt
        └── stream-output.txt
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

Certification projects will be stored separately from workshops.

They will contain the complete source code required by the project and a dedicated README describing the implementation, architecture, requirements, execution flow, testing, and concepts demonstrated.

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
│   └── build-a-file-processor/
│       ├── server.js
│       ├── README.md
│       └── assets/
│           ├── poem.txt
│           ├── output.txt
│           └── stream-output.txt
│
├── .gitignore
├── BACKEND_REVIEW.md
└── README.md
```

The structure will expand naturally as the curriculum introduces additional workshops and certification projects.

No project directories are created before they are reached in the official curriculum.

---

## Current Checkpoint

**Date:** August 25, 2026

Current curriculum section:

```text
Introduction to Node.js
└── Working with Node.js and Event-Driven Architecture
```

Completed practical workshops:

```text
Learn Node.js REPL
23 / 23 steps completed
Status: Passed

Build a File Processor
30 / 30 steps completed
Status: Passed
```

The latest workshop expanded from basic Node.js runtime interaction into practical use of Node.js core modules, file-system operations, binary data, cryptography, operating-system information, paths, process information, and streams.

The next curriculum item will only be started after the current repository checkpoint has been documented and committed.

---

## Completed Workshops

| # | Workshop | Type | Status |
|---|---|---|---|
| 1 | Learn Node.js REPL | Workshop | ✅ Completed — 23/23 |
| 2 | Build a File Processor | Workshop | ✅ Completed — 30/30 |

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

## Repository Principles

This repository follows several rules throughout the certification.

### 1. Curriculum First

The official freeCodeCamp curriculum determines the learning order.

Topics are not implemented early simply because they will be needed later.

### 2. Understand Before Expanding

Code is kept as small as the lesson requires.

Additional files are not created simply to make a workshop look more complex.

### 3. Preserve Practical Work

Workshop and certification-project source code is stored after the corresponding freeCodeCamp work has been successfully completed.

### 4. Document How Things Work

README files are intended to explain the reasoning behind the code rather than merely repeat instructions.

### 5. Separate Practice from Final Review

Workshop README files document individual practical exercises.

`BACKEND_REVIEW.md` will eventually serve as the consolidated theoretical review for the complete back-end curriculum.

### 6. Do Not Copy Course Infrastructure

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

Official freeCodeCamp workshops may also use:

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

The first workshop demonstrated that Node.js can execute JavaScript in several ways:

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

These concepts establish a foundation for later work with modules, package management, servers, HTTP, APIs, and larger back-end applications.

---

## Real-World Learning

When useful, concepts from the curriculum are compared with real-world web-development work.

The goal is to understand not only how a freeCodeCamp exercise works, but also how the same concepts appear in larger applications.

Examples from the current workshops include:

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

Explains one practical workshop in detail.

### Certification Project README

Documents a complete certification project, including its architecture and implementation.

### BACKEND_REVIEW.md

Will consolidate the major theoretical concepts learned throughout the complete certification.

---

## Progress

```text
Repository initialized                         ✅
Node.js and npm local environment verified     ✅
Git remote configured                          ✅
Main branch synchronized                       ✅

Learn Node.js REPL                             ✅ 23/23
├── Workshop source preserved                  ✅
└── Workshop README documented                 ✅

Build a File Processor                         ✅ 30/30
├── Workshop source preserved                  ✅
├── Workshop assets preserved                  ✅
└── Workshop README documented                 ✅

Final back-end review                          ⏳ Deferred until later
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
Build a File Processor
30 / 30
✅ Completed
```

Previously completed:

```text
Learn Node.js REPL
23 / 23
✅ Completed
```
