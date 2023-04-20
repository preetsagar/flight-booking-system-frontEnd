import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/SignUp.css";
import { obj } from "./../URL";

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // CALL LOGIN API
      const response = await fetch(`http://${obj.url}/api/users/signUp`, {
        method: "POST",
        body: JSON.stringify({
          name,
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
    <div className="signUP-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="heading">Sign Up</div>

        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="name" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>

        <Link to="/" className="Link-class">
          login
        </Link>
      </form>
    </div>
  );
}

export default Signup;
