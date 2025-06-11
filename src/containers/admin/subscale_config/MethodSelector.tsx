import { useConfigContext } from "../../../context/ConfigProvider";

import type { CalculationType } from "../../../types";

const MethodSelector = () => {
  const { subscaleConfig, setSubscaleConfig } = useConfigContext();

  const options = [
    {
      value: "sum",
      label: "Sum",
      description: "Add all question scores together",
    },
    {
      value: "average",
      label: "Average",
      description: "Calculate average of question scores",
    },
  ];

  const handleChange = (value: CalculationType) => {
    setSubscaleConfig((prev) => ({
      ...prev,
      calculation_type: value,
    }));
  };

  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 mb-3">Calculation Method</h4>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="relative cursor-pointer">
            <input
              type="radio"
              name="calculationMethod"
              value={opt.value}
              checked={subscaleConfig.calculation_type === opt.value}
              onChange={() => handleChange(opt.value as CalculationType)}
              className="sr-only"
            />
            <div
              className={`p-4 border-2 rounded-lg transition-colors ${
                subscaleConfig.calculation_type === opt.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <h5 className="font-medium text-gray-900">{opt.label}</h5>
              <p className="text-sm text-gray-600">{opt.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MethodSelector;
