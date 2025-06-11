import { type FC } from "react";

interface RadioOptionProps {
  name: string;
  value: number | string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioField: FC<RadioOptionProps> = ({
  name,
  value,
  checked,
  label,
  onChange,
}) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

export default RadioField;
