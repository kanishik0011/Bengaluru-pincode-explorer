const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pincodeRoutes = require('./routes/pincodeRoutes');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();
const allowedOrigins = new Set([
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/pincodes', pincodeRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'The requested API route was not found.'
  });
});

app.use(errorHandler);

module.exports = app;
