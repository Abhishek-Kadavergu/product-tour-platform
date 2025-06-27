import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    const fetchTours = async () => {
      try {
        const res = await API.get("/tours");
        setTours(res.data);
      } catch (err) {
        console.error("Failed to fetch tours:", err.message);
      }
    };

    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tours/${id}`);
      setTours(tours.filter((t) => t._id !== id));
      toast.success("Tour deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete tour.");
    }
  };

  return (
    <div className="p-6">
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📚 Your Product Tours
      </motion.h1>

      <motion.button
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        onClick={() => navigate("/create")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        + Create New Tour
      </motion.button>

      {tours.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600"
        >
          No tours yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {tours.map((tour) => (
              <motion.div
                key={tour._id}
                className="p-4 border rounded bg-white shadow-sm space-y-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-semibold">{tour.title}</h2>
                <p>
                  {tour.steps.length} step(s) •{" "}
                  {tour.isPublic ? "Public" : "Private"}
                </p>
                <div className="flex space-x-4 mt-2">
                  <motion.button
                    className="text-blue-600 hover:underline"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/tour/${tour._id}`)}
                  >
                    View
                  </motion.button>
                  <motion.button
                    className="text-yellow-600 hover:underline"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/edit/${tour._id}`)}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    className="text-red-600 hover:underline"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDelete(tour._id)}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
