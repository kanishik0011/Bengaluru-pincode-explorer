const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.query('SELECT 1');
    console.log('MySQL connection verified.');
  } catch (error) {
    const detail = error.code || error.message || 'Unknown database connection error';
    console.warn('MySQL is not reachable yet. API requests that need the database will return 503.');
    console.warn(detail);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
