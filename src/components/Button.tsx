import React, { type FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "create" | "danger" | "back";
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

const variantMap = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-green-600 hover:bg-green-700 text-white",
  create: "bg-purple-600 text-white hover:bg-purple-700",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  back: "bg-gray-600 text-white hover:bg-gray-700",
};

const disabledClass = "bg-gray-300 text-gray-500 cursor-not-allowed";

const Button: FC<ButtonProps> = ({
  variant = "primary",
  icon,
  children,
  disabled = false,
  className = "",
  ...props
}) => (
  <button
    className={`rounded-lg px-4 py-2 flex items-center space-x-2 font-medium transition-colors disabled:opacity-50 ${
      disabled ? disabledClass : variantMap[variant]
    } ${className}`}
    disabled={disabled}
    {...props}
  >
    {icon && <span>{icon}</span>}
    <span>{children}</span>
  </button>
);

export default Button;
