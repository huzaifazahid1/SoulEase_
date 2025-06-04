import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      error,
      helperText,
      className = "",
      labelClassName = "",
      inputClassName = "",
      prefixIcon,
      suffixIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`form-group ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className={`label font-medium text-foreground mb-1.5 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative group">
          {prefixIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none group-focus-within:text-primary transition-colors duration-200">
              {prefixIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            className={`
            input bg-card text-foreground
            ${prefixIcon ? "pl-10" : ""}
            ${suffixIcon ? "pr-10" : ""}
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:border-primary"
            }
            shadow-sm hover:border-primary/30 focus:ring-2 focus:ring-primary/20 
            transition-all duration-200 ease-in-out
            rounded-lg
            ${inputClassName}
          `}
            {...props}
          />

          {suffixIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none group-focus-within:text-primary transition-colors duration-200">
              {suffixIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={`mt-2 text-xs ${
              error ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
