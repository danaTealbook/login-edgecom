import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { mockAddUser } from "../mockAPIFunctions/mockUserFunctions";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
    } else {
      const addUser = mockAddUser(email, password);
      if (addUser === 1) {
        alert(
          "You have successfully registered. You will be redirected to the login page",
        );
        navigate("/login");
      } else if (addUser === 0) {
        setError("User already exists");
      }
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setError("");
  }

  function handlePasswordConfirmationChange(e) {
    setPasswordConfirmation(e.target.value);
    setError("");
  }

  return (
    <div>
      <div className="wrapper">
        <div className="form-box register">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
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
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed-outline"></ion-icon>
              </span>
              <input
                type="password"
                required
                placeholder="Confirmation"
                onChange={handlePasswordConfirmationChange}
              />
            </div>
            {error && <small className="p-error login-error">{error}</small>}
            <button type="submit" className="btn">
              Sign Up
            </button>
            <div className="login-register">
              <p>
                Already have an account?{" "}
                <a href="/login" className="register-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
