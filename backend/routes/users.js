const express = require("express");
const router = express.Router();
const db = require("../config/database");
// another routes also appear here
// this script to fetch data from MySQL databse table

router.get("/user-list", function (req, res, next) {
  const sql = "SELECT * FROM users";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("user-list", { title: "User List", userData: data });
  });
});

//solo del with id
router.get("/delete/:id", function (request, res, next) {
  var id = request.params.id;
  const sql = `DELETE FROM users WHERE id = "${id}" `;
  db.query(sql, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect("/users/user-list");
    }
  });
});

//group del
router.post("/groupDelete", function (request, res, next) {
  var groupIds = request.body.shouldDelete;
  console.log(request.body.shouldDelete);
  const sql = `DELETE FROM users WHERE id IN "${groupIds.join(",")}" `;
  db.query(sql, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect("/users/user-list");
    }
  });
});

module.exports = router;
