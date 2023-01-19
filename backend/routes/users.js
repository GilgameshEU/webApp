const express = require("express");
const router = express.Router();
const db = require("../config/database");
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get("/user-list", function (req, res, next) {
  const sql = "SELECT * FROM test";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("user-list", { title: "User List", userData: data });
  });
});
module.exports = router;
