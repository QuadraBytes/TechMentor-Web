import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instructorImg from "../../assets/instructorSignUp.png";
import studentImg from "../../assets/studentSignUp.png";
import logo from "../../assets/logo.png";
import Button from "../../components/buttons/button";
import "./loginStyle.css";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";
import { useRegister, useGoogleSignIn } from "../../hooks/useAuthApi";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SignupPage() {
  const navigation = useNavigate();
  const location = useLocation();
  const role = location.state || "student";

  const title =
    role === "instructor" ? "Sign Up as Instructor" : "Sign Up as Student";
  const img = role === "instructor" ? instructorImg : studentImg;

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    fullname: false,
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
    fullname: touched.fullname && isEmpty(form.fullname),
    email:
      touched.email &&
      (isEmpty(form.email) || !emailRegex.test(form.email.trim())),
    phone: touched.phone && isEmpty(form.phone),
    username: touched.username && isEmpty(form.username),
    password: touched.password && isEmpty(form.password),
  };

  const isFormValid =
    !isEmpty(form.fullname) &&
    emailRegex.test(form.email.trim()) &&
    !isEmpty(form.phone) &&
    !isEmpty(form.username) &&
    !isEmpty(form.password);

  const handleSuccess = () => {
    console.log("Registration successful");
    window.alert("Registration Successful! You can now sign in.");
    navigation("/login");
  };

  const handleGoogleSuccess = () => {
    console.log("Google Sign-In successful");
    window.alert("Google Sign-In Successful! You can now access your account.");
    if (role === "student") {
      navigation("/student");
    } else if (role === "instructor") {
      navigation("/instructor");
    }
  };

  const handleError = () => {
    console.log("Registration failed");
    window.alert("Registration Failed! Please try again.");
  };

  const { mutate, status } = useRegister(handleSuccess, handleError);
  const { mutate: googleLogin } = useGoogleSignIn(
    handleGoogleSuccess,
    handleError
  );

  const handleGoogleSignIn = (name, email) => {
    googleLogin({
      name,
      email,
      role,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    mutate({
      ...form,
      role: role,
    });
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

          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            type="text"
            value={form.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
            onBlur={() => handleBlur("fullname")}
            className={errors.fullname ? "input-error" : ""}
            placeholder="Enter your full name"
          />
          {errors.fullname && (
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
            {status === "pending" ? (
              <Button
                type="button"
                text="Signing Up..."
                size="large"
                variant="secondary"
                disabled
              />
            ) : (
              <Button
                type="submit"
                text="Sign Up"
                size="large"
                variant="primary"
                disabled={!isFormValid}
              />
            )}
          </div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);

                handleGoogleSignIn(decoded.name, decoded.email);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
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
