import React, {
    type FC,
    type ButtonHTMLAttributes,
    type AnchorHTMLAttributes,
  } from "react";
  import Link from "next/link";
  
  type ButtonOrAnchorProps = ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>;
  
  interface ButtonProps extends ButtonOrAnchorProps {
    variant?: "primary" | "secondary-gray" | "tertiary-gray";
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    href?: string;
  }
  
  const Button: FC<ButtonProps> = ({
    onClick,
    variant = "primary",
    size = "md",
    disabled,
    className = "",
  
    href,
    ...props
  }) => {
    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-2 py-1 text-sm",
      lg: "px-2.5 py-1.5 text-sm",
      xl: "px-3 py-2 text-sm",
      "2xl": "px-3.5 py-2.5 text-sm",
    };
  
    const variantClasses = {
      primary:
        "bg-primary-900 text-black hover:bg-neutral-300 shadow-sm focus:ring-primary-100 focus-visible:outline-4 focus-visible:outline-primary-100 focus-visible:outline-offset-4",
      "secondary-gray":
        "bg-neutral-700 text-white shadow-sm focus-visible:outline-4 focus-visible:outline-gray-700 focus-visible:outline-offset-4  hover:text-neutral-300 hover:bg-neutral-600",
      "tertiary-gray":
        "text-gray-600 focus:bg-white hover:text-gray-200",
    };
  
    const buttonClasses = [
      className,
  
      "font-semibold",
      "rounded-full",
      sizeClasses[size],
      variantClasses[variant],
      disabled ? "opacity-50 cursor-not-allowed" : "",
    ]
      .filter(Boolean)
      .join(" ");
  
    const commonProps = {
      onClick,
      className: buttonClasses,
      ...props,
    };
  
    return href ? (
      <Link href={href} {...commonProps} />
    ) : (
      <button {...commonProps} />
    );
  };
  
  export default Button;