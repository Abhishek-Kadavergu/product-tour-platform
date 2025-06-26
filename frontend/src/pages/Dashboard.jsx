import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    // const confirm = window.confirm(
    //   "Are you sure you want to delete this tour?"
    // );
    // if (!confirm) return;

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
      <h1 className="text-3xl font-bold mb-4">📚 Your Product Tours</h1>

      <button
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        onClick={() => navigate("/create")}
      >
        + Create New Tour
      </button>

      {tours.length === 0 ? (
        <p>No tours yet.</p>
      ) : (
        <ul className="space-y-4">
          {tours.map((tour) => (
            <li
              key={tour._id}
              className="p-4 border rounded bg-white shadow-sm space-y-1"
            >
              <h2 className="text-lg font-semibold">{tour.title}</h2>
              <p>
                {tour.steps.length} step(s) •{" "}
                {tour.isPublic ? "Public" : "Private"}
              </p>
              <div className="flex space-x-4 mt-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => navigate(`/tour/${tour._id}`)}
                >
                  View Tour
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
