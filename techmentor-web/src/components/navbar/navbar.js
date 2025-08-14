import React, { useState, useEffect, useContext, useRef } from "react";
import "./navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import Button from "../buttons/button";
import { AuthContext } from "../../contexts/authContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { authData, logout  } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/student") ||
    location.pathname.startsWith("/instructor");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDashboardClick = () => {
    navigate(`/${authData.userRole}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a
        href="/"
        onClick={() => window.location.reload()}
        className="logo-container"
      >
        <img src={logoImage} className="logo-image" alt="Tech Illustration" />
        <Link to="/" className="logo">
          TechMentor
        </Link>
      </a>

      <ul className="nav-links">
        <li>
          <a href="/" onClick={() => window.location.reload()}>
            Home
          </a>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <a href="#footer">Contact Us</a>
        </li>
      </ul>

      <div className="nav-right">
        {authData ? (
          <>
            {isDashboardRoute ? (
              <span className="greeting">Hi, <span className="username">{authData.userName}</span></span>
            ) : (
              <Button text="Go To Dashboard" onClick={handleDashboardClick} />
            )}

            <div className="user-dropdown" ref={dropdownRef}>
              <FaUserCircle
                className="nav-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <p className="username">{authData.userName}</p>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Button text="Login" link="/login" />
          </>
        )}
      </div>
    </nav>
  );
}
