import React from 'react';
import "./style.css";
import Button from '../buttons/button';
import { MdEdit, MdDelete } from "react-icons/md";

export default function InstructorCard({ title, description, onClick, onEdit, onDelete }) {
  return (
    <div className="student-card">
      <div className="student-card__left">
        <h3 className="student-card__title">{title}</h3>
        <p className="student-card__description">{description}</p>
      </div>

      <div className="student-card__right">
        <p className="student-card__status">
          <button className="icon" onClick={onEdit}>
            <MdEdit />
          </button>
          <button className="icon" onClick={onDelete}>
            <MdDelete />
          </button>
        </p>
        <div className="student-card__button-wrapper">
          <Button text="Enrolled Students" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
