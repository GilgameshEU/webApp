const mysql = require("mysql2");

const db = mysql.createConnection({
  user: process.env.DB_HOST || "root",
  host: process.env.DB_USER || "localhost",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "main_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});

module.exports = db;
