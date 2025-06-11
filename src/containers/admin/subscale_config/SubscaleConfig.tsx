import { useEffect } from "react";
import axios from "axios";
import { Database, Home, LoaderCircleIcon } from "lucide-react";

import SubscaleConfigCard from "./SubscaleConfigCard";
import ErrorMessage from "../../../components/ErrorMessage";

import { useConfigContext } from "../../../context/ConfigProvider";
import Button from "../../../components/Button";
import { getStepStatus } from "../../../utils/stepStatus";

const SubscaleConfig = () => {
  const {
    subscaleConfig,
    setSubscaleConfig,
    setStep,
    setStepStatus,
    loading,
    setLoading,
    error,
    setError,
    setNormalizationEnabled,
  } = useConfigContext();

  const loadSubscaleConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/subscale");
      setSubscaleConfig(res.data);
      if (res.data.question_ids.length > 0) {
        setStepStatus({
          questions: "completed",
          subscale: "current",
          normalization: "enabled",
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load subscale configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndNavigate = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post("/api/subscale", subscaleConfig);
      setSubscaleConfig(res.data);
      setStep("normalization");
      setStepStatus(getStepStatus("normalization", ["questions", "subscale"]));
      setNormalizationEnabled(true);
    } catch (err: any) {
      setError(err.message || "Failed to load subscale configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndBack = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post("/api/subscale", subscaleConfig);
      setSubscaleConfig(res.data);
      setStep("questions");
      setStepStatus({
        questions: "current",
        subscale: "enabled",
        normalization: "disabled",
      });
    } catch (err: any) {
      setError(err.message || "Failed to load subscale configuration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscaleConfig();
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
          Configure Subscale
        </h2>
        <p className="text-gray-600">
          Define the single subscale that will calculate scores from your survey
          questions.
        </p>
      </div>

      <SubscaleConfigCard />
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <Button
            variant="back"
            icon={<Home className="w-4 h-4" />}
            onClick={handleSaveAndBack}
          >
            Back to Questions
          </Button>

          <Button
            variant="secondary"
            icon={<Database className="w-4 h-4" />}
            disabled={subscaleConfig.question_ids.length === 0}
            onClick={handleSaveAndNavigate}
          >
            {subscaleConfig.question_ids.length > 0
              ? "Next: Normalization Setup"
              : "Please select questions"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscaleConfig;
