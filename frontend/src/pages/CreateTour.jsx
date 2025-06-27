import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

      await API.post("/tours", {
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
    <motion.div
      className="p-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        🎯 Create a New Tour
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.input
          type="text"
          placeholder="Tour Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          whileFocus={{ scale: 1.02 }}
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
          <AnimatePresence>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-4 rounded space-y-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
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
                    <motion.button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={() => removeStep(index)}
                      whileHover={{ scale: 1.05 }}
                    >
                      Remove Step
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={addStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Step
          </motion.button>
        </div>

        <motion.button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Publish Tour
        </motion.button>
      </form>
    </motion.div>
  );
}
