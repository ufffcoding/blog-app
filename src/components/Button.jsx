import React from "react";

function Button({ children, className, button, ...props }) {
  return (
    <button type={button} className={`${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
