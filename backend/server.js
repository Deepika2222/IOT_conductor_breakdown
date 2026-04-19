/**
 * server.js
 * HTTP server entry point.
 *
 * TODO: Read PORT from environment variable (process.env.PORT) in production.
 * TODO: Add graceful shutdown handling (SIGTERM / SIGINT) in production.
 */

const app  = require('./app');

// CONTRACT: DO NOT MODIFY default port without updating frontend base URL config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  IoT Fault Detection — Mock Backend`);
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
