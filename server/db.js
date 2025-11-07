// db.js
import pkg from 'pg';
const { Pool } = pkg;

let pool;

if (process.env.DATABASE_URL) {
  // Render or production environment
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

} else {
  // Local development
  pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

pool.query("SET search_path TO proyecto, public")
  .catch(err => console.error("Failed to set search_path:", err));

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
