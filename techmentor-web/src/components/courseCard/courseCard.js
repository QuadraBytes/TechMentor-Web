import React from "react";
import "./courseCardStyle.css";
import Button from "../buttons/button";

export default function CourseCard({
  title,
  description,
  instructor,
  isEnrolled,
  onClick,
}) {
  return (
    <div className="course-card">
      <p
        className={`course-card__status ${
          isEnrolled ? "enrolled" : "not-enrolled"
        }`}
      >
        {isEnrolled ? "Enrolled" : "Not Enrolled"}
      </p>
      <div className="course-card__left">
        <h2 className="course-card__title">{title}</h2>
        <p className="course-card__instructor">
          <strong>Instructor:</strong> {instructor}
        </p>
        <p className="course-card__description">{description}</p>
      </div>
      <div className="course-card__button-wrapper">
        <Button text="View Course" variant="secondary" onClick={onClick} />
      </div>
    </div>
  );
}
