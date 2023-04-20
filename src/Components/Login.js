import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/LoginPage.css";
import { obj } from "./../URL";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      // CALL LOGIN API
      const response = await fetch(`http://${obj.url}/api/users/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();

      // SET TOKEN AND USER
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.data.name);
      localStorage.setItem("userEmail", data.data.email);

      // props.setToken(data.token);
      // props.setUser(data.data);

      // CHECK IF STATUS IS SUCCESSFUL OR NOT
      if (data.status == "Fail") {
        alert(data.data);
      } else {
        navigate("/users", { replace: true, state: { loggedIn: true } });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleFormSubmit} className="form-container">
        <div className="heading">User Login</div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>

        <button type="submit" className="button-common">
          Login
        </button>

        <Link to="/signIn" className="Link-class">
          Sign In
        </Link>

        <Link to="/adminLogin" className="Link-class">
          login as admin
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
