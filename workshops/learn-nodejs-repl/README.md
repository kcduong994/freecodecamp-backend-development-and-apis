# Learn Node.js REPL

![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Workshop](https://img.shields.io/badge/Type-Workshop-blue)
![freeCodeCamp](https://img.shields.io/badge/freeCodeCamp-Back--End%20Development%20and%20APIs-darkblue)

## Overview

**Learn Node.js REPL** is the first hands-on workshop in the freeCodeCamp **Back-End Development and APIs Certification**.

The workshop introduces the Node.js command-line interface and the Node.js REPL by running JavaScript directly from the terminal, executing JavaScript files, checking syntax, working interactively with variables and functions, and loading built-in Node.js modules.

**Status:** Completed  
**Completion date:** August 19, 2026  
**Workshop progress:** 23/23 steps completed  
**Assessment result:** Passed

---

## Project Location

```text
workshops/
└── learn-nodejs-repl/
    ├── hello.js
    └── README.md
```

The workshop itself is mainly terminal-based, so only one JavaScript source file is required.

---

## Learning Objectives

After completing this workshop, I can:

- Check installed Node.js and npm versions.
- Run JavaScript directly from the command line.
- Understand common Node.js CLI flags.
- Execute a JavaScript file using Node.js.
- Check JavaScript syntax without executing the file.
- Start and use the Node.js REPL.
- Work with variables and functions inside a REPL session.
- Reuse the result of the previous REPL expression.
- Load Node.js built-in modules.
- Call methods from loaded modules.
- Use REPL dot commands such as `.help` and `.exit`.
- Recognize the difference between CommonJS and ES modules at an introductory level.

---

## Key Terms

| Term | Pronunciation | Meaning |
|---|---|---|
| **REPL** | /riːd ɪˈvæl prɪnt luːp/ | Read-Eval-Print Loop |
| **runtime** | /ˈrʌn.taɪm/ | Môi trường thực thi chương trình |
| **command-line interface (CLI)** | /kəˈmɑːnd laɪn ˈɪn.tə.feɪs/ | Giao diện dòng lệnh |
| **flag** | /flæɡ/ | Tùy chọn điều khiển hành vi của command |
| **evaluate** | /ɪˈvæl.ju.eɪt/ | Đánh giá hoặc thực thi một biểu thức |
| **syntax** | /ˈsɪn.tæks/ | Cú pháp |
| **module** | /ˈmɒd.juːl/ | Mô-đun chứa code/chức năng có thể tái sử dụng |
| **session** | /ˈseʃ.ən/ | Một phiên làm việc |
| **expression** | /ɪkˈspreʃ.ən/ | Biểu thức tạo ra một giá trị |

---

# 1. Checking Node.js and npm

Node.js and npm versions can be checked directly from the terminal.

## Node.js version

```bash
node -v
```

Example output:

```text
v24.18.0
```

The long form is:

```bash
node --version
```

## npm version

```bash
npm -v
```

Example output:

```text
11.16.0
```

`npm` is the package manager commonly used in the Node.js ecosystem.

---

# 2. Node.js CLI Flags

A **flag** is a command-line option that changes how a program behaves.

For example:

```text
node -v
```

can be understood as:

```text
node    -> command
-v      -> flag
```

Another example:

```text
node -e "console.log('Hello, Node')"
```

contains:

```text
node                         -> command
-e                           -> flag
"console.log('Hello, Node')" -> argument
```

---

# 3. Running JavaScript with `-e`

The `-e` or `--eval` flag evaluates JavaScript supplied directly from the command line.

```bash
node -e "console.log('Hello, Node')"
```

Output:

```text
Hello, Node
```

Another example:

```bash
node -e "console.log(2 + 2)"
```

Output:

```text
4
```

`-e` executes the JavaScript expression but does not automatically print its resulting value.

Therefore:

```bash
node -e "2 + 2"
```

does not normally print:

```text
4
```

To explicitly display the value, `console.log()` can be used.

---

# 4. Evaluating and Printing with `-p`

The `-p` or `--print` flag evaluates an expression and automatically prints its result.

```bash
node -p "2 + 2"
```

Output:

```text
4
```

This means:

```text
node -e
= evaluate

node -p
= evaluate + print
```

Example using JavaScript's built-in `Math` object:

```bash
node -p "Math.PI.toFixed(4)"
```

Output:

```text
3.1416
```

Another example:

```bash
node -p "Math.sqrt(25)"
```

Output:

```text
5
```

---

# 5. Creating a JavaScript File

The workshop creates a small JavaScript file named `hello.js`.

## Source Code

```js
console.log("Hello from a file");
```

The same file can be created from a Bash shell with:

```bash
echo "console.log('Hello from a file')" > hello.js
```

The `>` operator redirects the output of `echo` into the file.

---

# 6. Checking JavaScript Syntax

Node.js can check the syntax of a JavaScript file without executing it.

```bash
node --check hello.js
```

The short form is:

```bash
node -c hello.js
```

If the syntax is valid, the command normally exits without displaying output.

Example:

```text
$ node --check hello.js
$
```

This is a successful result.

If the file contains invalid JavaScript syntax, Node.js reports a `SyntaxError`.

### Important Difference

```text
node --check hello.js
```

means:

```text
Parse the JavaScript
Check its syntax
Do not execute the program
```

while:

```text
node hello.js
```

means:

```text
Parse the JavaScript
Execute the program
Produce runtime output
```

---

# 7. Running a JavaScript File

Run `hello.js` with:

```bash
node hello.js
```

Output:

```text
Hello from a file
```

This is one of the fundamental ways Node.js executes JavaScript outside a web browser.

---

# 8. Starting the Node.js REPL

Run Node.js without a file or additional arguments:

```bash
node
```

The terminal enters the Node.js REPL and shows a prompt:

```text
>
```

The REPL stands for:

```text
Read
↓
Eval
↓
Print
↓
Loop
```

The process repeats for each expression entered.

---

# 9. Evaluating Expressions in the REPL

Inside the REPL:

```js
> 2 ** 8
256
```

The `**` operator performs exponentiation.

```text
2 ** 8
= 2⁸
= 256
```

Unlike a normal JavaScript file, the REPL automatically displays the value of an evaluated expression.

No `console.log()` is necessary.

---

# 10. Variables in the REPL

Variables declared inside a REPL session remain available for the duration of that session.

```js
> let city = "Paris"
undefined
```

The declaration returns:

```text
undefined
```

but the variable was created successfully.

It can then be accessed:

```js
> city
'Paris'
```

The important idea is:

```text
Start REPL session
↓
Declare variable
↓
Variable remains in memory
↓
Use the variable in later expressions
```

After leaving the REPL and starting a new session, the variable is no longer available.

---

# 11. The Special `_` Variable

The Node.js REPL provides the special `_` variable.

It contains the result of the most recently evaluated expression.

Example:

```js
> 10 * 10
100

> _ + 5
105
```

Here:

```text
_ = 100
```

so:

```text
_ + 5
= 100 + 5
= 105
```

This is useful when experimenting interactively without retyping the previous result.

---

# 12. Functions in the REPL

Functions can also be declared and reused during a REPL session.

```js
> function double(n) { return n * 2; }
undefined
```

The function declaration itself produces:

```text
undefined
```

but the function remains available.

It can then be called:

```js
> double(21)
42
```

This demonstrates that the REPL maintains state during the current session.

---

# 13. Node.js Built-in Modules

Node.js includes built-in modules that do not need to be installed with npm.

One example is the `os` module.

```js
> const os = require("os")
undefined
```

The module can then be used:

```js
> os.platform()
'linux'
```

`os.platform()` reports the operating-system platform on which Node.js is currently running.

In the freeCodeCamp Codespace, the result was:

```text
linux
```

---

# 14. CommonJS

The workshop introduces the CommonJS module style through `require()`.

```js
const os = require("os");
```

`require()` loads a module and returns its exported functionality.

Conceptually:

```text
require("os")
↓
Load Node.js built-in os module
↓
Return module object
↓
Assign it to variable os
```

CommonJS is one of the module systems supported by Node.js.

---

# 15. ES Modules

Node.js also supports **ES Modules (ESM)** using modern `import` and `export` syntax.

Example:

```js
import { createRequire } from "module";
```

The workshop also executes ESM code directly from the terminal:

```bash
echo "import { createRequire } from 'module'; console.log(typeof createRequire);" | node --input-type=module
```

Output:

```text
function
```

The pipe operator:

```text
|
```

passes the output of the command on the left into the command on the right.

Conceptually:

```text
echo JavaScript source
        ↓
        |
        ↓
node --input-type=module
        ↓
Node interprets the input as an ES module
        ↓
Execute
        ↓
function
```

---

# 16. REPL Dot Commands

The Node.js REPL contains special commands beginning with a dot (`.`).

## Help

```text
.help
```

This displays available REPL commands.

Examples include:

```text
.help
.load
.save
.exit
```

## Exit

```text
.exit
```

closes the current REPL session and returns to the regular shell.

The same result can also be achieved with:

```text
Ctrl + D
```

---

# 17. `console.log()` and REPL Output

Inside normal JavaScript code:

```js
console.log("Hello");
```

explicitly writes output to the console.

Comparable operations in other languages include:

```python
print("Hello")
```

in Python and:

```csharp
Console.WriteLine("Hello");
```

in C#.

However, the Node.js REPL automatically prints the result of an expression:

```js
> 2 + 3
5
```

Therefore:

```text
console.log()
= explicit program output

REPL automatic output
= result of the evaluated expression
```

These mechanisms are related but not identical.

---

# 18. REPL State

The REPL is stateful during one session.

For example:

```js
> const value = 10
undefined

> value * 2
20
```

The second expression can use `value` because the same REPL process is still running.

After:

```text
.exit
```

and starting Node again:

```bash
node
```

the previous REPL state is gone.

---

# Command Summary

| Command | Purpose |
|---|---|
| `node -v` | Print Node.js version |
| `npm -v` | Print npm version |
| `node -e "..."` | Evaluate JavaScript |
| `node -p "..."` | Evaluate JavaScript and print the result |
| `node --check file.js` | Check JavaScript syntax without executing |
| `node file.js` | Execute a JavaScript file |
| `node` | Start the Node.js REPL |
| `.help` | Show REPL commands |
| `.exit` | Exit the REPL |
| `require("module")` | Load a CommonJS module |
| `node --input-type=module` | Treat command-line input as an ES module |

---

# Source Code Walkthrough

The only permanent JavaScript source file created by this workshop is:

```text
hello.js
```

Contents:

```js
console.log("Hello from a file");
```

Its purpose is deliberately simple.

The workshop is focused on learning how the **Node.js runtime and command-line interface work**, rather than building a full application.

The file is used to demonstrate two distinct Node.js operations.

### Syntax validation

```bash
node --check hello.js
```

### Program execution

```bash
node hello.js
```

Expected output:

```text
Hello from a file
```

---

# Concepts Introduced

This workshop introduces:

- Node.js as a JavaScript runtime outside the browser.
- The Node.js CLI.
- CLI flags and arguments.
- JavaScript execution from the command line.
- JavaScript file execution.
- Syntax checking.
- The Node.js REPL.
- Stateful interactive sessions.
- Variables and functions in the REPL.
- The `_` previous-result variable.
- Node.js built-in modules.
- `require()`.
- CommonJS.
- ES modules.
- REPL dot commands.

---

# Knowledge Introduced but Deferred

Several concepts appear in this workshop only at an introductory level and will be studied more deeply later in the curriculum:

- npm and package management
- Node.js core modules
- CommonJS module architecture
- ES module architecture
- package configuration
- dependency management
- module resolution
- asynchronous Node.js APIs
- event-driven architecture
- HTTP servers
- REST APIs

The purpose of this workshop is to become comfortable interacting with the Node.js runtime before moving into those topics.

---

# Workshop Verification

The following workshop requirements were verified successfully:

```text
freeCodeCamp workshop: Learn Node.js REPL
Progress: 23 / 23
Workshop assessment: Passed
Node.js REPL usage: Verified
JavaScript file execution: Verified
Syntax check: Verified
Built-in module usage: Verified
CommonJS example: Verified
ES module CLI example: Verified
```

The workshop was completed using the official freeCodeCamp GitHub Codespaces environment.

---

# Key Takeaway

The most important idea from this workshop is that Node.js is not only a way to run backend applications.

It is a **JavaScript runtime** that can execute JavaScript:

```text
from a file
from the command line
inside an interactive REPL
```

The REPL is especially useful for quickly experimenting with JavaScript expressions, Node.js APIs, variables, functions, and modules without creating a complete program first.

---

## Completion

**Learn Node.js REPL — Completed ✅**

```text
23 / 23 steps passed
```