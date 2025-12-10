// db.js
import pkg from "pg";
const { Pool } = pkg;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

let pool;

if (process.env.DATABASE_URL) {
  // Railway production
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" 
      ? { rejectUnauthorized: false }
      : false,
  });

  console.log("Using DATABASE_URL");

} else {
  // Local development
  pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
  });

  console.log("Using LOCAL database");
}

// Ensure schema
pool.on("connect", (client) => {
  client.query('SET search_path TO proyecto, public')
    .catch(err => console.error("Failed to set search_path:", err));
});

export default pool;
