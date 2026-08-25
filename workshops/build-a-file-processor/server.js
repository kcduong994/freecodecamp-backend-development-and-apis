// Node.js File Processor Workshop
// freeCodeCamp - Back End Development and APIs

const fs = require("fs");

// -----------------------------------------------------------------------------
// File System (fs)
// -----------------------------------------------------------------------------

// Create or overwrite a file synchronously.
fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");

// Append content to an existing file.
fs.appendFileSync("assets/output.txt", "\nSecond line");

// Check whether a file exists.
const exists = fs.existsSync("assets/output.txt");
console.log(exists);

// Read the contents of a directory.
const entries = fs.readdirSync("assets");
console.log(entries);

// -----------------------------------------------------------------------------
// Buffer
// -----------------------------------------------------------------------------

// Create a Buffer from a UTF-8 string.
const buf = Buffer.from("Hello, Node!");
console.log(buf);

// Convert the Buffer to hexadecimal.
console.log(buf.toString("hex"));

// Convert the Buffer to Base64.
console.log(buf.toString("base64"));

// Allocate an 8-byte Buffer and fill every byte with 0xff.
const buf2 = Buffer.alloc(8, 0xff);
console.log(buf2);

// Decode a Base64 string back into UTF-8 text.
const decoded = Buffer.from("ZnJlZUNvZGVDYW1w", "base64").toString("utf8");
console.log(decoded);

// -----------------------------------------------------------------------------
// Crypto
// -----------------------------------------------------------------------------

const crypto = require("crypto");

// Create a SHA-256 hash and return it as hexadecimal.
const hash = crypto
  .createHash("sha256")
  .update("freeCodeCamp!")
  .digest("hex");

console.log(hash);

// Generate 16 cryptographically secure random bytes.
const random = crypto.randomBytes(16).toString("hex");
console.log(random);

// Generate a random UUID v4.
const id = crypto.randomUUID();
console.log(id);

// -----------------------------------------------------------------------------
// Operating System (os)
// -----------------------------------------------------------------------------

const os = require("os");

console.log(os.platform());
console.log(os.arch());
console.log(os.hostname());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime());
console.log(os.cpus().length);

// -----------------------------------------------------------------------------
// Path
// -----------------------------------------------------------------------------

const path = require("path");

const filePath = path.join(__dirname, "assets", "poem.txt");
console.log(filePath);

console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));

console.log(path.join("assets", "..", "server.js"));
console.log(path.resolve("assets", "..", "server.js"));

const parts = path.parse(filePath);
console.log(parts);

// -----------------------------------------------------------------------------
// Process
// -----------------------------------------------------------------------------

console.log(process.version);
console.log(process.platform);
console.log(process.env.NODE_ENV);
console.log(process.argv);

process.stdout.write("Hello from stdout\n");
process.stderr.write("Hello from stderr\n");

// -----------------------------------------------------------------------------
// Streams
// -----------------------------------------------------------------------------

// Create a readable stream from poem.txt.
const readable = fs.createReadStream("assets/poem.txt");

// Create a writable stream targeting stream-output.txt.
const writable = fs.createWriteStream("assets/stream-output.txt");

// Pipe data directly from the readable stream to the writable stream.
readable.pipe(writable);