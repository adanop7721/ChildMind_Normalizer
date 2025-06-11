import QuestionsSelector from "./QuestionsSelector";
import MethodSelector from "./MethodSelector";
import ConfigPreview from "./ConfigPreview";

const SubscaleConfigCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <QuestionsSelector />
      <MethodSelector />
      <ConfigPreview />
    </div>
  );
};

export default SubscaleConfigCard;
