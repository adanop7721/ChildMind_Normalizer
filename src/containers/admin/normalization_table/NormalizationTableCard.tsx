import { useState } from "react";
import { Database, Plus } from "lucide-react";

import EntryForm from "./EntryForm";
import DataTable from "./DataTable";
import Button from "../../../components/Button";

import { useConfigContext } from "../../../context/ConfigProvider";

const NormalizationTableCard = () => {
  const { normalizationData } = useConfigContext();
  const [isCreating, setIsCreating] = useState(false);

  const onCancelCreate = () => {
    setIsCreating(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Normalization Table Manager
          </h3>
        </div>
        <Button
          variant="create"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsCreating(true)}
        >
          Add Entry
        </Button>
      </div>

      {isCreating && <EntryForm onCancelCreate={onCancelCreate} />}

      {normalizationData.length === 0 ? (
        <div className="text-center py-8">
          <Database className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">
            No normalization data found for this survey.
          </p>
          <p className="text-sm text-gray-500">
            Add entries to define how raw scores map to normalized scores.
          </p>
        </div>
      ) : (
        <DataTable />
      )}
    </div>
  );
};

export default NormalizationTableCard;
