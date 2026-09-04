# Build a Prime Number Checker Module

A certification project from the freeCodeCamp **Back End Development and APIs** curriculum.

**Status:** Completed — **1/1 certification project passed**

---

## Overview

This project builds a reusable **Prime Number Checker** as an npm module.

The goal is to apply the Node.js and npm concepts learned in the earlier workshops to a small certification project created from scratch.

The module exposes one function:

```js
isPrime(number)
```

The function returns `true` when the provided value is a prime number and `false` otherwise.

This project demonstrates:

- npm package creation
- `package.json`
- package metadata
- CommonJS
- `module.exports`
- named exports
- function design
- prime-number logic
- integer validation
- modulo arithmetic
- square-root optimization
- local module verification
- freeCodeCamp certification-project testing

---

## Project Structure

```text
build-a-prime-number-checker-module/
├── index.js
├── package.json
└── README.md
```

### Files

- `index.js` — contains the `isPrime` implementation and CommonJS export
- `package.json` — defines the npm package metadata
- `README.md` — documents the project, algorithm, and verification

---

## Certification Requirements

The freeCodeCamp project required:

```text
1. The project must contain an index.js file.

2. The project directory must be an npm package.

3. package.json must contain:
   - name
   - version
   - description
   - keywords
   - license
   - author
   - type

4. keywords must be an array.

5. type must be:
   "commonjs"

6. index.js must define a function named isPrime.

7. isPrime must be a named export using module.exports.

8. Calling isPrime with a prime number must return true.

9. Calling isPrime with a non-prime number must return false.
```

All project tests passed in the official freeCodeCamp environment.

---

## npm Package Metadata

The project uses:

```json
{
  "name": "prime-checker",
  "version": "1.0.0",
  "description": "A prime number checker module.",
  "keywords": [
    "prime",
    "number",
    "checker"
  ],
  "license": "MIT",
  "author": "Duong Kim Cuong",
  "type": "commonjs",
  "main": "index.js"
}
```

Important fields:

| Field | Purpose |
|---|---|
| `name` | npm package name |
| `version` | package version |
| `description` | short package description |
| `keywords` | searchable package keywords |
| `license` | software license |
| `author` | package author |
| `type` | module system |
| `main` | package entry point |

The package uses:

```json
"type": "commonjs"
```

so the module uses CommonJS syntax:

```js
require()
module.exports
```

---

## What Is a Prime Number?

A **prime number** is a whole number greater than `1` with exactly two positive divisors:

```text
1
and
itself
```

Examples:

```text
2, 3, 5, 7, 11, 13, 17, 19
```

Non-prime examples:

```text
0, 1, 4, 6, 8, 9, 10, 12
```

For example, `7` has only `1` and `7` as positive divisors, so it is prime.

`9` has `1`, `3`, and `9` as divisors, so it is not prime.

---

## Final `index.js`

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

---

## Implementation Breakdown

### 1. Validate the Input

```js
if (!Number.isInteger(number) || number <= 1) {
  return false;
}
```

A prime number must be:

```text
an integer
AND
greater than 1
```

Therefore values such as:

```text
-7
0
1
2.5
```

must return `false`.

`Number.isInteger(number)` checks whether the value is an integer.

---

### 2. Search for Divisors

```js
for (let i = 2; i <= Math.sqrt(number); i++) {
  if (number % i === 0) {
    return false;
  }
}
```

The loop checks possible divisors starting at `2`.

If:

```js
number % i === 0
```

then the number is divisible by `i`, so it is not prime.

---

### 3. The Modulo Operator

The modulo operator:

```js
%
```

returns the remainder after division.

Example:

```js
9 % 3
```

returns:

```text
0
```

Therefore:

```js
number % i === 0
```

means that `number` is exactly divisible by `i`.

---

### 4. Why Check Only to `Math.sqrt(number)`?

A naive solution could test every divisor from `2` through `number - 1`.

That is unnecessary.

Factors occur in pairs. For example:

```text
36

1 × 36
2 × 18
3 × 12
4 × 9
6 × 6
```

Once the search reaches:

```text
√36 = 6
```

any new larger factor would already have a corresponding smaller factor that was checked earlier.

Therefore, if no divisor exists from `2` through `√number`, the number is prime.

---

## Algorithm Flow

```text
Input number
     ↓
Is it an integer?
     ├── No → false
     └── Yes
           ↓
Is number <= 1?
     ├── Yes → false
     └── No
           ↓
Check divisors from 2 to √number
           ↓
Does number % divisor === 0?
     ├── Yes → false
     └── No divisor found
           ↓
          true
```

---

## Example: `isPrime(9)`

```text
√9 = 3

i = 2
9 % 2 = 1
not divisible

i = 3
9 % 3 = 0
divisible
```

Result:

```text
false
```

---

## Example: `isPrime(11)`

```text
√11 ≈ 3.316

i = 2
11 % 2 = 1

i = 3
11 % 3 = 2
```

No divisor is found.

Result:

```text
true
```

---

## CommonJS Export

The function is exported as:

```js
module.exports = {
  isPrime,
};
```

It can be imported with:

```js
const { isPrime } = require("./index");
```

Conceptually:

```text
index.js
   ↓
isPrime
   ↓
module.exports
   ↓
require("./index")
   ↓
another Node.js file
```

---

## Local Verification

The completed project was also checked locally with Node.js.

Command:

```powershell
node -e "const { isPrime } = require('./index'); console.log(isPrime(2), isPrime(11), isPrime(9), isPrime(1))"
```

Expected output:

```text
true true false false
```

This verifies:

```text
2  → prime
11 → prime
9  → non-prime
1  → non-prime
```

Additional checks:

```powershell
node -e "const { isPrime } = require('./index'); console.log(isPrime(97), isPrime(100), isPrime(0), isPrime(-7))"
```

Expected:

```text
true false false false
```

---

## Example Usage

```js
const { isPrime } = require("./index");

console.log(isPrime(2));
// true

console.log(isPrime(11));
// true

console.log(isPrime(9));
// false

console.log(isPrime(1));
// false
```

---

## Edge Cases

### Values less than or equal to 1

```js
isPrime(1);   // false
isPrime(0);   // false
isPrime(-5);  // false
```

### Non-integer values

```js
isPrime(2.5);
// false
```

Prime numbers are integers, so decimal values are rejected.

### The number 2

```js
isPrime(2);
// true
```

The divisor loop does not run because the initial divisor `2` is already greater than `√2`.

No rejection condition is triggered, so the function correctly returns `true`.

---

## Complexity

The algorithm checks possible divisors only up to `√n`.

Time complexity:

```text
O(√n)
```

Space complexity:

```text
O(1)
```

The algorithm uses only a fixed amount of additional memory.

---

## Relationship to Previous Workshops

### Workshop 01 — Learn Node.js REPL

Introduced:

```text
Node.js runtime
CLI
REPL
require()
CommonJS
```

### Workshop 02 — Build a File Processor

Introduced:

```text
Node.js core modules
file-system APIs
Buffer
crypto
os
path
process
streams
```

### Workshop 03 — Build a Case Converter

Introduced:

```text
npm init
package.json
CommonJS exports
module.exports
require()
assertions
npm package structure
publication preparation
```

### Certification Project 01 — Build a Prime Number Checker Module

Applies those concepts independently:

```text
npm package
        ↓
custom algorithm
        ↓
CommonJS export
        ↓
certification tests
```

This is the first project in the repository where the implementation is driven by user stories rather than step-by-step workshop instructions.

---

## Why This Project Matters

Although the project is small, it combines:

```text
JavaScript function logic
+
npm package structure
+
package.json metadata
+
CommonJS exports
+
algorithmic reasoning
+
automated certification tests
```

It demonstrates the transition from guided exercises to requirement-based implementation.

---

## Certification Verification

The project was completed in the official freeCodeCamp GitHub Codespaces environment.

Final result:

```text
Build a Prime Number Checker Module
1 / 1
✅ Completed
```

The project was also verified locally after copying the completed source into this repository.

---

## Key Concepts Learned

After completing this certification project, I can:

- create a simple npm module from scratch
- configure required `package.json` metadata
- use CommonJS with `"type": "commonjs"`
- export a named function with `module.exports`
- import a named CommonJS export with destructuring
- validate input with `Number.isInteger()`
- reject values less than or equal to `1`
- use modulo arithmetic to test divisibility
- use `Math.sqrt()` to reduce unnecessary divisor checks
- implement a prime-number checker in `O(√n)` time
- verify a module from the Node.js command line
- translate user stories into working implementation
- satisfy automated freeCodeCamp certification tests

---

## Completion

**Course:** freeCodeCamp — Back End Development and APIs  
**Type:** Certification Project  
**Project:** Build a Prime Number Checker Module  
**Result:** 1 / 1  
**Status:** ✅ Completed
