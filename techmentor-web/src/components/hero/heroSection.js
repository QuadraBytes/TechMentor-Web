import React from "react";
import "./heroSection.css";
import heroImg from "../../assets/hero.png";
import Button from "../buttons/button";
import studentImage from "../../assets/student.png";
import heroImage from "../../assets/hero-illustration.jpg";

export default function HeroSection() {
  const handleClick = () => {
    const roleSection = document.getElementById("role-section");
    if (roleSection) {
      roleSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Empowering Tech Learning, <br />
            <span className="highlight">One Course at a Time</span>
          </h1>
        </div>
        <Button
          text="Get Started"
          variant="secondary"
          size="large"
          onClick={handleClick}
        />
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Tech Illustration" />
      </div>
    </section>
  );
}
