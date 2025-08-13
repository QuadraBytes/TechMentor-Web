import React from "react";
import "./footer.css";
import {
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <h1>TechMentor</h1>
      <div className="footer-content">
        <div className="footer-links">
          <h3 className="link-title">Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </div>
        <div className="contact-form">
          <h3 className="contact-title">Contact Us</h3>
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message" rows={3} />
          <button>Send</button>
        </div>
      </div>
      <div className="social-icons">
        <FaYoutube />
        <FaFacebookF />
        <FaLinkedinIn />
        <FaInstagram />
      </div>
    </footer>
  );
}
