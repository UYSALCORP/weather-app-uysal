const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./middlewares/logger');
require('express-async-errors'); // To handle async errors
const errorHandler = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
// const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// HTTP Request Logger
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/weather', weatherRoutes);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
