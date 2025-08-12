import React from "react";
import "./roleCard.css";
import Button from "../buttons/button";

export default function InstructorRoleCard({
  title,
  description,
  buttonText,
  img,
  btnClass,
}) {
  return (
    <div className="role-card">
      <div className="role-img">
        <img src={img} alt={title} />
      </div>
      <div className="role-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <Button text={buttonText} link="#" size="large" variant="primary" />
      </div>
    </div>
  );
}
