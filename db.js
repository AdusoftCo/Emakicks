// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  max: 20, // Increased from default 10 to handle more concurrent queries
  idleTimeoutMillis: 30000, // 30 seconds before closing idle connections
  connectionTimeoutMillis: 2000, // 2 seconds to establish connection
});

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
