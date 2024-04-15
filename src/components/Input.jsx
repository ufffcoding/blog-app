import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, labelClass, type = "text", placeholder, className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className={`inline-block mb-1 pl-1 ${labelClass}`} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        placeholder={placeholder}
        className={` ${className}`}
      />
    </div>
  );
});

export default Input;
