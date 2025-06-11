import React from "react";

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  color?: "default" | "yellow" | "red" | "green" | "gray";
  title?: string;
}

const colorMap: Record<string, string> = {
  default: "text-gray-600 hover:text-gray-800",
  yellow: "text-yellow-600 hover:text-yellow-700",
  red: "text-red-600 hover:text-red-700",
  green: "text-green-600 hover:text-green-700",
  gray: "text-gray-600 hover:text-gray-700",
};

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  color = "default",
  title,
  className = "",
  ...props
}) => (
  <button
    type="button"
    className={`p-1 rounded transition-colors focus:outline-none ${colorMap[color]} ${className}`}
    title={title}
    {...props}
  >
    {icon}
  </button>
);

export default ButtonIcon;
