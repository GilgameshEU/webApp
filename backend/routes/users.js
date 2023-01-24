const express = require("express");
const router = express.Router();
const db = require("../config/database");
const urlencodedParser = express.urlencoded({ extended: false });

router.get("/user-list", function (req, res, next) {
  const sql = "SELECT * FROM users WHERE loginIn = true LIMIT 1";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      if (data[0].status === 1) {
        res.render("error", { title: "Error", message: "You do not have permission to view this page" });
      } else {
        const sql = "SELECT * FROM users";
        db.query(sql, function (err, data, fields) {
          if (err) throw err;
          res.render("user-list", { title: "User List", userData: data });
        });
      }
    } else {
      res.render("error", { title: "Error", message: "No logged in user found" });
    }
  });
});

router.post("/groupDelete", urlencodedParser, function (req, res, next) {
  let groupIds = req.body.childChb;
  let sql = "";
  db.query("SELECT id FROM users WHERE loginIn = true", function (err, currentUser) {
    if (err) {
      throw err;
    } else {
      let currentUserId = currentUser[0].id;
      if (typeof groupIds === "string") {
        if (groupIds === currentUserId) {
        } else {
          sql = `DELETE FROM users WHERE id = ${groupIds} `;
        }
      } else {
        if (groupIds.includes(currentUserId)) {
        } else {
          sql = `DELETE FROM users WHERE id IN (${groupIds.join(",")}) `;
        }
      }
      db.query(sql, function (err, data) {
        if (err) {
          throw err;
        } else {
          res.redirect("/users/user-list");
        }
      });
    }
  });
});

router.post("/groupBlock", urlencodedParser, function (request, res, next) {
  let groupIds = request.body.childChb;
  let sql = "";
  db.query("SELECT id FROM users WHERE loginIn = true", function (err, currentUser) {
    if (err) {
      throw err;
    } else {
      let currentUserId = currentUser[0].id;
      if (typeof groupIds === "string") {
        if (groupIds === currentUserId) {
        } else {
          sql = `UPDATE users SET status=1 WHERE id = ${groupIds} `;
        }
      } else {
        if (groupIds.includes(currentUserId)) {
        } else {
          sql = `UPDATE users SET status=1 WHERE id IN (${groupIds.join(",")}) `;
        }
      }
      db.query(sql, function (err, data) {
        if (err) {
          throw err;
        } else {
          res.redirect("/users/user-list");
        }
      });
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
