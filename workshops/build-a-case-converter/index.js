// Build a Case Converter
// freeCodeCamp - Back End Development and APIs

// Convert the entire string to uppercase.
function getUpperCase(str) {
  return str.toUpperCase();
}

// Convert the entire string to lowercase.
function getLowerCase(str) {
  return str.toLowerCase();
}

// Convert the string to sentence case:
// first character uppercase, remaining characters lowercase.
function getSentenceCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Convert every word to proper case:
// first character uppercase, remaining characters lowercase.
function getProperCase(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Export the functions so they can be used by other CommonJS modules.
module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase,
};