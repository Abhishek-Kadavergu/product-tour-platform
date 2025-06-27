import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link
        to="/dashboard"
        className="text-2xl font-bold text-purple-700 hover:text-purple-900 transition duration-200"
      >
        🧭 TourCraft
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 hover:text-purple-900 transition duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/create"
          className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-md hover:shadow-lg transition duration-300"
        >
          + Create Tour
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
