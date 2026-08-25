# Build a File Processor

A hands-on Node.js workshop from the freeCodeCamp **Back End Development and APIs** curriculum.

**Status:** Completed — **30/30 steps**

---

## Overview

This workshop introduces several important Node.js core APIs for working with:

- files and directories
- synchronous and asynchronous operations
- buffers and binary data
- text encodings
- cryptography
- operating system information
- file-system paths
- the current Node.js process
- readable and writable streams
- piping data between streams

The final program reads and writes files, generates hashes and random values, inspects the runtime environment, manipulates paths, and copies a file using Node.js streams.

---

## Project Structure

```text
build-a-file-processor/
│
├── README.md
├── server.js
│
└── assets/
    ├── poem.txt
    ├── output.txt
    └── stream-output.txt
```

### Files

- `server.js` — main workshop code
- `assets/poem.txt` — source text file used for reading and streams
- `assets/output.txt` — file created and updated with the `fs` module
- `assets/stream-output.txt` — output created through a writable stream and `pipe()`

---

# 1. Node.js File System Module

Node.js provides the built-in `fs` module for interacting with files and directories.

```js
const fs = require("fs");
```

No external package needs to be installed.

---

## Reading Files Synchronously

A file can be read synchronously with:

```js
const data = fs.readFileSync("assets/poem.txt");
```

Without an encoding option, Node.js returns a `Buffer`.

Example:

```text
<Buffer 43 6f 64 65 ...>
```

To read the file directly as text:

```js
const data = fs.readFileSync("assets/poem.txt", {
  encoding: "utf8",
});
```

### Key concept

Synchronous operations block further execution until the operation completes.

---

# 2. Reading Files Asynchronously

Node.js also supports asynchronous file operations.

## Callback API

```js
fs.readFile(
  "assets/poem.txt",
  { encoding: "utf8" },
  (err, data) => {
    console.log(data);
  }
);
```

The callback runs after the file operation finishes.

The common Node.js callback pattern is:

```js
(err, data) => {
  // handle result
}
```

---

## Promise API and `async` / `await`

Node.js also provides:

```js
const fsPromises = require("fs/promises");
```

Example:

```js
async function main() {
  const data = await fsPromises.readFile("assets/poem.txt", {
    encoding: "utf8",
  });

  console.log(data);
}

main();
```

This provides a cleaner asynchronous style than nested callbacks.

---

# 3. Writing Files

## `fs.writeFileSync()`

Creates a file or overwrites its existing content.

```js
fs.writeFileSync(
  "assets/output.txt",
  "Hello, freeCodeCamp!"
);
```

Result:

```text
Hello, freeCodeCamp!
```

---

## `fs.appendFileSync()`

Adds data to the end of a file without replacing the existing content.

```js
fs.appendFileSync(
  "assets/output.txt",
  "\nSecond line"
);
```

Result:

```text
Hello, freeCodeCamp!
Second line
```

---

# 4. Checking Files and Directories

## `fs.existsSync()`

Checks whether a path exists.

```js
const exists = fs.existsSync("assets/output.txt");

console.log(exists);
```

Example output:

```text
true
```

The return value is a Boolean.

---

## `fs.readdirSync()`

Reads the entries inside a directory.

```js
const entries = fs.readdirSync("assets");

console.log(entries);
```

Example:

```text
[
  'output.txt',
  'poem.txt',
  'stream-output.txt'
]
```

---

# 5. Buffer

A `Buffer` is Node.js's representation of raw binary data stored in memory.

A Buffer can be created from text:

```js
const buf = Buffer.from("Hello, Node!");

console.log(buf);
```

Example:

```text
<Buffer 48 65 6c 6c 6f 2c 20 4e 6f 64 65 21>
```

The values displayed are hexadecimal representations of bytes.

---

## Buffer to Hexadecimal

```js
console.log(buf.toString("hex"));
```

Output:

```text
48656c6c6f2c204e6f646521
```

---

## Buffer to Base64

```js
console.log(buf.toString("base64"));
```

Output:

```text
SGVsbG8sIE5vZGUh
```

Base64 is an encoding format, not encryption.

---

# 6. Allocating Buffers

A fixed-size Buffer can be created with:

```js
const buf2 = Buffer.alloc(8, 0xff);
```

This creates an 8-byte Buffer where every byte contains:

```text
0xff
```

Example:

```text
<Buffer ff ff ff ff ff ff ff ff>
```

`0xff` is hexadecimal for decimal `255`.

---

# 7. Base64 Decoding

A Base64 string can be decoded back into UTF-8 text:

```js
const decoded = Buffer
  .from("ZnJlZUNvZGVDYW1w", "base64")
  .toString("utf8");

console.log(decoded);
```

Output:

```text
freeCodeCamp
```

---

# 8. Crypto Module

Node.js includes the built-in `crypto` module.

```js
const crypto = require("crypto");
```

It provides cryptographic functions including:

- hashing
- secure random bytes
- UUID generation

---

## SHA-256 Hashing

```js
const hash = crypto
  .createHash("sha256")
  .update("freeCodeCamp!")
  .digest("hex");

console.log(hash);
```

Example output:

```text
a58ba4988d1062ed6d4f35b655b9e68df6395a5f17f8b531d7f38baaaa3153f5
```

SHA-256 produces a 256-bit hash.

When represented in hexadecimal, the result contains 64 hexadecimal characters.

A hash is designed to be one-way and is not the same as encryption.

---

# 9. Cryptographically Secure Random Bytes

```js
const random = crypto
  .randomBytes(16)
  .toString("hex");

console.log(random);
```

`16` random bytes become `32` hexadecimal characters.

The result is different every time the program runs.

---

# 10. UUID Generation

Node.js can generate a UUID version 4:

```js
const id = crypto.randomUUID();

console.log(id);
```

Example:

```text
855dec5b-748e-48ce-8bc7-24c359a6f17b
```

UUID stands for:

> Universally Unique Identifier

A UUID v4 commonly follows the structure:

```text
xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
```

---

# 11. Operating System Module

Node.js includes the built-in `os` module:

```js
const os = require("os");
```

It provides information about the operating system and runtime environment.

---

## Operating System Platform

```js
console.log(os.platform());
```

Example:

```text
linux
```

---

## CPU Architecture

```js
console.log(os.arch());
```

Example:

```text
x64
```

---

## Hostname

```js
console.log(os.hostname());
```

Example from GitHub Codespaces:

```text
codespaces-7673d6
```

---

## Total Memory

```js
console.log(os.totalmem());
```

Returns total system memory in bytes.

---

## Free Memory

```js
console.log(os.freemem());
```

Returns currently available memory in bytes.

---

## System Uptime

```js
console.log(os.uptime());
```

Returns how long the system has been running, in seconds.

---

## Logical CPU Cores

```js
console.log(os.cpus().length);
```

`os.cpus()` returns an array containing information about logical CPU cores.

The array length therefore represents the number of logical CPU cores visible to Node.js.

---

# 12. Path Module

Node.js includes the built-in `path` module for safely working with file-system paths.

```js
const path = require("path");
```

This is especially useful because path formats can differ between operating systems.

---

## `path.join()`

```js
const filePath = path.join(
  __dirname,
  "assets",
  "poem.txt"
);
```

`__dirname` contains the directory of the current JavaScript file.

The resulting path may look like:

```text
/workspaces/back-end-development-and-apis/build-a-file-processor/assets/poem.txt
```

---

# 13. Extracting Path Components

## File Name

```js
path.basename(filePath);
```

Result:

```text
poem.txt
```

## Directory Name

```js
path.dirname(filePath);
```

Result:

```text
.../build-a-file-processor/assets
```

## File Extension

```js
path.extname(filePath);
```

Result:

```text
.txt
```

The returned extension includes the period.

---

# 14. `path.join()` vs `path.resolve()`

Example:

```js
console.log(
  path.join("assets", "..", "server.js")
);
```

Result:

```text
server.js
```

Using:

```js
console.log(
  path.resolve("assets", "..", "server.js")
);
```

produces an absolute path, for example:

```text
/workspaces/back-end-development-and-apis/build-a-file-processor/server.js
```

### Difference

- `path.join()` joins and normalizes path segments.
- `path.resolve()` resolves path segments into an absolute path.

---

# 15. Parsing Paths

`path.parse()` breaks a path into its individual components.

```js
const parts = path.parse(filePath);

console.log(parts);
```

Example:

```js
{
  root: '/',
  dir: '/workspaces/.../assets',
  base: 'poem.txt',
  ext: '.txt',
  name: 'poem'
}
```

Properties:

| Property | Meaning |
|---|---|
| `root` | root of the file system |
| `dir` | directory containing the file |
| `base` | full file name |
| `ext` | file extension |
| `name` | file name without extension |

---

# 16. The Node.js `process` Object

`process` is a global Node.js object.

It does not require `require(...)`.

It contains information about the currently running Node.js process.

## Node.js Version

```js
console.log(process.version);
```

Example from this workshop:

```text
v24.18.0
```

## Platform

```js
console.log(process.platform);
```

Example:

```text
linux
```

## Environment Variables

Environment variables are available through:

```js
process.env
```

For example:

```js
console.log(process.env.NODE_ENV);
```

If `NODE_ENV` has not been defined, the result may be:

```text
undefined
```

---

# 17. Command-Line Arguments

Node.js exposes command-line arguments through:

```js
process.argv
```

Running:

```bash
node server.js
```

may produce:

```js
[
  '/usr/local/bin/node',
  '/path/to/server.js'
]
```

Running:

```bash
node server.js myArg
```

adds another array element:

```js
[
  '/usr/local/bin/node',
  '/path/to/server.js',
  'myArg'
]
```

The first user-provided argument begins at:

```js
process.argv[2]
```

---

# 18. Standard Output and Standard Error

Node.js exposes output streams through:

```js
process.stdout
process.stderr
```

## Standard Output

```js
process.stdout.write(
  "Hello from stdout\n"
);
```

Unlike `console.log()`, `.write()` does not automatically append a newline.

## Standard Error

```js
process.stderr.write(
  "Hello from stderr\n"
);
```

This writes directly to the process's standard error stream.

---

# 19. Streams

Streams allow Node.js to process data incrementally instead of loading everything into memory at once.

This is especially useful when working with:

- large files
- network data
- uploads
- downloads
- video or audio
- compressed data

---

# 20. Readable Streams

A readable file stream can be created with:

```js
const readable = fs.createReadStream(
  "assets/poem.txt",
  {
    encoding: "utf8",
  }
);
```

A readable stream emits events.

## `data` Event

```js
readable.on("data", (chunk) => {
  console.log(chunk);
});
```

Each piece of available data is provided as a `chunk`.

For a small file, the entire file may arrive in a single chunk.

## `end` Event

```js
readable.on("end", () => {
  console.log("Done reading");
});
```

The `end` event is emitted when all data has been read.

---

# 21. Writable Streams

A writable stream can be created with:

```js
const writable = fs.createWriteStream(
  "assets/stream-output.txt"
);
```

Data can be sent into the stream:

```js
writable.write("First chunk\n");
writable.write("Second chunk\n");
```

Writing can then be completed with:

```js
writable.end();
```

---

# 22. Piping Streams

The final workshop exercise connects a readable stream directly to a writable stream.

```js
const readable = fs.createReadStream(
  "assets/poem.txt"
);

const writable = fs.createWriteStream(
  "assets/stream-output.txt"
);

readable.pipe(writable);
```

Conceptually:

```text
poem.txt
   │
   ▼
Readable Stream
   │
   │ pipe()
   ▼
Writable Stream
   │
   ▼
stream-output.txt
```

`pipe()` automatically transfers chunks from the readable stream to the writable stream.

This avoids manually handling each `data` event and calling `.write()` for every chunk.

---

# 23. Final Output File

After running:

```bash
node server.js
```

`assets/stream-output.txt` contains:

```text
Code in the browser,
Building projects, one by one,
Free for everyone.
```

This content was copied from `assets/poem.txt` using:

```js
readable.pipe(writable);
```

---

# Important Concepts Learned

## Synchronous vs Asynchronous Operations

Synchronous:

```text
start
  ↓
wait until operation finishes
  ↓
continue
```

Asynchronous:

```text
start operation
  ↓
continue other work
  ↓
operation finishes later
  ↓
callback / Promise / event handles result
```

---

## Buffer vs String

A string represents text.

A Buffer represents raw bytes.

Example:

```text
String
"Hello"

      ↓ Buffer.from()

Buffer
48 65 6c 6c 6f
```

---

## Encoding vs Encryption

Hexadecimal and Base64 are encoding formats.

They change how data is represented.

They do not protect the data cryptographically.

SHA-256 is a cryptographic hash function, not an encoding format.

---

## File Reading vs Streams

Traditional file reading can load an entire file into memory.

Streams allow data to be processed in chunks.

```text
Traditional reading

File
 ↓
Entire file in memory
 ↓
Application
```

Compared with streams:

```text
File
 ↓
Chunk
 ↓
Chunk
 ↓
Chunk
 ↓
Application
```

This makes streams especially important for backend systems handling large amounts of data.

---

# Running the Workshop Locally

Navigate to the workshop directory:

```powershell
cd "workshops\build-a-file-processor"
```

Run:

```powershell
node server.js
```

The program will:

1. create or overwrite `assets/output.txt`
2. append a second line
3. inspect files in `assets`
4. demonstrate Buffer encodings
5. decode Base64
6. create a SHA-256 hash
7. generate secure random bytes
8. generate a UUID
9. inspect operating-system information
10. manipulate file paths
11. inspect the Node.js process
12. write to stdout and stderr
13. pipe `poem.txt` into `stream-output.txt`

---

# Example Output

The exact random values, UUID, memory information, uptime, hostname, Node.js version, and paths can differ between systems.

```text
true
[ 'output.txt', 'poem.txt', 'stream-output.txt' ]
<Buffer 48 65 6c 6c 6f 2c 20 4e 6f 64 65 21>
48656c6c6f2c204e6f646521
SGVsbG8sIE5vZGUh
<Buffer ff ff ff ff ff ff ff ff>
freeCodeCamp
a58ba4988d1062ed6d4f35b655b9e68df6395a5f17f8b531d7f38baaaa3153f5
[random hexadecimal value]
[random UUID]
linux
x64
[hostname]
[total memory]
[free memory]
[uptime]
[logical CPU count]
[path to poem.txt]
poem.txt
[path to assets directory]
.txt
server.js
[absolute path to server.js]
{
  root: '/',
  dir: '...',
  base: 'poem.txt',
  ext: '.txt',
  name: 'poem'
}
[Node.js version]
linux
undefined
[
  '[path to node]',
  '[path to server.js]'
]
Hello from stdout
Hello from stderr
```

---

# Key Takeaways

After completing this workshop, I understand how to:

- use built-in Node.js modules with CommonJS `require()`
- read and write files
- compare synchronous and asynchronous file operations
- use callbacks and Promise-based APIs
- work with raw binary data through `Buffer`
- convert data between UTF-8, hexadecimal, and Base64
- create cryptographic hashes
- generate cryptographically secure random data
- generate UUIDs
- inspect operating-system information
- safely build and inspect file-system paths
- access Node.js process information
- read command-line arguments
- work directly with stdout and stderr
- create readable streams
- create writable streams
- process data in chunks
- pipe data directly between streams

---

# Completion

**Course:** freeCodeCamp — Back End Development and APIs  
**Workshop:** Build a File Processor  
**Progress:** 30 / 30 steps completed  
**Status:** Completed
