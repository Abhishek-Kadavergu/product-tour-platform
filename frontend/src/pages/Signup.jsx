import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4"
      >
        <motion.h2
          className="text-2xl font-bold text-center text-purple-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Sign Up
        </motion.h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          name="name"
          placeholder="Name"
          className="input border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
        >
          Create Account
        </motion.button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
