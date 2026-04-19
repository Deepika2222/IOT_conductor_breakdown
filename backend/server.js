/**
 * server.js
 * HTTP server entry point.
 *
 * CONTRACT: DO NOT MODIFY API behavior here
 */

require('dotenv').config(); // load .env if present

const app = require('./app');

// 🟡 ThingSpeak credentials check (non-blocking in mock mode)
// TODO: switch this back to process.exit(1) once real ThingSpeak integration is wired in
if (!process.env.TS_CHANNEL_ID || !process.env.TS_READ_KEY) {
  console.warn('⚠️  WARNING: TS_CHANNEL_ID / TS_READ_KEY not set in .env');
  console.warn('   Running in MOCK mode — no real ThingSpeak calls will be made.');
  console.warn('   Add TS_CHANNEL_ID and TS_READ_KEY to .env before enabling real integration.');
}

// 🔍 Debug (you can remove later)
console.log("Channel ID:", process.env.TS_CHANNEL_ID);
console.log("Read Key Loaded:", process.env.TS_READ_KEY ? "YES" : "NO");

// CONTRACT: DO NOT MODIFY default port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  IoT Fault Detection — Backend Running');
  console.log(`  Server running on http://localhost:${PORT}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Available endpoints:');
  console.log(`  POST http://localhost:${PORT}/api/sensor-data`);
  console.log(`  GET  http://localhost:${PORT}/api/status`);
  console.log(`  GET  http://localhost:${PORT}/api/history`);
  console.log(`  GET  http://localhost:${PORT}/api/alerts`);
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
