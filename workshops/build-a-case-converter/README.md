# Build a Case Converter

A hands-on Node.js and npm workshop from the freeCodeCamp **Back End Development and APIs** curriculum.

**Status:** Completed — **45/45 steps**

---

## Overview

This workshop introduces the fundamentals of creating, configuring, testing, documenting, and preparing a Node.js package for publication with npm.

The project implements a small **Case Converter** package that transforms strings into:

- uppercase
- lowercase
- sentence case
- proper case

The workshop also introduces:

- `npm init`
- `package.json`
- package metadata
- Semantic Versioning
- CommonJS
- `module.exports`
- `require()`
- README documentation
- Node.js assertions
- automated testing
- `npm test`
- intentionally failing and fixing a test
- `npm publish --dry-run`
- `.npmignore`

---

## Project Structure

```text
build-a-case-converter/
│
├── .npmignore
├── README.md
├── index.js
├── index.test.js
└── package.json
```

### Files

- `index.js` — Case Converter implementation and exports
- `index.test.js` — automated tests
- `package.json` — npm package metadata and scripts
- `.npmignore` — files excluded from the published npm package
- `README.md` — workshop documentation

---

## 1. Initializing an npm Package

The project begins by creating a directory:

```bash
mkdir case_converter
cd case_converter
```

Then initialize the package:

```bash
npm init
```

`npm init` launches an interactive setup process that creates `package.json`.

Typical metadata includes:

```text
package name
version
description
entry point
test command
Git repository
keywords
author
license
module type
```

---

## 2. `package.json`

`package.json` is the central metadata and configuration file for an npm package.

A simplified example from this workshop is:

```json
{
  "name": "case_converter",
  "version": "1.0.0",
  "description": "This package is used to convert strings to a specific case.",
  "main": "index.js",
  "scripts": {
    "test": "node index.test.js"
  }
}
```

The real file may contain additional fields entered during `npm init`.

Important fields:

| Field | Purpose |
|---|---|
| `name` | package name |
| `version` | package version |
| `description` | short package description |
| `main` | package entry point |
| `scripts` | npm commands |
| `keywords` | searchable package keywords |
| `author` | package author |
| `license` | package license |
| `repository` | source repository information |

---

## 3. Semantic Versioning

The package starts with:

```text
1.0.0
```

This follows **Semantic Versioning (SemVer)**:

```text
1.0.0
│ │ │
│ │ └── PATCH
│ └──── MINOR
└────── MAJOR
```

- **MAJOR** — breaking or incompatible changes
- **MINOR** — new backward-compatible functionality
- **PATCH** — backward-compatible bug fixes

Examples:

```text
1.0.0 → 2.0.0   MAJOR
1.0.0 → 1.1.0   MINOR
1.0.0 → 1.0.1   PATCH
```

---

## 4. Package Entry Point

The workshop uses:

```text
index.js
```

as the package entry point.

This corresponds to:

```json
{
  "main": "index.js"
}
```

Another CommonJS file can load the module with:

```js
const caseConverter = require("./index");
```

---

## 5. Uppercase Conversion

```js
function getUpperCase(str) {
  return str.toUpperCase();
}
```

Example:

```js
getUpperCase("hello free Code Camp!");
```

Result:

```text
HELLO FREE CODE CAMP!
```

---

## 6. Lowercase Conversion

```js
function getLowerCase(str) {
  return str.toLowerCase();
}
```

Example:

```js
getLowerCase("hello free Code Camp!");
```

Result:

```text
hello free code camp!
```

---

## 7. Sentence Case

Sentence case makes the first character uppercase and the remaining characters lowercase.

```js
function getSentenceCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
```

Example:

```js
getSentenceCase("hello free Code Camp!");
```

Result:

```text
Hello free code camp!
```

Conceptually:

```text
"hello free Code Camp!"
        ↓
"h" → "H"
        +
"ello free Code Camp!" → "ello free code camp!"
        ↓
"Hello free code camp!"
```

---

## 8. Proper Case

Proper case capitalizes the first character of every word and lowercases the rest of each word.

```js
function getProperCase(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
```

Example:

```js
getProperCase("hello free Code Camp!");
```

Result:

```text
Hello Free Code Camp!
```

Transformation:

```text
"hello free Code Camp!"
        ↓ split(" ")
["hello", "free", "Code", "Camp!"]
        ↓ map(...)
["Hello", "Free", "Code", "Camp!"]
        ↓ join(" ")
"Hello Free Code Camp!"
```

Important methods used:

```text
split()
map()
charAt()
slice()
toUpperCase()
toLowerCase()
join()
```

---

## 9. CommonJS Modules

The package uses **CommonJS**.

The functions are exported with:

```js
module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase,
};
```

They can then be imported with:

```js
const caseConverter = require("./index");
```

Conceptually:

```text
index.js
   │
   ├── getUpperCase
   ├── getLowerCase
   ├── getSentenceCase
   └── getProperCase
          │
          ▼
    module.exports
          │
          ▼
       require()
          │
          ▼
      another file
```

---

## 10. Final `index.js`

```js
// Build a Case Converter
// freeCodeCamp - Back End Development and APIs

// Convert the entire string to uppercase.
function getUpperCase(str) {
  return str.toUpperCase();
}

// Convert the entire string to lowercase.
function getLowerCase(str) {
  return str.toLowerCase();
}

// Convert the string to sentence case:
// first character uppercase, remaining characters lowercase.
function getSentenceCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Convert every word to proper case:
// first character uppercase, remaining characters lowercase.
function getProperCase(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Export the functions so they can be used by other CommonJS modules.
module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase,
};
```

---

## 11. Package README and Usage

The workshop also introduces package documentation.

A basic package README contains the package title and description:

```md
# Case Converter

This package is used to convert strings to a specific case.
```

Example usage:

```js
const caseConverter = require("./index");
const str = "hello free Code Camp!";

console.log(caseConverter.getUpperCase(str));
// HELLO FREE CODE CAMP!

console.log(caseConverter.getLowerCase(str));
// hello free code camp!

console.log(caseConverter.getProperCase(str));
// Hello Free Code Camp!

console.log(caseConverter.getSentenceCase(str));
// Hello free code camp!
```

---

## 12. Automated Testing

The workshop uses Node.js's built-in strict assertion API:

```js
const assert = require("node:assert/strict");
```

The package is imported with:

```js
const caseConverter = require("./index");
```

`assert.strictEqual(actual, expected)` checks whether:

```text
actual === expected
```

If the values differ, Node.js throws an `AssertionError`.

---

## 13. Final `index.test.js`

```js
const assert = require("node:assert/strict");
const caseConverter = require("./index");

assert.strictEqual(
  caseConverter.getUpperCase("hello free Code Camp!"),
  "HELLO FREE CODE CAMP!",
);

assert.strictEqual(
  caseConverter.getLowerCase("hello free Code Camp!"),
  "hello free code camp!",
);

assert.strictEqual(
  caseConverter.getProperCase("hello free Code Camp!"),
  "Hello Free Code Camp!",
);

assert.strictEqual(
  caseConverter.getSentenceCase("hello free Code Camp!"),
  "Hello free code camp!",
);
```

Each assertion follows the same pattern:

```text
Input
  ↓
Function
  ↓
Actual result
  ↓
assert.strictEqual()
  ↕
Expected result
  ↓
PASS / FAIL
```

---

## 14. Intentionally Failing a Test

The workshop intentionally changes one expected value so a test fails.

Example:

```js
assert.strictEqual(
  caseConverter.getUpperCase("hello free Code Camp!"),
  "WRONG RESULT",
);
```

Actual:

```text
HELLO FREE CODE CAMP!
```

Expected:

```text
WRONG RESULT
```

Node.js therefore reports:

```text
AssertionError [ERR_ASSERTION]
```

This demonstrates that the test suite can detect incorrect behavior.

The assertion is then restored to its correct expected value.

---

## 15. npm Test Script

The `package.json` file defines:

```json
{
  "scripts": {
    "test": "node index.test.js"
  }
}
```

This allows the package tests to be run with:

```bash
npm test
```

Execution flow:

```text
npm test
   ↓
package.json
   ↓
scripts.test
   ↓
node index.test.js
   ↓
assertions execute
```

A successful run may only show:

```text
> case_converter@1.0.0 test
> node index.test.js
```

If no `AssertionError` appears, the tests passed.

---

## 16. Manual Module Check

The package can also be checked directly from the command line:

```bash
node -e "const c = require('./index'); console.log(c.getProperCase('hello free Code Camp!'))"
```

Expected output:

```text
Hello Free Code Camp!
```

---

## 17. Preparing an npm Package for Publication

A real npm publication command is:

```bash
npm publish
```

Before publishing, the workshop uses:

```bash
npm publish --dry-run
```

A **dry run** simulates publication without actually publishing the package.

It lets the developer inspect:

- package name
- version
- package size
- unpacked size
- included files
- tarball information
- integrity information

Conceptually:

```text
Local project
     ↓
npm publish --dry-run
     ↓
Package assembly simulation
     ↓
Inspect package contents
     ↓
No real publication
```

---

## 18. `.npmignore`

The dry run shows that the test file would be included in the package.

The workshop creates:

```text
.npmignore
```

with:

```text
index.test.js
```

This keeps the test file in the source repository while excluding it from the package published to npm.

Conceptually:

```text
Local project
├── index.js          → included
├── README.md         → included
├── package.json      → included
├── index.test.js     → excluded
└── .npmignore        → controls package contents
```

---

## 19. `.gitignore` vs `.npmignore`

These files solve different problems.

```text
.gitignore
→ controls what Git tracks

.npmignore
→ controls what npm publishes
```

A file may therefore remain in GitHub but be excluded from the npm package.

For this workshop:

```text
index.test.js
```

is useful development code, but it does not need to be included in the published package.

---

## 20. Package Development Workflow

The workshop demonstrates this package-development workflow:

```text
Create project directory
        ↓
npm init
        ↓
configure package.json
        ↓
create index.js
        ↓
implement functions
        ↓
export public API
        ↓
write README
        ↓
create index.test.js
        ↓
write assertions
        ↓
npm test
        ↓
intentionally fail a test
        ↓
fix the test
        ↓
npm publish --dry-run
        ↓
inspect package contents
        ↓
create .npmignore
        ↓
package ready for publication
```

---

## Important Concepts Learned

### npm

npm is the package manager commonly used with Node.js.

In this workshop it is used for:

```text
initializing a package
storing package metadata
running scripts
testing
preparing publication
simulating publication
```

### Package

A package is a reusable unit of JavaScript code plus metadata and documentation.

### Module

A module exposes functionality that other code can import and use.

This module exposes:

```text
getUpperCase()
getLowerCase()
getSentenceCase()
getProperCase()
```

### CommonJS

CommonJS uses:

```js
require()
```

for importing and:

```js
module.exports
```

for exporting.

### Automated Testing

Tests compare actual results against expected results automatically.

### Dry Run

A dry run simulates an external operation without performing the final action.

For npm:

```bash
npm publish --dry-run
```

shows what would be published without publishing it.

---

## Running the Workshop Locally

Navigate to the workshop directory:

```powershell
cd "workshops\build-a-case-converter"
```

Run the tests:

```powershell
npm test
```

Test the module manually:

```powershell
node -e "const c = require('./index'); console.log(c.getProperCase('hello free Code Camp!'))"
```

Expected output:

```text
Hello Free Code Camp!
```

---

## Final Package API

| Function | Example Input | Output |
|---|---|---|
| `getUpperCase()` | `hello free Code Camp!` | `HELLO FREE CODE CAMP!` |
| `getLowerCase()` | `hello free Code Camp!` | `hello free code camp!` |
| `getSentenceCase()` | `hello free Code Camp!` | `Hello free code camp!` |
| `getProperCase()` | `hello free Code Camp!` | `Hello Free Code Camp!` |

---

## Key Takeaways

After completing this workshop, I understand how to:

- create a Node.js package directory
- initialize an npm package with `npm init`
- configure `package.json`
- understand package metadata
- use Semantic Versioning
- define a package entry point
- implement reusable JavaScript functions
- use string methods such as `toUpperCase()`, `toLowerCase()`, `charAt()`, and `slice()`
- use `split()`, `map()`, and `join()`
- export CommonJS functionality with `module.exports`
- import CommonJS modules with `require()`
- document package usage in a README
- write assertions with `node:assert/strict`
- compare actual and expected values
- intentionally create a failing test
- understand how automated tests detect errors
- configure npm scripts
- run tests with `npm test`
- inspect package contents with `npm publish --dry-run`
- distinguish a dry run from a real publication
- use `.npmignore`
- distinguish `.npmignore` from `.gitignore`
- prepare a package for publication to the npm registry

---

## Completion

**Course:** freeCodeCamp — Back End Development and APIs  
**Workshop:** Build a Case Converter  
**Progress:** 45 / 45 steps completed  
**Status:** Completed
