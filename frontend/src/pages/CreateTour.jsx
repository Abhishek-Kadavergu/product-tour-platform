import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function CreateTour() {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [steps, setSteps] = useState([{ imageUrl: "", description: "" }]);

  const navigate = useNavigate();

  const handleStepChange = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const addStep = () => setSteps([...steps, { imageUrl: "", description: "" }]);

  const removeStep = (index) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const stepsWithPosition = steps.map((s, i) => ({
        ...s,
        position: i + 1,
      }));

      const res = await API.post("/tours", {
        title,
        isPublic,
        steps: stepsWithPosition,
      });

      navigate("/dashboard");
    } catch (err) {
      alert(
        "Failed to create tour: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 Create a New Tour</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Tour Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span>Make Public</span>
        </label>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Steps</h2>
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded space-y-2">
              <input
                type="text"
                placeholder="Image URL"
                className="input"
                value={step.imageUrl}
                onChange={(e) =>
                  handleStepChange(index, "imageUrl", e.target.value)
                }
                required
              />
              <textarea
                placeholder="Step Description"
                className="input h-24"
                value={step.description}
                onChange={(e) =>
                  handleStepChange(index, "description", e.target.value)
                }
                required
              />
              <div className="text-right">
                {steps.length > 1 && (
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() => removeStep(index)}
                  >
                    Remove Step
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={addStep}
          >
            + Add Step
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🚀 Publish Tour
        </button>
      </form>
    </div>
  );
}
