import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "./Components/AdminLogin";
import LoginPage from "./Components/Login";
import Signup from "./Components/SignUp";
import UserHome from "./Components/UserHome";
import { useState } from "react";
import AdminHome from "./Components/AdminHome";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage setToken={setToken} setUser={setUser} />} />
        <Route path="/adminLogin" element={<AdminLoginPage setToken={setToken} setUser={setUser} />} />
        <Route path="/signIn" element={<Signup setToken={setToken} setUser={setUser} />} />
        <Route path="/users">
          <Route index element={<UserHome />} />
        </Route>
        <Route path="/adminHome" element={<AdminHome />} />
      </Routes>
    </>
  );
}

export default App;
