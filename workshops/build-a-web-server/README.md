# Build a Web Server

A hands-on Node.js workshop from the freeCodeCamp **Back End Development and APIs** curriculum.

**Status:** Completed — **60/60 steps**

---

## Overview

This workshop builds a small HTTP web server from scratch using Node.js core modules only.

The server:

- listens on port `3001`
- receives HTTP requests
- maps request URLs to files in `public/`
- serves HTML, CSS, JavaScript, and PNG files
- returns a custom `404.html` page for missing resources
- sends appropriate HTTP status codes
- sends appropriate `Content-Type` headers
- uses ESM `import` syntax
- is load-tested with `wrk`

The workshop demonstrates the lower-level mechanisms that higher-level frameworks such as Express later abstract away.

---

## Project Structure

```text
build-a-web-server/
│
├── public/
│   ├── 404.html
│   ├── about.html
│   ├── forrest1.png
│   ├── forrest2.png
│   ├── forrest3.png
│   ├── index.html
│   ├── products.html
│   └── style.css
│
├── package.json
├── README.md
└── server.js
```

### Files

- `server.js` — Node.js HTTP server
- `package.json` — enables ECMAScript Modules with `"type": "module"`
- `public/index.html` — home page
- `public/products.html` — products page
- `public/about.html` — about page
- `public/404.html` — custom not-found page
- `public/style.css` — page styling
- `public/forrest1.png`, `forrest2.png`, `forrest3.png` — static images

---

## 1. Creating an HTTP Server

The workshop starts with Node.js's built-in `http` module.

```js
import http from "http";
```

A server is created with:

```js
const server = http.createServer((request, response) => {
  // handle each incoming request
});
```

The callback receives two core objects:

```text
request
→ information sent by the client

response
→ object used by the server to send data back
```

The server listens on port `3001`:

```js
server.listen(3001);
```

---

## 2. Client and Server

During the workshop, `curl` is used as an HTTP client:

```bash
curl http://localhost:3001
```

Conceptually:

```text
curl / browser
      │
      │ HTTP request
      ▼
Node.js server
      │
      │ HTTP response
      ▼
curl / browser
```

The Node.js process remains running while the server listens for connections.

---

## 3. Inspecting Requests

The Node.js `request` object exposes request metadata.

The workshop initially inspects:

```js
request.headers
request.url
```

Examples:

```text
GET /
→ request.url === "/"

GET /about.html
→ request.url === "/about.html"
```

Request headers may contain values such as:

```text
host
user-agent
accept
accept-language
```

The temporary request-level `console.log()` calls are removed before the final performance test.

---

## 4. Ending a Response

A request must eventually receive a completed response.

```js
response.end(data, "utf-8");
```

Without `response.end()`, a client such as `curl` can remain waiting because the server has not finished the response.

The workshop first sends the requested URL back to the client before moving on to serving real files.

---

## 5. Mapping `/` to `index.html`

The root route is mapped to the home page:

```js
const url = request.url === "/" ? "/index.html" : request.url;
```

Examples:

```text
request.url = "/"
→ url = "/index.html"

request.url = "/products.html"
→ url = "/products.html"
```

This uses the JavaScript ternary operator:

```js
condition ? valueIfTrue : valueIfFalse;
```

---

## 6. Building File Paths

Static files are stored inside `public/`.

The server uses Node.js's `path` module:

```js
import { join, extname } from "path";
```

The requested file path is created with:

```js
const filePath = join("public", url);
```

Example:

```text
/index.html
    ↓
join("public", url)
    ↓
public/index.html
```

Using `path.join()` is preferable to manually concatenating path strings.

---

## 7. Reading Files with `fs.readFile()`

The server uses Node.js's built-in `fs` module:

```js
import { readFile } from "fs";
```

Files are read asynchronously:

```js
readFile(filePath, (error, file) => {
  // handle result
});
```

The callback receives:

```text
error
→ contains an error if reading fails

file
→ contains the file data if reading succeeds
```

Execution flow:

```text
HTTP request
    ↓
build filePath
    ↓
readFile(filePath)
    ↓
filesystem
    ↓
callback(error, file)
```

---

## 8. Error Handling

If a requested file does not exist, `readFile()` returns an error.

A common missing-file error is:

```text
ENOENT
```

The workshop also demonstrates why an `Error` object itself cannot be sent directly as response data:

```js
response.end(error, "utf-8");
```

`response.end()` expects data such as a string, `Buffer`, or `Uint8Array`. The workshop therefore temporarily uses:

```js
response.end(error.message, "utf-8");
```

before replacing the raw error message with a custom 404 page.

---

## 9. Avoiding Multiple `response.end()` Calls

After sending an error response, execution should stop:

```js
if (error) {
  response.end(error.message, "utf-8");
  return;
}

response.end(file, "utf-8");
```

The `return` prevents the success branch from attempting to end the same response again.

---

## 10. Custom 404 Page

Instead of exposing a raw filesystem error, the final server reads:

```text
public/404.html
```

when the requested resource does not exist.

```js
if (error) {
  console.error(error);

  readFile("public/404.html", (error, file) => {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(file, "utf-8");
  });

  return;
}
```

This gives the client a user-friendly not-found page.

---

## 11. HTTP Status Codes

The workshop uses:

```text
200 OK
```

for successful responses and:

```text
404 Not Found
```

for missing resources.

They are sent using:

```js
response.writeHead(200);
response.writeHead(404);
```

Headers are later added as the second argument.

---

## 12. MIME Types

The server maps file extensions to media types:

```js
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".js": "text/javascript",
};
```

`MIME` stands for **Multipurpose Internet Mail Extensions**.

These mappings tell the client how to interpret the returned data.

---

## 13. File Extensions

The extension is extracted with:

```js
const ext = extname(filePath).toLowerCase();
```

Examples:

```text
public/index.html
→ .html

public/style.css
→ .css

public/forrest1.png
→ .png
```

`.toLowerCase()` normalizes extensions such as:

```text
.PNG
→ .png
```

---

## 14. Determining `Content-Type`

The extension is used as a key in `mimeTypes`:

```js
const contentType = mimeTypes[ext] || "application/octet-stream";
```

Examples:

```text
.html → text/html
.css  → text/css
.png  → image/png
.js   → text/javascript
```

If there is no known mapping, the server falls back to:

```text
application/octet-stream
```

which is a generic binary media type.

---

## 15. Sending Response Headers

A successful response uses:

```js
response.writeHead(200, { "Content-Type": contentType });
```

A missing resource uses:

```js
response.writeHead(404, { "Content-Type": "text/html" });
```

A valid HTML request therefore produces a response similar to:

```text
HTTP/1.1 200 OK
Content-Type: text/html
```

while a missing resource produces:

```text
HTTP/1.1 404 Not Found
Content-Type: text/html
```

---

## 16. Inspecting HTTP Responses with `curl`

The verbose flag displays HTTP protocol details:

```bash
curl -v http://localhost:3001
```

For an invalid path:

```bash
curl -v http://localhost:3001/not-found
```

Expected status line:

```text
< HTTP/1.1 404 Not Found
```

This makes `curl` useful for testing status codes, headers, and response bodies without a browser.

---

## 17. CommonJS and ESM

The workshop starts with CommonJS:

```js
const http = require("http");
const { join } = require("path");
const { readFile } = require("fs");
```

It is later converted to ESM:

```js
import http from "http";
import { join, extname } from "path";
import { readFile } from "fs";
```

The basic distinction is:

```text
CommonJS
require()
module.exports

ESM
import
export
```

---

## 18. Enabling ESM in Node.js

After converting to `import`, Node.js initially warns that the file is not being loaded as an ES module.

The workshop fixes this by adding:

```json
{
  "type": "module"
}
```

to `package.json`.

This tells Node.js to interpret `.js` files in this project as ECMAScript Modules.

---

## 19. Final `server.js`

```js
import http from "http";
import { join, extname } from "path";
import { readFile } from "fs";

const server = http.createServer((request, response) => {
  const url = request.url === "/" ? "/index.html" : request.url;
  const filePath = join("public", url);
  const ext = extname(filePath).toLowerCase();

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".png": "image/png",
    ".js": "text/javascript",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  readFile(filePath, (error, file) => {
    if (error) {
      console.error(error);

      readFile("public/404.html", (error, file) => {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(file, "utf-8");
      });

      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(file, "utf-8");
  });
});

server.listen(3001);
```

---

## 20. Final `package.json`

```json
{
  "type": "module"
}
```

The key setting is:

```json
"type": "module"
```

which enables ESM syntax in `server.js`.

---

## 21. Running the Server Locally

Navigate to the workshop directory:

```powershell
cd "workshops\build-a-web-server"
```

Start the server:

```powershell
node server.js
```

The server listens on:

```text
http://localhost:3001
```

Keep that terminal running while testing from another terminal or browser.

---

## 22. Manual Tests

Home page:

```powershell
curl http://localhost:3001
```

About page:

```powershell
curl http://localhost:3001/about.html
```

Products page:

```powershell
curl http://localhost:3001/products.html
```

CSS response header:

```powershell
curl -v http://localhost:3001/style.css
```

Expected:

```text
Content-Type: text/css
```

PNG response header:

```powershell
curl -v http://localhost:3001/forrest1.png
```

Expected:

```text
Content-Type: image/png
```

Invalid path:

```powershell
curl -v http://localhost:3001/not-found
```

Expected:

```text
HTTP/1.1 404 Not Found
Content-Type: text/html
```

The response body should contain the custom `404.html` page.

---

## 23. Load Testing with `wrk`

The workshop installs `wrk`:

```bash
sudo apt install -y wrk
```

The server is tested with:

```bash
wrk -t2 -c5 -d5s http://localhost:3001
```

Options:

```text
-t2  → 2 worker threads
-c5  → 5 concurrent connections
-d5s → run for 5 seconds
```

`wrk` reports metrics such as:

```text
latency
requests per second
transfer per second
```

The same load test is run before and after removing unnecessary request-level `console.log()` calls so the effect on throughput can be observed.

---

## 24. Node.js Core Modules Used

### `http`

```js
import http from "http";
```

Important APIs:

```text
http.createServer()
server.listen()
response.writeHead()
response.end()
```

### `fs`

```js
import { readFile } from "fs";
```

Important API:

```text
readFile()
```

### `path`

```js
import { join, extname } from "path";
```

Important APIs:

```text
join()
extname()
```

No third-party web framework is required.

---

## 25. Request-Response Flow

A successful request:

```text
Client
  │
  │ GET /about.html
  ▼
Node HTTP server
  │
  ▼
request.url
  │
  ▼
public/about.html
  │
  │ readFile()
  ▼
file data
  │
  │ 200 + Content-Type
  ▼
response.end(file)
  │
  ▼
Client
```

A missing resource:

```text
Client
  │
  │ GET /missing
  ▼
Node HTTP server
  │
  ▼
public/missing
  │
  │ readFile()
  ▼
ENOENT
  │
  ▼
public/404.html
  │
  │ 404 + text/html
  ▼
response.end(file)
  │
  ▼
Client
```

---

## Workshop Development Progression

```text
create server.js
        ↓
create HTTP server
        ↓
listen on port 3001
        ↓
inspect request headers and URL
        ↓
send a basic response
        ↓
map / to index.html
        ↓
build public file paths
        ↓
read files with fs.readFile()
        ↓
handle filesystem errors
        ↓
serve a custom 404 page
        ↓
send 200 / 404 status codes
        ↓
map extensions to MIME types
        ↓
send Content-Type headers
        ↓
normalize file extensions
        ↓
convert CommonJS to ESM
        ↓
enable ESM in package.json
        ↓
load test with wrk
        ↓
remove unnecessary request logging
        ↓
60/60 completed
```

---

## Key Takeaways

After completing this workshop, I understand how to:

- create an HTTP server with Node.js
- listen on a TCP port
- work with the request-response model
- inspect request headers and URLs
- terminate HTTP responses correctly
- map URLs to static files
- build filesystem paths with `path.join()`
- read files asynchronously with `fs.readFile()`
- handle filesystem errors such as `ENOENT`
- avoid sending multiple responses for one request
- serve a custom 404 page
- send HTTP `200` and `404` status codes
- set `Content-Type` headers
- map file extensions to MIME types
- use `path.extname()` and `.toLowerCase()`
- use `application/octet-stream` as a fallback MIME type
- inspect HTTP responses with `curl -v`
- distinguish CommonJS from ESM
- configure Node.js with `"type": "module"`
- use the Node.js `http`, `fs`, and `path` core modules
- perform a simple load test with `wrk`
- recognize the performance cost of unnecessary request logging

---

## Workshop Status

```text
Build a Web Server
60 / 60
Completed
```

Completed as part of the freeCodeCamp **Back End Development and APIs** curriculum.
