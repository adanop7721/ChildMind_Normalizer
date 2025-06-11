import React, { type FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantMap = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

const Button: FC<ButtonProps> = ({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}) => (
  <button
    className={`rounded-lg px-4 py-2 flex items-center space-x-2 font-medium transition-colors disabled:opacity-50 ${variantMap[variant]} ${className}`}
    {...props}
  >
    {icon && <span>{icon}</span>}
    <span>{children}</span>
  </button>
);

export default Button;
