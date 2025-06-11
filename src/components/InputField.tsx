import type { FC } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

const InputField: FC<InputFieldProps> = ({
  label,
  containerClassName = "",
  ...props
}) => (
  <div className={containerClassName}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input {...props} />
  </div>
);

export default InputField;
