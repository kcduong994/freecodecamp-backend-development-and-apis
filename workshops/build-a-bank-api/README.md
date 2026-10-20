# Build a Bank API

**freeCodeCamp — Back-End Development and APIs**  
**Workshop 08 | Completed: 35/35 | October 20, 2026**

---

## Overview

Tiny Bank API is a REST API built with **Node.js and Express 5**. It demonstrates account management, balance transfers, asynchronous file persistence, structured error responses, health monitoring, and graceful server shutdown.

The workshop also introduces one of the important improvements in Express 5: automatic error propagation from asynchronous route handlers.

Instead of wrapping every asynchronous route in `try/catch`, errors can be thrown directly and automatically forwarded to the centralized error-handling middleware.

**Note:** This is an educational API, not a production banking application.

## Project Structure

```text
build-a-bank-api/
├── accounts.json
├── db.js
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

### File Responsibilities

| File | Responsibility |
|---|---|
| `server.js` | Express application, routes, middleware, and graceful shutdown |
| `db.js` | Asynchronous account data reading and writing |
| `accounts.json` | Persistent JSON account data |
| `package.json` | Project metadata and dependencies |
| `package-lock.json` | Locked dependency versions |
| `README.md` | Technical documentation and verification |

The `node_modules` directory is excluded from version control.

---

## Installation and Running

### Prerequisites

- Node.js
- npm
- An available local port `9000`

Open a terminal in the project directory.

Install dependencies:

```bash
npm ci
```

Start the server:

```bash
node server.js
```

Expected output:

```text
Tiny Bank API running on http://localhost:9000...
```

On Windows PowerShell, `npm.cmd ci` can be used if the PowerShell execution policy prevents `npm` from running.

---

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Return the API startup message |
| GET | `/accounts` | Retrieve all accounts |
| GET | `/accounts/:id` | Retrieve a specific account |
| POST | `/transfer` | Transfer funds between accounts |
| GET | `/health` | Check server health and process information |

### 1. Root Endpoint

**Request**

```http
GET /
```

**Response**

```text
Tiny Bank API (Express 5) running...
```

This confirms that the Express application is running.

### 2. Retrieve All Accounts

**Request**

```http
GET /accounts
```

Example initial account data:

```json
[
  {
    "id": 1,
    "owner": "Alice",
    "balance": 1000
  },
  {
    "id": 2,
    "owner": "Bob",
    "balance": 500
  },
  {
    "id": 3,
    "owner": "Charlie",
    "balance": 250
  }
]
```

The accounts are loaded asynchronously from `accounts.json`.

Balances may change after successful transfers.

### 3. Retrieve an Account by ID

**Request**

```http
GET /accounts/1
```

**Response**

```json
{
  "id": 1,
  "owner": "Alice",
  "balance": 1000
}
```

For an unknown account, the server returns HTTP `404`:

```json
{
  "error": {
    "message": "Account not found",
    "status": 404
  }
}
```

### 4. Transfer Funds

**Request**

```http
POST /transfer
Content-Type: application/json
```

**Request Body**

```json
{
  "fromId": 1,
  "toId": 2,
  "amount": 100
}
```

The API performs the following operations:

1. Validate the required fields.
2. Check that the transfer amount is positive.
3. Load account data.
4. Verify the sender exists.
5. Verify the recipient exists.
6. Check the sender's balance.
7. Subtract the amount from the sender.
8. Add the amount to the recipient.
9. Save the updated account data.
10. Return the transfer result.

**Example Success Response**

```json
{
  "message": "Transfer successful",
  "senderName": "Alice",
  "recipientName": "Bob",
  "amountTransferred": 100,
  "senderNewBalance": 900,
  "recipientNewBalance": 600
}
```

This example assumes the original balances.

A successful transfer permanently modifies `accounts.json` until the data is changed again.

---

## Error Handling

The API uses structured JSON responses and a centralized Express error-handling middleware.

### HTTP Status Codes

| Status | Meaning | Example |
|---|---|---|
| 200 | OK | Successful request |
| 400 | Bad Request | Missing required fields or nonpositive amount |
| 404 | Not Found | Account does not exist |
| 409 | Conflict | Insufficient funds |
| 500 | Internal Server Error | Unexpected server failure |

### Express 5 Async Error Propagation

Express 5 automatically forwards rejected Promises and errors thrown inside asynchronous route handlers to error-handling middleware.

For example:

```js
if (!account) {
  const err = new Error("Account not found");
  err.status = 404;
  throw err;
}
```

The application does not require a separate `try/catch` wrapper around each asynchronous route.

The centralized middleware is responsible for logging the error and formatting the response.

### Temporary Error Testing

During the workshop, a temporary `GET /broken` route was added to intentionally generate an HTTP `500` error.

After confirming the error handler worked correctly, the route was commented out.

---

## Data Persistence

Account data is stored in `accounts.json`.

The `db.js` module uses Node.js asynchronous file-system operations from `fs/promises`.

Two functions are exported:

- `getAccounts()` — reads and parses the JSON data.
- `saveAccounts(accounts)` — writes updated account data back to disk.

The implementation is suitable for learning file-based persistence but does not provide database transactions, concurrent-update protection, or production-level data integrity guarantees.

---

## Health Check Endpoint

**Request**

```http
GET /health
```

The health-check endpoint provides information about the running Node.js process.

Example response structure:

```json
{
  "status": "ok",
  "uptime": 47.15,
  "timestamp": "2026-10-20T14:45:24.497Z",
  "memoryUsage": {
    "rss": 47738880,
    "heapTotal": 10215424,
    "heapUsed": 8321080,
    "external": 2645681,
    "arrayBuffers": 146658
  }
}
```

The values change while the application is running.

### Health Metrics

| Field | Description |
|---|---|
| `status` | Application response status |
| `uptime` | Process running time in seconds |
| `timestamp` | Current time in ISO 8601 UTC format |
| `rss` | Resident memory usage |
| `heapTotal` | Total allocated V8 heap |
| `heapUsed` | Used V8 heap |
| `external` | External memory usage |
| `arrayBuffers` | ArrayBuffer memory usage |

This basic endpoint verifies that the HTTP process is responsive. It does not independently verify the data file's availability.

---

## Graceful Shutdown

The application stores the server instance returned by:

```js
const server = app.listen(PORT, () => {
  console.log(`Tiny Bank API running on http://localhost:${PORT}...`);
});
```

Two operating-system signals are handled:

- `SIGTERM` — termination requests, commonly issued by process managers.
- `SIGINT` — interruption requests, commonly triggered by pressing `Ctrl + C`.

Both handlers call `server.close()` to stop accepting new connections and close the server before exiting.

Expected output when pressing `Ctrl + C`:

```text
SIGINT received. Closing server...
Server closed.
```

---

## Local Testing and Verification

### Windows Environment

The final project was copied from GitHub Codespaces to a local Windows development environment.

Dependencies were installed successfully using:

```powershell
npm.cmd ci
```

The server was started with:

```powershell
node server.js
```

The application started successfully on:

`http://localhost:9000`

### Browser Testing

The following endpoints were manually verified:

| Endpoint | Result |
|---|---|
| `http://localhost:9000/` | Passed |
| `http://localhost:9000/accounts` | Passed |
| `http://localhost:9000/accounts/1` | Passed |
| `http://localhost:9000/health` | Passed |

### Terminal Testing

The local API was also tested using:

```powershell
curl.exe -i http://localhost:9000/
curl.exe -i http://localhost:9000/accounts
curl.exe -i http://localhost:9000/accounts/1
curl.exe -i http://localhost:9000/health
```

The tested endpoints returned successful HTTP responses and the expected data.

### Dependency Audit

During local installation on October 20, 2026, npm reported three dependency vulnerabilities: one low, one moderate, and one critical.

These advisories have not yet been individually reviewed or resolved. Any future deployment should include dependency auditing and appropriate remediation.

---

## Key Concepts Learned

This workshop introduced and reinforced:

- Node.js and npm
- ES Modules
- Express 5
- REST API design
- HTTP methods and status codes
- Express middleware
- Route parameters
- JSON request bodies
- Asynchronous programming with `async/await`
- Promise rejection and error propagation
- Centralized error handling
- File-based persistence with `fs/promises`
- Input validation
- Balance transfer logic
- API testing with `curl`
- Health-check endpoints
- Process uptime and memory usage
- Operating-system signals
- Graceful server shutdown

---

## Completion Status

**freeCodeCamp Workshop:** Build a Bank API

**Official Completion:** 35/35 steps passed

**Local Environment:** Windows, VS Code, Node.js, Express 5

**Local Verification:** Root, account-list, account-detail, and health-check endpoints successfully tested.

**Completion Date:** October 20, 2026

**Status: Completed**

The final implementation preserves the workshop's intended features and demonstrates Express 5 asynchronous error handling, persistent JSON account operations, health monitoring, and graceful shutdown.