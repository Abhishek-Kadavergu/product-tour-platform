// src/pages/EditTour.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

export default function EditTour() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await API.get(`/tours/${id}`);
        setTitle(res.data.title);
        setIsPublic(res.data.isPublic);
        setSteps(res.data.steps);
      } catch (err) {
        toast.error("Failed to load tour");
      }
    };

    fetchTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tours/${id}`, { title, isPublic, steps });
      toast.success("Tour updated!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Tour</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Tour Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input w-full border border-gray-300 px-4 py-2 rounded"
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
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded space-y-2">
              <input
                type="text"
                placeholder="Image URL"
                value={step.imageUrl}
                onChange={(e) =>
                  handleStepChange(index, "imageUrl", e.target.value)
                }
                className="input w-full"
              />
              <textarea
                placeholder="Step Description"
                value={step.description}
                onChange={(e) =>
                  handleStepChange(index, "description", e.target.value)
                }
                className="input w-full h-24"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
