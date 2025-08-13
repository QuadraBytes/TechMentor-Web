import React from "react";
import "./style.css";
import Button from "../buttons/button";

export default function StudentCard({
  title,
  description,
  instructor,
  isEnrolled,
  onClick
}) {
  return (
    <div className="student-card">
      <div className="student-card__left">
        <h3 className="student-card__title">{title}</h3>
        <p className="student-card__instructor">
          <strong>Instructor:</strong> {instructor}
        </p>
      </div>

      <div className="student-card__right">
        <div className="student-card__button-wrapper">
          <Button text="View Course" variant="secondary" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
