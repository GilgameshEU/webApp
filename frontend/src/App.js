/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [mailReg, setMailReg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [logoutStatus, setLogoutStatus] = useState("");

  Axios.defaults.withCredentials = true;
  //"http://localhost:3001/login"
  const login = () => {
    Axios.post("https://my-sql-deploy.herokuapp.com/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  const register = () => {
    Axios.post("https://my-sql-deploy.herokuapp.com/register", {
      username: usernameReg,
      password: passwordReg,
      mail: mailReg,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  const logout = () => {
    Axios.post("https://my-sql-deploy.herokuapp.com/logout", {
      username: username,
    }).then((response) => {
      if (response.data.message) {
        setLogoutStatus(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setLogoutStatus("Successfully logged out");
      }
    });
  };

  useEffect(() => {
    Axios.get("https://my-sql-deploy.herokuapp.com/login").then((response) => {
      if (response.data.loggedIn !== 0) {
        setLoginStatus(response.data.user[0].username);
      } else {
        setLoginStatus("");
      }
    });
  }, []);

  return (
    <div className="App container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center text-primary">Registration</h2>
          <form>
            <div className="form-group">
              <label
                htmlFor="username"
                className="text-secondary">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="text-secondary">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="mail"
                className="text-secondary">
                Mail
              </label>
              <input
                type="email"
                className="form-control"
                id="mail"
                name="mail"
                onChange={(e) => {
                  setMailReg(e.target.value);
                }}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={register}>
              Register
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="inputUsername">Username</label>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </form>
          <button
            className="btn btn-primary mr-2"
            onClick={login}>
            Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={logout}>
            Exit
          </button>
        </div>
      </div>
      <h1 className="text-center">
        {loginStatus} {logoutStatus}
      </h1>
      <iframe
        src="https://my-sql-deploy.herokuapp.com/users/user-list"
        width="100%"
        height="1200px"
        id="iframeUsers"></iframe>
    </div>
  );
}

export default App;
