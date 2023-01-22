/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [mailReg, setMailReg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
      mail: mailReg,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    // <section class="vh-100 gradient-custom">
    //   <div class="container py-5 h-100">
    //     <div class="row d-flex justify-content-center align-items-center h-100">
    //       <div class="col-12 col-md-8 col-lg-6 col-xl-5">
    //         <div class="card-body p-5 text-center">
    //           <div class="mb-md-5 mt-md-4 pb-5">
    <div className="App">
      <h1>{loginStatus}</h1>
      <div className="registration">
        <h2>Registration</h2>
        <label
          className="label label-primary"
          htmlFor="inputypePasswordX">
          Username
        </label>
        <input
          type="text"
          id="typePasswordX"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>Mail</label>
        <input
          type="text"
          onChange={(e) => {
            setMailReg(e.target.value);
          }}
        />
        <button
          onClick={register}
          className="btn btn-primary">
          Register
        </button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={login}
          className="btn btn-primary">
          Login
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            window.location.href = "http://localhost:3001/users/user-list";
          }}
          className="btn btn-primary">
          user-list
        </button>
      </div>

      <iframe
        src="http://localhost:3001/users/user-list"
        width="100%"
        height="1200px"
        id="iframeUsers"></iframe>
    </div>
    // </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default App;
