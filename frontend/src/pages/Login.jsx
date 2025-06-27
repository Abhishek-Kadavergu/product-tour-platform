import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      className="h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <motion.h2
          className="text-2xl font-bold text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login
        </motion.h2>

        <motion.input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.02 }}
        />

        <motion.input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.02 }}
        />

        <motion.button
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          Login
        </motion.button>

        <motion.p
          className="text-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-700 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}
