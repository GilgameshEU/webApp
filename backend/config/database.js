const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "b78fa8f9e3c13e" || "root",
  host: "eu-cdbr-west-03.cleardb.net" || "localhost",
  password: "f00d9efb" || "root",
  database: "heroku_81fe62284a87611" || "main_db",
});

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "root",
//   database: "main_db",
// });

db.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});

//b78fa8f9e3c13e:f00d9efb@eu-cdbr-west-03.cleardb.net/heroku_81fe62284a87611?reconnect=true

mysql: module.exports = db;
