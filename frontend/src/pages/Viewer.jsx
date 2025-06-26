import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

      <div className="w-full max-w-2xl bg-white rounded shadow p-6 text-center space-y-4">
        <img
          src={step.imageUrl}
          alt={`Step ${currentStep + 1}`}
          className="w-full h-auto rounded border"
        />
        <p className="text-lg">{step.description}</p>

        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            ⬅ Prev
          </button>

          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {tour.steps.length}
          </span>

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            disabled={currentStep === tour.steps.length - 1}
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
