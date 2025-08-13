import React from "react";
import "./reviewCard.css";

export default function ReviewCard({ name, text }) {
  return (
    <div className="review-card">
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  );
}
