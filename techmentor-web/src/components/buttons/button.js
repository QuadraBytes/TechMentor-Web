import React from "react";
import "./button.css";

export default function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  link,
  size = 'small'
}) {
  const className = `btn btn-${variant} btn-${size}`;

  if (link) {
    return (
      <a href={link} className={className} onClick={onClick}>
        {text}
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
}
