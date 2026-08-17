const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const databaseName = process.env.DB_NAME || 'bangalore_pincode_db';

const runSqlFile = async (connection, filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8').replaceAll('bangalore_pincode_db', databaseName);
  const statements = sql
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await connection.query(statement);
  }
};

const seedDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: false
  });

  try {
    await runSqlFile(connection, path.join(__dirname, '..', '..', 'database', 'schema.sql'));
    await runSqlFile(connection, path.join(__dirname, '..', '..', 'database', 'seed.sql'));
    console.log(`Seeded ${databaseName} successfully.`);
  } finally {
    await connection.end();
  }
};

seedDatabase().catch((error) => {
  const detail = error.code || error.message || 'Unknown database connection error';
  console.error('Database seed failed.');
  console.error(detail);
  process.exit(1);
});
