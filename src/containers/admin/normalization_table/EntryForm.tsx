import { useState, type ChangeEvent, type FC } from "react";
import axios from "axios";
import { Save, X } from "lucide-react";

import InputField from "../../../components/InputField";
import SelectionField from "../../../components/SelectionField";
import Button from "../../../components/Button";

import { useConfigContext } from "../../../context/ConfigProvider";
import type { NormalizationData } from "../../../types";

interface EntryFormProps {
  onCancelCreate: () => void;
}

const EntryForm: FC<EntryFormProps> = ({ onCancelCreate }) => {
  const [newEntry, setNewEntry] = useState<NormalizationData>({
    id: Date.now(),
    age: 17,
    gender: "M",
    raw_score: 14,
    normalized_score: 37,
  });

  const { setNormalizationData, setError } = useConfigContext();

  const handleSaveNewEntry = async () => {
    try {
      const res = await axios.post("/api/normalization", newEntry);
      setNormalizationData(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load normalization data");
    }
  };

  const handleInputChange = (
    field: keyof NormalizationData,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) || 0 : e.target.value;
    setNewEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectChange = (
    field: keyof NormalizationData,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setNewEntry((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
      <h4 className="font-medium text-gray-900 mb-3">
        Add New Normalization Entry
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <InputField
          label="Age"
          type="number"
          value={newEntry.age}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          onChange={(e) => handleInputChange("age", e)}
          min={1}
          max={99}
        />
        <SelectionField
          label="Gender"
          value={newEntry.gender}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          onChange={(e) => handleSelectChange("gender", e)}
          options={[
            { value: "M", label: "Male" },
            { value: "F", label: "Female" },
          ]}
        />
        <InputField
          label="Raw Score"
          type="number"
          value={newEntry.raw_score}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          onChange={(e) => handleInputChange("raw_score", e)}
        />
        <InputField
          label="Normalized Score"
          type="number"
          value={newEntry.normalized_score}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          onChange={(e) => handleInputChange("normalized_score", e)}
        />
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <Button
          variant="back"
          icon={<X className="w-4 h-4" />}
          onClick={onCancelCreate}
        >
          Cancel
        </Button>
        <Button
          variant="create"
          icon={<Save className="w-4 h-4" />}
          onClick={handleSaveNewEntry}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default EntryForm;
