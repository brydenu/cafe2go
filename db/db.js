const { Pool } = require("pg");

const pool = new Pool({
    user: 'bryden',
    host: 'localhost',
    database: 'blfs_cafe',
    password: '',
    port: 5432, // default port for PostgreSQL
  });
  

  module.exports = {
    pool,
  }