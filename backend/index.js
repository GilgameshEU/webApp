const express = require("express");
//const mysql=require("mysql2")
const db = require("./config/database.js");
const cors = require("cors");
const port = process.env.PORT || 3001;
const { response } = require("express");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const moment = require("moment");
const now = moment().format("DD/MM/YYYY HH:mm:ss A");

const app = express();

const usersRouter = require("./routes/users");

const path = require("path");

const router = express.Router();

//app.set('views', './views');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
//app.use(cors());

//app.use('/', nodeRoutes)
app.use("/users", usersRouter);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    key: "userId",
    secret: "userLogin",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 24 * 60 * 60 * 1000,
    },
  })
);

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const mail = req.body.mail;
  db.query("SELECT COUNT(*) as count FROM users WHERE username = ? OR mail = ?", [username, mail], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error checking user");
    } else {
      if (result[0].count != 0) {
        res.send({ message: "User already exist" });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
            res.send({ message: "Error hashing password" });
          } else {
            db.query("INSERT INTO users (username,password,mail,createdAt) VALUES (?,?,?,?)", [username, hash, mail, now], (err, result) => {
              if (err) {
                console.log(err);
                res.send({ message: "Error creating user" });
              } else {
                res.send({ message: "User created" });
              }
            });
          }
        });
      }
    }
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query("SELECT * FROM users WHERE username = ?;", username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
          // console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
  db.query("UPDATE users SET lastLogin=? WHERE username = ?;", [now, username], (err, result) => {
    console.log(err);
  });
});

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
