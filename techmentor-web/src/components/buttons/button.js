import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

export default function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  link,
  size = 'small',
  state = null
}) {
  const className = `btn btn-${variant} btn-${size}`;

  if (link) {
    return (
      <Link to={link} className={className} state={state}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
}
