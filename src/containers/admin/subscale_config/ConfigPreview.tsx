import { useConfigContext } from "../../../context/ConfigProvider";
import { getScoreRange } from "../../../utils/scoreRange";

const ConfigPreview = () => {
  const { survey, subscaleConfig } = useConfigContext();
  const { min, max, label } = getScoreRange(
    survey,
    subscaleConfig.question_ids,
    subscaleConfig.calculation_type
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h4 className="font-medium text-gray-900 mb-1">Questions Selected</h4>
        <p className="text-2xl font-bold text-blue-600">
          {subscaleConfig.question_ids.length}
        </p>
        <p className="text-sm text-gray-600">of {survey.length || 0} total</p>
      </div>

      <div className="text-center">
        <h4 className="font-medium text-gray-900 mb-1">Calculation</h4>
        <p className="text-lg font-semibold text-green-600 capitalize">
          {subscaleConfig.calculation_type}
        </p>
      </div>

      <div className="text-center">
        <h4 className="font-medium text-gray-900 mb-1">Score Range</h4>
        <p className="text-lg font-semibold text-purple-600">
          {min} - {max}
        </p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default ConfigPreview;
