import React, { type FC } from "react";

interface Feature {
  icon: React.ReactNode;
  label: string;
}

interface HomeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: Feature[];
  buttonText: string;
  color: "red" | "green" | "blue";
  onClick: () => void;
}

const colorMap = {
  red: {
    border: "hover:border-blue-200",
    bg: "bg-red-100",
    icon: "text-red-600",
    button: "bg-red-600 hover:bg-red-700",
  },
  green: {
    border: "hover:border-green-200",
    bg: "bg-green-100",
    icon: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
  },
  blue: {
    border: "hover:border-blue-200",
    bg: "bg-blue-100",
    icon: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
  },
};

const HomeCard: FC<HomeCardProps> = ({
  icon,
  title,
  description,
  features,
  buttonText,
  color,
  onClick,
}) => {
  const colors = colorMap[color];

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent ${colors.border} flex flex-col h-full`}
    >
      <div className="text-center flex-grow">
        <div
          className={`${colors.bg} ${colors.icon} rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center `}
        >
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center space-x-2"
            >
              {feature.icon}
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`mt-6 w-full text-white py-3 px-6 rounded-lg transition-colors font-medium ${colors.button} cursor-pointer`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HomeCard;
