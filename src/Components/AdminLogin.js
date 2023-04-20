import React, { useState } from "react";
import "./style/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { obj } from "./../URL";

function AdminLoginPage(props) {
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
      // CALL ADMIN LOGIN API
      const response = await fetch(`${obj.url}/api/users/adminLogin`, {
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

      // CHECK IF STATUS IS SUCCESSFUL OR NOT
      if (data.status == "Fail") {
        alert(data.data);
      } else {
        navigate("/adminHome", { replace: true, state: { loggedIn: true } });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleFormSubmit} className="form-container">
        <div className="heading">Admin Login</div>

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
        <Link to="/" className="Link-class">
          login as user
        </Link>
      </form>
    </div>
  );
}

export default AdminLoginPage;
