import React from "react";
import "./testimonialCard.css";

export default function TestimonialCard({ name, text }) {
  return (
    <div className="testimonial-card">
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  );
}
