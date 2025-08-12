import React from 'react';
import "./studentCard.css";
import Button from '../buttons/button';

export default function StudentCard({
    title,
    description,
    instructor,
    isEnrolled
}) {
    return (
        <div className="student-card">
            {/* Left Section */}
            <div className="student-card__left">
                <h2 className="student-card__title">{title}</h2>
                <p className="student-card__description">{description}</p>
                <p className="student-card__instructor">
                    <strong>Instructor:</strong> {instructor}
                </p>
            </div>

            {/* Right Section */}
            <div className="student-card__right">
                <p className={`student-card__status ${isEnrolled ? "enrolled" : "not-enrolled"}`}>
                    {isEnrolled ? "Enrolled" : "Not Enrolled"}
                </p>
                <div className="student-card__button-wrapper">
                    {isEnrolled ? (
                        <Button text="Go to Course" />
                    ) : (
                        <Button text="Enroll Now" />
                    )}
                </div>
            </div>
        </div>

    );
}
