# Build a Chat App

**freeCodeCamp — Back-End Development and APIs**  
**Certification Project 04 | Official result: 1/1 passed | October 28, 2026**

---

## Overview

Build a Chat App is a real-time, multi-client chat server built with Node.js and the `ws` WebSocket library. The HTTP server serves the provided chat UI, while the WebSocket server shares port `3001` and broadcasts chat and system events to connected browsers.

The certification exercise is **server-side focused**: freeCodeCamp supplies `public/index.html` and `public/script.js`. The implementation work is in `server.js`.

This is an educational application, not a production chat system. It has no authentication, persistent message history, moderation, rate limiting, or TLS setup.

## Project Structure

```text
build-a-chat-app/
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
| `server.js` | HTTP server, WebSocket upgrade, username parsing, chat broadcasting, join/leave notifications |
| `public/index.html` | freeCodeCamp-provided browser chat interface |
| `public/script.js` | freeCodeCamp-provided client: connects, sends messages, updates the UI |
| `package.json` | ESM configuration, `ws` dependency, `npm start` script |
| `package-lock.json` | Resolved dependency graph for reproducible installation |
| `README.md` | Project architecture, contract, and verification notes |

`node_modules/` is installed locally but excluded from Git.

## Installation and Running

Prerequisites: Node.js, npm, and available port `3001`.

```powershell
npm.cmd ci
node --check server.js
node --check public/script.js
npm.cmd start
```

Alternatively, use `npm ci` and `npm start` where the npm PowerShell shim is allowed.

Expected terminal message:

```text
Chat server running at http://localhost:3001
```

Open [http://localhost:3001](http://localhost:3001) in a browser.

## HTTP Contract

| Method | Path | Expected response |
|---|---|---|
| `GET` | `/` | HTTP `200`, `Content-Type: text/html`, contents of `./public/index.html` |

The coursework specifically requires the HTML page at `/`; the WebSocket client JavaScript is supplied in the provided HTML interface.

## WebSocket Protocol

A client connects to:

```text
ws://localhost:3001?username=Alice
```

The connection handler reads the username from the `username` URL query parameter. The server manages connected peers through `wss.clients` and only sends to peers whose ready state is `WebSocket.OPEN`.

### Join notification

On connection, broadcast a system message to **all** connected clients:

```json
{ "type": "system", "text": "Alice joined" }
```

### Chat message

The client sends:

```json
{ "username": "Alice", "text": "Hello everyone!" }
```

The server parses the JSON and broadcasts to **all clients, including the sender**:

```json
{ "type": "chat", "username": "Alice", "text": "Hello everyone!" }
```

### Leave notification

When Alice disconnects, the server broadcasts to the **remaining connected clients**:

```json
{ "type": "system", "text": "Alice left" }
```

### Execution flow

```text
Browser: GET /
    -> Node.js HTTP server -> public/index.html

Browser: ws://localhost:3001?username=Alice
    -> HTTP Upgrade -> WebSocketServer
    -> connection -> broadcast join event
    -> message    -> JSON.parse -> broadcast chat event
    -> close      -> broadcast leave event
```

WebSocket connections remain active so the server can push events without repeated HTTP polling.

## Manual Verification

With the server running, open two tabs at `http://localhost:3001/`:

1. Connect tab A as `Alice` and tab B as `Bob`.
2. Confirm the join notification appears when a user connects.
3. Send `Hello everyone!` from Alice and confirm **both Alice and Bob** receive the chat message.
4. Disconnect Alice and confirm Bob receives the `Alice left` notification.

Verify the HTTP response from a second terminal:

```powershell
curl.exe -i http://localhost:3001/
```

A separate automated smoke-test script can verify HTTP, connection, join, message broadcast and leave using Node.js's built-in `WebSocket` client (on a supported Node.js version).

## Key Concepts Learned

- Node.js HTTP server with `http.createServer()` and `fs.readFile()`
- WebSocket upgrade handshake and port sharing
- `ws` library and `WebSocketServer({ server })`
- `wss.on("connection", (socket, req) => ...)`
- URL query parameters and `URL.searchParams.get()`
- `wss.clients` and `WebSocket.OPEN`
- JSON serialization with `JSON.stringify()` and parsing with `JSON.parse()`
- Event-driven communication: `connection`, `message`, `close`
- Broadcast fan-out to multiple clients, including the sender
- Connection lifecycle and browser event handling

## Local and Environment Notes

- The provided browser client uses `ws://localhost:3001`. This works when server and browser run on the same computer. A remote Codespaces forwarded URL may require a proxy-aware WebSocket endpoint; the archived files preserve the freeCodeCamp implementation.
- The example does not authenticate the username or validate every message. It should not be deployed publicly as-is.
- Review `npm audit` results before any public deployment; do not blindly apply breaking dependency upgrades.

---

## Completion and Verification

**freeCodeCamp project:** Build a Chat App  
**Certification Project:** 04  
**Official completion:** 1/1 passed, October 28, 2026  
**Windows local verification:** Passed — HTTP page and multi-client WebSocket join/chat/leave smoke tests (user-confirmed).

**Repository location:** `certification-projects/build-a-chat-app/`
