import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
          required
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-700 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
