# Build a Resource Monitor

**freeCodeCamp — Back-End Development and APIs**  
**Workshop 09 | Official freeCodeCamp completion: 20/20 | October 25, 2026**

---

## Overview

Build a Resource Monitor is a small real-time monitoring application built with **Node.js**, its built-in `http`, `fs`, and `os` modules, and the **`ws` WebSocket library**.

A Node.js HTTP server serves a browser dashboard. The WebSocket server shares the same port and streams operating-system load averages and memory metrics to each connected client **every 1,000 milliseconds**. The browser parses the incoming JSON and updates the dashboard without reloading the page.

The project demonstrates the WebSocket upgrade handshake, full-duplex connections, event-driven programming, JSON serialization, periodic resource reporting, and cleanup on disconnection.

> **Scope:** An educational local monitor, not a production monitoring or observability service. The metrics describe the environment in which the Node.js process runs; they are not an application-specific CPU usage measurement.

## Project Structure

```text
build-a-resource-monitor/
├── public/
│   ├── index.html
│   └── script.js
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

| File | Responsibility |
|---|---|
| `server.js` | HTTP server, WebSocket server, system metrics, event listeners, and periodic telemetry |
| `public/index.html` | Browser monitoring dashboard |
| `public/script.js` | Browser WebSocket client, status updates, and live metric rendering |
| `package.json` | ESM configuration, `start` script, and `ws` dependency |
| `package-lock.json` | Locked npm dependency versions |
| `README.md` | Documentation and verification instructions |

`node_modules/` is generated locally and should not be committed.

---

## Requirements and Installation

- Node.js and npm installed
- TCP port `3000` available
- A modern browser with WebSocket support

Open a terminal inside `workshops/build-a-resource-monitor/` and install exactly the dependencies recorded in the lockfile:

```bash
npm ci
```

Start the application:

```bash
npm start
```

Expected output:

```text
Server running at http://localhost:3000
```

Open **http://localhost:3000/** in a browser on the same machine.

On Windows PowerShell, use `npm.cmd ci` and `npm.cmd start` if PowerShell execution policy blocks the `npm.ps1` shim.

---

## HTTP and WebSocket Architecture

The application uses one Node.js HTTP server and attaches a `WebSocketServer` to it:

```js
const wss = new WebSocketServer({ server });
```

Both normal HTTP requests and WebSocket upgrade requests arrive on port `3000`.

### HTTP paths

| Method | Path | Response | Content-Type |
|---|---|---|---|
| `GET` | `/` | `public/index.html` | `text/html` |
| `GET` | `/index.html` | `public/index.html` | `text/html` |
| `GET` | `/script.js` | `public/script.js` | `text/javascript` |
| Other paths | Unrecognized | `404 Not found` | `text/plain` |

The server uses `fs.readFile()` to load the corresponding file, responds with `200` and the correct content type on success, and returns `500` if the file cannot be read.

### WebSocket flow

```text
Browser                                  Node.js server
   |                                             |
   |------ HTTP Upgrade: websocket ------------>|
   |<----- 101 Switching Protocols -------------|
   |                                             |
   |<----- JSON system metrics (every 1 s) -----|
   |<----- JSON system metrics (every 1 s) -----|
   |                                             |
   |-------- WebSocket close ------------------>|
   |                                             |
   |                       clearInterval(interval)
```

The `ws` package handles the WebSocket handshake. The browser uses the built-in WebSocket API:

```js
const socket = new WebSocket("ws://localhost:3000");
```

The `ws://` scheme is **not TLS-encrypted**. Do not deploy this exact fixed-localhost URL as a remote production configuration.

---

## System Metrics

`getMetrics()` reads operating-system information from Node.js's built-in `os` module:

```js
function getMetrics() {
  return {
    loadAvg: os.loadavg(),
    freeMemMB: (os.freemem() / 1024 / 1024).toFixed(0),
    totalMemMB: (os.totalmem() / 1024 / 1024).toFixed(0),
    memUsagePct: (
      ((os.totalmem() - os.freemem()) / os.totalmem()) *
      100
    ).toFixed(1),
  };
}
```

| Property | Meaning | Notes |
|---|---|---|
| `loadAvg` | Average system load over 1, 5, and 15 minutes | **Not CPU utilization %**; Node.js reports `[0, 0, 0]` on Windows |
| `freeMemMB` | Available system memory | Rounded to zero decimals |
| `totalMemMB` | Total system memory | Rounded to zero decimals |
| `memUsagePct` | Used memory as a percentage of total | One decimal place |

Although the property names use `MB`, dividing by `1024 * 1024` yields **MiB**, not decimal megabytes. Also, `Number.prototype.toFixed()` returns a **string**, so the three memory properties are strings in the serialized message.

Example payload (illustrative values, not measured):

```json
{
  "loadAvg": [0.45, 0.38, 0.29],
  "freeMemMB": "8192",
  "totalMemMB": "16384",
  "memUsagePct": "50.0"
}
```

---

## Server Event Lifecycle

For each accepted WebSocket connection:

1. `wss.on("connection", ...)` receives the `socket` and logs `Client connected`.
2. `setInterval()` calls `socket.send(JSON.stringify(getMetrics()))` once per second.
3. `socket.on("message", ...)` logs messages received from the browser after converting the incoming buffer to a string.
4. `socket.on("close", ...)` calls `clearInterval(interval)` and logs `Client disconnected`.
5. `socket.on("error", ...)` logs unexpected socket errors with `console.error()`.

The per-client interval is stopped on `close` so it does not continue referencing a disconnected socket.

## Browser Event Lifecycle

| Browser event handler | Action |
|---|---|
| `socket.onopen` | Show `Connected` |
| `socket.onmessage` | `JSON.parse(event.data)` and call `updateMetrics(data)` |
| `socket.onclose` | Show `Disconnected` |
| `socket.onerror` | Log the WebSocket error in the browser console |

The two helper functions provided by freeCodeCamp, `updateMetrics()` and `setStatus()`, are retained without modification.

---

## Local Verification

### Official freeCodeCamp checkpoint

- **Workshop:** Build a Resource Monitor
- **Result:** 20/20 steps completed
- **Date:** October 25, 2026

### Windows verification checklist

After copying the completed source from Codespaces, run these checks locally:

```powershell
node --version
npm.cmd --version
npm.cmd ci
node --check server.js
node --check public/script.js
npm.cmd start
```

In a **second** PowerShell terminal:

```powershell
curl.exe -i http://localhost:3000/
curl.exe -i http://localhost:3000/script.js
```

Confirm the responses have HTTP `200` and the expected `Content-Type` values. In the local browser, visit `http://localhost:3000/`, confirm the connection status becomes `Connected`, and observe the displayed memory readings updating every second. The 1-, 5-, and 15-minute load-average fields are normally zero when the server runs on Windows.

**Local test status:** Passed after independent Windows verification (user-confirmed): local HTTP and browser WebSocket metrics were tested on port 3000.

### Common pitfalls

- **Wrong file location:** Browser code must be `public/script.js`, not a root-level `script.js`.
- **Missing JavaScript route:** The HTTP server must serve `/script.js` with a JavaScript content type.
- **Port already used:** Another process listening on port `3000` can prevent startup.
- **Codespaces forwarding:** The workshop's fixed `ws://localhost:3000` client URL works for local Windows execution, but an external browser viewing a forwarded Codespaces URL may need a different WebSocket URL and security configuration. Preserve the curriculum implementation in the archived source.
- **npm scripts on PowerShell:** Use `npm.cmd` if the PowerShell execution policy blocks the npm shim.

---

## Key Concepts Learned

- Node.js ES Modules (`import`)
- Built-in `http`, `fs`, and `os` modules
- `http.createServer()` and `server.listen()`
- HTTP routes, status codes, and content types
- WebSocket `Upgrade` handshake and status `101 Switching Protocols`
- `ws` and `WebSocketServer`
- Shared HTTP/WebSocket server port
- WebSocket client-side API
- Connection, message, close, and error events
- JavaScript `Buffer` and `.toString()`
- `JSON.stringify()` and `JSON.parse()`
- `setInterval()` and `clearInterval()`
- Per-connection resource cleanup
- Operating-system load averages and memory information
- DOM updates with `textContent`
- Local HTTP and WebSocket verification

---

## Completion Status

**freeCodeCamp workshop:** Build a Resource Monitor  
**Workshop number:** 09  
**Official result:** 20/20 completed  
**Official completion date:** October 25, 2026  
**Windows local verification:** Passed (user-confirmed)  
**Status:** FreeCodeCamp workshop complete; Windows local runtime verified by the user. GitHub archival is finalized upon commit and push.
