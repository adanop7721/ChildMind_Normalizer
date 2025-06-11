import React, { type FC } from "react";

interface SelectionFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  containerClassName?: string;
}

const SelectionField: FC<SelectionFieldProps> = ({
  label,
  options,
  containerClassName = "",
  ...props
}) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectionField;
