import React from "react";
import "./roleCard.css";
import Button from "../buttons/button";

export default function StudentRoleCard({
  title,
  description,
  buttonText,
  img,
  btnClass,
}) {
  return (
    <div className="role-card">
      <div className="role-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <Button text={buttonText} link="#" size="large" variant="secondary"/>
      </div>
      <div className="role-img">
        <img src={img} alt={title} />
      </div>
    </div>
  );
}
