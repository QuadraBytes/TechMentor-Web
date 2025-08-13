import { useState } from "react";
import heroImg from "../../assets/hero.png";
import logo from "../../assets/logo.png";
import Button from "../../components/buttons/button";
import "./loginStyle.css";
import { Link } from "react-router-dom";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ username: false, password: false });

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const usernameError = touched.username && username.trim() === "";
  const passwordError = touched.password && password.trim() === "";
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    alert(`Logging in with Username: ${username}`);
  };

  return (
    <div className="login-page">
      <img className="logincircle1" src={circle1} alt="Circle 1" />
      <img className="logincircle2" src={circle2} alt="Circle 2" />
      <div className="card">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h2>TechMentor</h2>
        </div>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <h2>Log In</h2>
          <p>Please enter your credentials to access your account.</p>

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleBlur("username")}
            className={usernameError ? "input-error" : ""}
            placeholder="Enter your username"
          />
          {usernameError && (
            <div className="error">Username cannot be empty</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            className={passwordError ? "input-error" : ""}
            placeholder="Enter your password"
          />
          {passwordError && (
            <div className="error">Password cannot be empty</div>
          )}

          <div className="button-container">
            <Button
              type="submit"
              text="Log In"
              size="large"
              variant="primary"
              disabled={!isFormValid}
            />
          </div>

          <p className="signup-text">
            Don't have an account? <Link to="/">Go Back</Link>
          </p>
        </form>
      </div>
      <div className="img">
        <img src={heroImg} alt="Hero" />
      </div>
    </div>
  );
}
