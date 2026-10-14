# Build a Weather Service API

**freeCodeCamp Back-End Development and APIs — Express Workshop**

**Status:** ✅ Completed — **20 / 20 steps** (October 14, 2026)

---

## Overview

This workshop builds an Express.js weather service with modular routing, HTTP endpoints, external API requests, error handling, and static HTML delivery.

The application demonstrates how to:

- define GET and POST routes;
- read dynamic route parameters from `req.params`;
- group routes with `app.route()`;
- build and mount modular routers with `express.Router()`;
- export and import routes using ECMAScript Modules (ESM);
- fetch data from an external weather service using `async`/`await`;
- handle failed HTTP requests with `try`/`catch`;
- serve a frontend from `public/` using `express.static()` and `res.sendFile()`;
- expose basic API discovery metadata through `/api/info`.

The remote weather service used in the workshop is `https://weather-proxy.freecodecamp.rocks`.

## Project Structure

```text
build-a-weather-service-api/
├── public/
│   └── index.html
├── index.js
├── weather.js
├── package.json
├── package-lock.json
└── README.md
```

`package-lock.json` is created or updated by `npm install` when archiving locally. The `node_modules/` directory is not tracked in Git. The freeCodeCamp `_solution/` and `test/` directories are not part of this archive.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript server runtime and built-in `fetch()` |
| Express 5 | HTTP routing, middleware, JSON responses, static files |
| JavaScript ESM | `import`, `export default`, `import.meta.url` |
| HTML | Front-end page in `public/index.html` |
| Weather Proxy API | External data source for city weather |

The workshop's `package.json` uses `"type": "module"`, defines `"start": "node index.js"`, and lists Express as a dependency.

## Run Locally

Requires a current Node.js release with built-in `fetch()` (Node.js 18 or newer).

From the workshop directory:

```bash
npm install
npm start
```

Alternatively:

```bash
node index.js
```

By default, the server listens on `http://localhost:3000`.

Stop it with `Ctrl+C`.

## API Routes

| Method | Path | Description | Typical status |
|---|---|---|---|
| GET | `/` | Serve `public/index.html` | 200 |
| GET | `/index.html` | Serve the HTML file through static middleware | 200 |
| GET | `/api/info` | Return API name, version, and endpoint list | 200 |
| GET | `/api/status` | Return `{ "status": "ok" }` | 200 |
| GET | `/docs` | Redirect to `/api/info` | 302 |
| GET | `/api/greet/:name` | Return a greeting for the requested name | 200 |
| GET | `/api/data` | Return example API data | 200 |
| POST | `/api/data` | Return example created-data response | 201 |
| GET | `/api/weather` | Return supported cities | 200 |
| GET | `/api/weather/:city` | Fetch weather information for a city | 200 or 404 |

`/api/info` provides a simple, hand-maintained endpoint list; it is not a generated OpenAPI specification.

## Application Organization

### `index.js`: Express Application

The entry point constructs the Express app:

```js
import express from "express";
import weatherRouter from "./weather.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

// Other application routes ...

app.use("/api/weather", weatherRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

`fileURLToPath(import.meta.url)` and `path.dirname()` recover the current module's directory for use with `path.join()`, since Node.js ESM does not provide the CommonJS `__dirname` variable by default.

### `weather.js`: Modular Router

The weather module creates a router using `express.Router()` and exports it with `export default router`.

```js
import express from "express";

const router = express.Router();

const SUPPORTED_CITIES = [
  "London",
  "Tokyo",
  "New York",
  "Paris",
  "Seoul",
];

router.get("/", (req, res) => {
  res.json({ supportedCities: SUPPORTED_CITIES });
});

router.get("/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();

    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (error) {
    res.status(404).json({
      error: `Could not fetch weather data for "${city}".`,
    });
  }
});

export default router;
```

The server mounts the router at `/api/weather`. Therefore, `router.get("/")` becomes `GET /api/weather`, and `router.get("/:city")` becomes `GET /api/weather/:city`.

## External API Request Lifecycle

```text
Browser / API client
        |
        | GET /api/weather/London
        v
Express application (index.js)
        |
        | app.use('/api/weather', weatherRouter)
        v
Weather router (weather.js)
        |
        | req.params.city = 'London'
        | await fetch(weather-proxy endpoint)
        v
freeCodeCamp weather proxy
        |
        | JSON weather response
        v
Transform fields in weather.js
        |
        | city: data.name
        | temperature: data.main.temp
        | description: data.weather[0].description
        v
HTTP JSON response
```

### Why `async` and `await`?

The route must await the network request and JSON body parsing:

```js
const response = await fetch(url);
const data = await response.json();
```

The request handler is declared `async` so these operations can use `await` without blocking the Node.js event loop.

### Handling Failed Requests

`fetch()` does not reject merely because the upstream API returns a 4xx or 5xx status. The code therefore checks `response.ok` and explicitly throws an error for unsuccessful responses:

```js
if (!response.ok) {
  throw new Error(`Status ${response.status}`);
}
```

The workshop catches these errors and responds with:

```json
{
  "error": "Could not fetch weather data for \"NotARealCity\"."
}
```

with HTTP status `404`.

**Production consideration:** In a production API, connection failures and upstream 5xx responses should normally be distinguished from an unsupported city (`404`). Input validation, `encodeURIComponent(city)`, request timeouts, and structured logging would also improve robustness. These enhancements are beyond the workshop's required implementation and are not included in the archived solution.

## Serving the Frontend

The middleware:

```js
app.use(express.static(path.join(__dirname, "public")));
```

serves files contained in `public/`, including `GET /index.html`. The root handler also explicitly uses:

```js
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
```

Because `express.static()` precedes the root handler, it may satisfy `GET /` by serving `public/index.html` before the explicit root handler runs. This reflects Express middleware ordering.

## Verify Locally

First, check JavaScript syntax:

```bash
node --check index.js
node --check weather.js
```

Start the server with `npm start` or `node index.js`, then use another terminal:

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/index.html
curl -i http://localhost:3000/api/info
curl -i http://localhost:3000/api/status
curl -i http://localhost:3000/api/weather
curl -i http://localhost:3000/api/weather/London
curl -i http://localhost:3000/api/weather/NotARealCity
curl -i -X POST http://localhost:3000/api/data
```

The weather data request requires network access and availability of the external freeCodeCamp weather proxy; its exact response values may change.

Expected examples:

`GET /api/weather`:

```json
{
  "supportedCities": ["London", "Tokyo", "New York", "Paris", "Seoul"]
}
```

`GET /api/status`:

```json
{
  "status": "ok"
}
```

`GET /api/weather/NotARealCity`:

```json
{
  "error": "Could not fetch weather data for \"NotARealCity\"."
}
```

The success response for `GET /api/weather/London` includes `city`, `temperature`, and `description` fields.

## Learning Outcomes

```text
Express app creation and server listening
HTTP GET and POST methods
app.get()
app.route()
app.use()
express.Router()
router.get()
route parameters with req.params
HTTP status codes
res.send()
res.json()
res.status()
res.redirect()
res.sendFile()
ESM import/export
async/await
built-in Node.js fetch()
response.ok
try/catch and throw
external HTTP API integration
express.static()
static file paths and Content-Type
import.meta.url
fileURLToPath()
path.dirname() and path.join()
JSON API discovery endpoint
```

## Completion and Scope

The freeCodeCamp workshop was completed with **20 / 20 steps** on **October 14, 2026**.

This folder preserves the workshop implementation rather than attempting to expand it into a production weather service. The upstream proxy is a teaching dependency, not an API operated by this repository.

This README documents the source expected at the final checkpoint; local installation and HTTP verification should be performed again after transferring the actual files from Codespaces.
