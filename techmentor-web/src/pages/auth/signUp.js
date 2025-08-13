import { useState } from "react";
import { useLocation } from "react-router-dom";
import instructorImg from "../../assets/instructorSignUp.png";
import studentImg from "../../assets/studentSignUp.png";
import logo from "../../assets/logo.png";
import Button from "../../components/buttons/button";
import "./loginStyle.css";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";

export default function SignupPage() {
  const location = useLocation();
  const role = location.state || "student";

  const title =
    role === "instructor" ? "Sign Up as Instructor" : "Sign Up as Student";
  const img = role === "instructor" ? instructorImg : studentImg;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    username: false,
    password: false,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isEmpty = (val) => val.trim() === "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {
    fullName: touched.fullName && isEmpty(form.fullName),
    email:
      touched.email &&
      (isEmpty(form.email) || !emailRegex.test(form.email.trim())),
    phone: touched.phone && isEmpty(form.phone),
    username: touched.username && isEmpty(form.username),
    password: touched.password && isEmpty(form.password),
  };

  const isFormValid =
    !isEmpty(form.fullName) &&
    emailRegex.test(form.email.trim()) &&
    !isEmpty(form.phone) &&
    !isEmpty(form.username) &&
    !isEmpty(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    alert(
      `Sign up info:\nFull Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nUsername: ${form.username}`
    );
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
          <h2>{title}</h2>
          <p>Please enter your details to create your account.</p>

          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            className={errors.fullName ? "input-error" : ""}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <div className="error">Full Name cannot be empty</div>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={errors.email ? "input-error" : ""}
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="error">
              {form.email.trim() === ""
                ? "Email cannot be empty"
                : "Please enter a valid email"}
            </div>
          )}

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={errors.phone ? "input-error" : ""}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <div className="error">Phone Number cannot be empty</div>
          )}

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            onBlur={() => handleBlur("username")}
            className={errors.username ? "input-error" : ""}
            placeholder="Enter your username"
          />
          {errors.username && (
            <div className="error">Username cannot be empty</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            className={errors.password ? "input-error" : ""}
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="error">Password cannot be empty</div>
          )}

          <div className="button-container">
            <Button
              type="submit"
              text="Sign Up"
              size="large"
              variant="primary"
              disabled={!isFormValid}
            />
          </div>

          <p className="signup-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className="img">
        <img src={img} alt="Hero" />
      </div>
    </div>
  );
}
