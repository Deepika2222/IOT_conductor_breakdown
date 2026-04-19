const express = require('express');
const app = express();

app.use(express.json());

// Routes
const sensorRoutes  = require('./routes/sensorRoutes');
const statusRoutes  = require('./routes/statusRoutes');
const alertRoutes   = require('./routes/alertRoutes');
const historyRoutes = require('./routes/historyRoutes');

app.use('/api/sensor-data', sensorRoutes);
app.use('/api/status',      statusRoutes);
app.use('/api/history',     historyRoutes); // TODO: implement logic
app.use('/api/alerts',      alertRoutes);

module.exports = app;
