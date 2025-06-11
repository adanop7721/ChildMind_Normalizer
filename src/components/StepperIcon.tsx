import React, { type FC } from "react";

interface StepperIconProps {
  icon: React.ReactNode;
  label: string;
  disabled: boolean;
  textClass: string;
  borderClass: string;
  bgClass: string;
  onClick: () => void;
}

const StepperIcon: FC<StepperIconProps> = ({
  icon,
  label,
  disabled,
  textClass,
  borderClass,
  bgClass,
  onClick,
}) => (
  <div
    className={`flex items-center space-x-2 cursor-pointer ${textClass} ${
      disabled ? "opacity-50 pointer-events-none" : ""
    }`}
    onClick={() => {
      if (!disabled) onClick();
    }}
  >
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${borderClass} ${bgClass}`}
    >
      {icon}
    </div>
    <span className="font-medium">{label}</span>
  </div>
);

export default StepperIcon;
