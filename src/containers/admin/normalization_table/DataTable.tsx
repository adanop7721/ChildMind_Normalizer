import { useState, type ChangeEvent } from "react";
import axios from "axios";
import { Edit2, Save, Trash2, X } from "lucide-react";

import InputField from "../../../components/InputField";
import SelectionField from "../../../components/SelectionField";

import { useConfigContext } from "../../../context/ConfigProvider";
import type { NormalizationData } from "../../../types";
import ButtonIcon from "../../../components/ButtonIcon";

const tableHeaders = [
  "Age",
  "Gender",
  "Raw Score",
  "Normalized Score",
  "Actions",
];

const DataTable = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editEntry, setEditEntry] = useState<NormalizationData | null>(null);
  const { normalizationData, setNormalizationData, setError } =
    useConfigContext();

  const handleInputChange = (
    field: keyof NormalizationData,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) || 0 : e.target.value;
    setEditEntry((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : prev
    );
  };

  const handleSelectChange = (
    field: keyof NormalizationData,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setEditEntry((prev) =>
      prev
        ? {
            ...prev,
            [field]: e.target.value,
          }
        : prev
    );
  };

  const handleUpdate = async () => {
    if (!editingId || !editEntry) return;
    setError(null);
    try {
      const { id, ...body } = editEntry;
      const res = await axios.put(`/api/normalization/${editingId}`, body);
      setNormalizationData((prev) =>
        prev.map((n) => (n.id === editingId ? res.data : n))
      );
      setEditingId(null);
      setEditEntry(null);
    } catch (err: any) {
      setError(err.message || "Failed to update normalization data");
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await axios.delete(`/api/normalization/${id}`);
      console.log(`Deleted normalization entry with id: ${id}`);
      setNormalizationData((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete normalization data");
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const entryToEdit = normalizationData.find((entry) => entry.id === id);
    if (entryToEdit) {
      setEditEntry({ ...entryToEdit });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditEntry(null);
  };

  console.log("Normalization Data:", normalizationData);

  return (
    <div
      className={`overflow-x-auto ${
        normalizationData.length > 10 ? "max-h-[500px] overflow-y-auto" : ""
      }`}
    >
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {normalizationData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              {editingId === entry.id ? (
                <>
                  <td className="px-4 py-3 border-b">
                    <InputField
                      label="Age"
                      type="number"
                      value={editEntry?.age}
                      className="border border-gray-300 rounded px-2 py-1 w-16"
                      onChange={(e) => handleInputChange("age", e)}
                      min={1}
                      max={99}
                    />
                  </td>
                  <td className="px-4 py-3 border-b">
                    <SelectionField
                      label="Gender"
                      value={editEntry?.gender}
                      className="border border-gray-300 rounded px-2 py-1 w-20"
                      onChange={(e) => handleSelectChange("gender", e)}
                      options={[
                        { value: "M", label: "Male" },
                        { value: "F", label: "Female" },
                      ]}
                    />
                  </td>
                  <td className="px-4 py-3 border-b">
                    <InputField
                      label="Raw Score"
                      type="number"
                      value={editEntry?.raw_score}
                      className="border border-gray-300 rounded px-2 py-1 w-20"
                      onChange={(e) => handleInputChange("raw_score", e)}
                    />
                  </td>
                  <td className="px-4 py-3 border-b">
                    <InputField
                      label="Normalized Score"
                      type="number"
                      value={editEntry?.normalized_score}
                      className="border border-gray-300 rounded px-2 py-1 w-20"
                      onChange={(e) => handleInputChange("normalized_score", e)}
                    />
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <ButtonIcon
                        icon={<Save className="w-4 h-4" />}
                        color="green"
                        onClick={handleUpdate}
                        title="Save"
                      />
                      <ButtonIcon
                        icon={<X className="w-4 h-4" />}
                        color="gray"
                        onClick={handleCancelEdit}
                        title="Cancel"
                      />
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-3 border-b">
                    <span className="text-sm text-gray-900">{entry.age}</span>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <span className="text-sm text-gray-900">
                      {entry.gender === "M" ? "Male" : "Female"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <span className="text-sm text-gray-900">
                      {entry.raw_score}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <span className="text-sm text-gray-900">
                      {entry.normalized_score}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <ButtonIcon
                        icon={<Edit2 className="w-4 h-4" />}
                        color="yellow"
                        onClick={() => handleEdit(entry.id)}
                        title="Edit"
                      />
                      <ButtonIcon
                        icon={<Trash2 className="w-4 h-4" />}
                        color="red"
                        onClick={() => handleDelete(entry.id)}
                        title="Delete"
                      />
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
