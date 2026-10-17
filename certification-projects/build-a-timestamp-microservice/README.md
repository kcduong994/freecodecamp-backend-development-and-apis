# Build a Timestamp Microservice

**freeCodeCamp Back-End Development and APIs — Certification Project 03**

**Official freeCodeCamp status:** ✅ Completed — **1 / 1** (7 user-story checks), October 17, 2026.

## Overview

This certification project implements a RESTful timestamp microservice with Node.js and Express. The API accepts supported date strings and Unix timestamps expressed as milliseconds, converts them into a common JavaScript `Date`, and returns both numeric Unix milliseconds and a UTC representation. Invalid inputs return a predictable JSON error.

The work is based on the freeCodeCamp **Build a Timestamp Microservice** project. It is an independent assessment rather than a guided workshop.

## Project Structure

```text
build-a-timestamp-microservice/
├── public/
│   └── styles.css
├── views/
│   └── index.html
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

`node_modules/` is installed locally and excluded from Git. Course-only directories such as `test/` and `_solution/` are not part of the archived submission.

## Runtime and Dependencies

- **Node.js** — JavaScript runtime and built-in `Date` object.
- **Express 5** — HTTP application and API routes.
- **cors** — cross-origin middleware provided by the project starter.
- **ES Modules** — `import` syntax enabled by `"type": "module"` in `package.json`.
- **Port:** `8000`, as required by the official project template.

From the project folder:

```bash
npm ci
npm start
```

For a first-time installation without an existing lockfile, `npm install` is the alternative. Stop the server with `Ctrl+C`.

## User Stories and Expected Results

| # | Request / scenario | Expected result |
|---|---|---|
| 1 | `GET /api/2016-12-25` | `unix` equals `1482624000000` |
| 2 | `GET /api/2016-12-25` | `utc` equals `Sun, 25 Dec 2016 00:00:00 GMT` |
| 3 | `GET /api/1451001600000` | Correct Unix and UTC for December 25, 2015 |
| 4 | `GET /api/05%20October%202011` | Parses a supported, non-ISO date string |
| 5 | `GET /api/this-is-not-a-date` | `{ "error": "Invalid Date" }` |
| 6 | `GET /api` | `unix` represents current time in milliseconds |
| 7 | `GET /api` | `utc` represents current time in GMT |

A valid response:

```json
{
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
```

An invalid response:

```json
{
  "error": "Invalid Date"
}
```

## How the Date Conversion Works

The application reads the optional URL segment from `req.params.date` and distinguishes three cases:

1. **No date segment:** construct a new `Date()` for the current time.
2. **A numeric timestamp string:** convert the string to a number before constructing `new Date(number)`, because timestamps are expressed in **milliseconds**, not seconds.
3. **A date string:** use the JavaScript `Date` parser (`new Date(dateString)`) to interpret supported formats.

Then validate the parsed result:

```js
if (Number.isNaN(date.getTime())) {
  return res.json({ error: "Invalid Date" });
}
```

A valid date can be serialized as:

```js
res.json({
  unix: date.getTime(),
  utc: date.toUTCString(),
});
```

`getTime()` returns milliseconds since `1970-01-01T00:00:00.000Z`. `toUTCString()` produces a standardized GMT representation.

### Express 5 Routing

The provided freeCodeCamp project uses Express 5. Where a single optional-path pattern from older Express versions is unsupported, these routes can be handled together:

```js
app.get(["/api", "/api/:date"], handler);
```

This serves both `/api` and `/api/:date` without changing the required HTTP interface. Preserve the existing project-provided CORS, static serving, homepage route, and server startup code.

### Date Parsing Notes

- An all-digit URL parameter such as `1451001600000` represents Unix **milliseconds**.
- A normal date string such as `2016-12-25` is passed to the built-in Date parser.
- Unsupported strings must not produce `NaN` or a server error; return `{ "error": "Invalid Date" }` instead.
- UTC output is independent of the client's local timezone.
- Date parsing behavior for ambiguous, locale-dependent input should not be relied upon in production services; the project follows the prescribed JavaScript parser behavior.

## Local Verification

The official freeCodeCamp project has passed **1 / 1**, confirming its certification checks in Codespaces. After copying the source to the Windows repository, run the checks again locally:

```bash
node --check server.js
npm ci
npm start
```

In a second terminal, run the separate local verifier (`timestamp-local-tests.mjs`) supplied with the archival workflow, or use direct HTTP checks:

```bash
curl http://localhost:8000/api/2016-12-25
curl http://localhost:8000/api/1451001600000
curl http://localhost:8000/api/05%20October%202011
curl http://localhost:8000/api/this-is-not-a-date
curl http://localhost:8000/api
```

**Local verification record:** The archived Windows copy passed all seven user-story checks on October 17, 2026; the server was run on port 8000 using the UTC timezone setting to match the course's date-parsing environment.

## Learning Outcomes

```text
RESTful API routing
Express 5
req.params
URL parameters and percent-encoding
Date constructor and parsing
Unix timestamps in milliseconds
UTC / GMT string formatting
Date.getTime()
Date.toUTCString()
Date.now()
Number.isNaN()
JSON serialization
Input validation and predictable JSON errors
Current-time responses
CORS middleware
ES Modules
npm dependency installation
Local HTTP tests
Git / GitHub archival workflow
```

## Completion

- **freeCodeCamp:** ✅ Certification Project passed, 1 / 1.
- **Windows local verification:** ✅ Passed all 7 / 7 checks on October 17, 2026.
- **GitHub archive:** Preserved in `certification-projects/build-a-timestamp-microservice/` for the next Git commit/push.

This README intentionally documents the learning project, not a production-ready calendar/date API or broader validation system.
