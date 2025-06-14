import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BarChart3, Home, LoaderCircleIcon } from "lucide-react";

import NormalizationTableCard from "./NormalizationTableCard";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { useConfigContext } from "../../../context/ConfigProvider";

import { getStepStatus } from "../../../utils/stepStatus";

const NormalizationTable = () => {
  const navigate = useNavigate();
  const {
    setStep,
    setStepStatus,
    normalizationData,
    setNormalizationData,
    loading,
    setLoading,
    error,
    setError,
  } = useConfigContext();

  const loadNormalizationData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/normalization");
      setNormalizationData(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load survey");
    } finally {
      setLoading(false);
    }
  };

  const handleConfigComplete = () => {
    setStep("questions");
    setStepStatus({
      questions: "completed",
      subscale: "completed",
      normalization: "completed",
    });
    setLoading(false);
    setError(null);
    navigate("/");
  };

  const handleBack = () => {
    setStep("subscale");
    setStepStatus(getStepStatus("subscale", ["questions", "subscale"]));
  };

  useEffect(() => {
    loadNormalizationData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoaderCircleIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Configure Normalization Table
        </h2>
        <p className="text-gray-600">
          Set up the normalization data that will convert raw scores to
          normalized scores.
        </p>
      </div>

      <NormalizationTableCard />

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="back"
          icon={<BarChart3 className="w-4 h-4" />}
          onClick={handleBack}
        >
          Back to Subscale
        </Button>

        <Button
          variant="secondary"
          icon={<Home className="w-4 h-4" />}
          disabled={normalizationData.length === 0}
          onClick={handleConfigComplete}
        >
          {normalizationData.length > 0
            ? "Finish Setup"
            : "Please add normalization data"}
        </Button>
      </div>
    </div>
  );
};

export default NormalizationTable;
