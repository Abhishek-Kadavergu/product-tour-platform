import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";

export default function Viewer() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await API.get(`/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load tour");
      }
    };

    fetchTour();
  }, [id]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!tour) return <div className="p-4">Loading...</div>;
  if (tour.steps.length === 0)
    return <div className="p-4">No steps in this tour.</div>;

  const step = tour.steps[currentStep];

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {tour.title}
      </motion.h1>

      <motion.div
        className="w-full max-w-2xl bg-white rounded shadow p-6 text-center space-y-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={step.imageUrl}
            src={step.imageUrl}
            alt={`Step ${currentStep + 1}`}
            className="w-full h-auto rounded border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        <motion.p
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {step.description}
        </motion.p>

        <motion.div
          className="flex justify-between items-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            ⬅ Prev
          </motion.button>

          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {tour.steps.length}
          </span>

          <motion.button
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            disabled={currentStep === tour.steps.length - 1}
            onClick={() => setCurrentStep((prev) => prev + 1)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            Next ➡
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
