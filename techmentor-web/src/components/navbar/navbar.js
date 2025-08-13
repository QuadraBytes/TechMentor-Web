import React, { useState, useEffect } from "react";
import "./navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import Button from "../buttons/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-container">
        <img src={logoImage} className="logo-image" alt="Tech Illustration" />
        <Link to="/" className="logo">
          TechMentor
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/instructor">Instructor</Link>
        </li>
      </ul>

      <div className="nav-right">
        <Button text="Login" link="/login" />
        <FaUserCircle className="nav-icon" />
      </div>
    </nav>
  );
}
