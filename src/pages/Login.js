import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import {
  mockAuthenticateUser,
  mockSetLoggedInUser,
} from "../mockAPIFunctions/mockUserFunctions";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  function handleSignIn(e) {
    e.preventDefault();
    const userIsValid = mockAuthenticateUser(email, password);
    if (userIsValid) {
      mockSetLoggedInUser(email);
      navigate("/");
    } else {
      setShowError(true);
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowError(false);
  };

  return (
    <div className="wrapper">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail-outline"></ion-icon>
            </span>
            <input
              type="email"
              required
              placeholder="Email Address"
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <input
              type="password"
              required
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          {showError && (
            <small className="p-error login-error">
              Email or password is wrong
            </small>
          )}
          <button type="submit" className="btn">
            Sign In
          </button>
          <div className="login-register">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="register-link">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
