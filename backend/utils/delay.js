/**
 * utils/delay.js
 * Simulates real API network latency.
 * CONTRACT: DO NOT MODIFY — delay range is intentional for mock parity with prod.
 *
 * TODO: Remove this file entirely when real DB/service calls introduce natural latency.
 */

/**
 * Returns a promise that resolves after a random delay between minMs and maxMs.
 * @param {number} minMs - Minimum delay in milliseconds (default 500)
 * @param {number} maxMs - Maximum delay in milliseconds (default 1000)
 */
const simulateDelay = (minMs = 500, maxMs = 1000) => {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = { simulateDelay };
