import React from "react";
import Link from "next/link";

const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  outline:
    "bg-transparent border border-border text-foreground hover:bg-card/80 hover:border-primary/50",
  ghost: "bg-transparent text-foreground hover:bg-card/80",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonStyles = `${baseStyles} ${buttonVariants[variant]} ${sizeStyles[size]} ${className}`;

  const contentWithIcon = (
    <>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {contentWithIcon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${buttonStyles} hover:shadow-md active:scale-[0.98]`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {contentWithIcon}
    </button>
  );
};

export default Button;
