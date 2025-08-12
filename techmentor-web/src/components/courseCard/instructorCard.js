import React from 'react';
import "./studentCard.css";
import Button from '../buttons/button';

export default function InstructorCard({
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

            </div>

            {/* Right Section */}
            <div className="student-card__right">
                <p className={`student-card__status ${"enrolled"}`}>
                    {/* Edit and delete icons*/}
                    <span className="icon edit-icon">✏️</span>
                    <span className="icon delete-icon">🗑️</span>
                </p>
                <div className="student-card__button-wrapper">
                    <Button text="Enroll Students" />
                </div>

            </div>
        </div>

    );
}
