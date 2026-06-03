const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.query(
  "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
  (err, res) => {
    if (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
    console.log('✓ Tables in Neon database:');
    res.rows.forEach(row => console.log('  -', row.tablename));
    
    if (res.rows.length === 0) {
      console.log('  (No tables found)');
    }
    
    pool.end();
  }
);
