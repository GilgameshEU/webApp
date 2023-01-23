const express = require("express");
const router = express.Router();
const db = require("../config/database");
const urlencodedParser = express.urlencoded({ extended: false });

//const { loginStatus, setLoginStatus } = require("../../frontend/src/app");

// import express from "express";
// const router = express.Router();
// import db from "../config/database";
// const urlencodedParser = express.urlencoded({ extended: false });

// import { loginStatus } from "./app";

// router.get("/user-list", function (req, res, next) {
//   const sql = "SELECT * FROM users";
//   db.query(sql, function (err, data, fields) {
//     if (err) throw err;
//     res.render("user-list", { title: "User List", userData: data });
//   });
// });

router.get("/user-list", function (req, res, next) {
  const sql = "SELECT * FROM users WHERE loginIn = true LIMIT 1";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      const sql = "SELECT * FROM users";
      db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render("user-list", { title: "User List", userData: data });
      });
    } else res.render("error", { title: "Error", message: "No logged in user found" });
  });
});

// router.post("/groupDelete", urlencodedParser, function (request, res, next) {
//   let groupIds = request.body.childChb;
//   let sql = "";
//   db.query("SELECT id FROM users WHERE loginIn = true", function (err, currentUser) {
//     if (err) {
//       throw err;
//     } else {
//       let currentUserId = currentUser[0].id;
//       if (typeof groupIds === "string") {
//         if (groupIds === currentUserId) {
//           logout(req, res);
//         } else {
//           sql = `DELETE FROM users WHERE id = ${groupIds} `;
//         }
//       } else {
//         if (groupIds.includes(currentUserId)) {
//           logout(req, res);
//         } else {
//           sql = `DELETE FROM users WHERE id IN (${groupIds.join(",")}) `;
//         }
//       }
//       db.query(sql, function (err, data) {
//         if (err) {
//           throw err;
//         } else {
//           res.redirect("/users/user-list");
//         }
//       });
//     }
//   });
// });

router.post("/groupDelete", urlencodedParser, function (request, res, next) {
  let groupIds = request.body.childChb;
  let sql = "";
  db.query("SELECT id FROM users WHERE loginIn = true", function (err, currentUser) {
    if (err) {
      throw err;
    } else {
      let currentUserId = currentUser[0].id;
      if (typeof groupIds === "string") {
        if (groupIds === currentUserId) {
          logout(req, res);
        } else {
          sql = `DELETE FROM users WHERE id = ${groupIds} `;
        }
      } else {
        if (groupIds.includes(currentUserId)) {
          logout(req, res);
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
          logout(req, res);
        } else {
          sql = `UPDATE users SET status=1 WHERE id = ${groupIds} `;
        }
      } else {
        if (groupIds.includes(currentUserId)) {
          logout(req, res);
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

// router.post("/groupBlock", urlencodedParser, function (request, res, next) {
//   let groupIds = request.body.childChb;
//   let sql = "";
//   if (typeof groupIds === "string") {
//     sql = `UPDATE users SET status=1 WHERE id = ${groupIds} `;
//   } else {
//     sql = `UPDATE users SET status=1 WHERE id IN (${groupIds.join(",")}) `;
//   }
//   db.query(sql, function (err, data) {
//     if (err) {
//       throw err;
//     } else {
//       res.redirect("/users/user-list");
//     }
//   });
// });

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
