import React from "react";

function Button({ children, className, button }) {
  return (
    <button type={button} className={`${className}`}>
      {children}
    </button>
  );
}

export default Button;
