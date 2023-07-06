const { Pool } = require("pg");

const ENV = process.env.ENVIRONMENT;

let user, host, database, password, port;

if (ENV === "prod") {
  user = process.env.DB_USER;
  host = process.env.DB_HOST;
  database = process.env.DB_NAME;
  password = process.env.DB_PASS;
  port = process.env.DB_PORT;
} else {
  user = 'bryden';
  host = 'localhost';
  database = 'blfs_cafe';
  password = '';
  port = 5432;
}

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
  });
  

  module.exports = {
    pool,
  }