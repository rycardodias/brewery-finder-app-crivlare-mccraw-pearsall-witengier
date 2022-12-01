const mysql = require("mysql2");

const config = process.env.JAWSDB_URL || {
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE
};
const db = mysql.createPool(config);

module.exports = db.promise();
