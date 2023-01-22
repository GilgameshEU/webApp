const express = require("express");
const router = express.Router();
const db = require("../config/database");
const urlencodedParser = express.urlencoded({ extended: false });

router.get("/user-list", function (req, res, next) {
  const sql = "SELECT * FROM users";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("user-list", { title: "User List", userData: data });
  });
});

router.post("/groupDelete", urlencodedParser, function (request, res, next) {
  let groupIds = request.body.childChb;
  let sql = "";
  if (typeof groupIds === "string") {
    sql = `DELETE FROM users WHERE id = ${groupIds} `;
  } else {
    sql = `DELETE FROM users WHERE id IN (${groupIds.join(",")}) `;
  }
  db.query(sql, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect("/users/user-list");
    }
  });
});

router.post("/groupBlock", urlencodedParser, function (request, res, next) {
  let groupIds = request.body.childChb;
  console.log(typeof groupIds);
  let sql = "";
  if (typeof groupIds === "string") {
    sql = `UPDATE users SET status=1 WHERE id = ${groupIds} `;
  } else {
    sql = `UPDATE users SET status=1 WHERE id IN (${groupIds.join(",")}) `;
  }
  db.query(sql, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect("/users/user-list");
    }
  });
});

router.post("/groupUnblock", urlencodedParser, function (request, res, next) {
  let groupIds = request.body.childChb;
  let sql = "";
  if (typeof groupIds === "string") {
    sql = `UPDATE users SET status=0 WHERE id = ${groupIds} `;
  } else {
    sql = `UPDATE users SET status=0 WHERE id IN (${groupIds.join(",")}) `;
  }
  db.query(sql, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect("/users/user-list");
    }
  });
});

module.exports = router;
