import React from "react";
import "./skillsSection.css";

export default function SkillsSection({ skills }) {
  return (
    <section className="skills-section">
      <h1>What We Offer</h1>
      <div className="skills-content">
        <div className="skills-icons">
          {[...skills, ...skills].map((icon, i) => (
            <img key={i} src={icon} alt="Skill" />
          ))}
        </div>
      </div>
    </section>
  );
}
