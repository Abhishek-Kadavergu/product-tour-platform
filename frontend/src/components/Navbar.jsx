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
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold text-purple-700">
        🧭 TourCraft
      </Link>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-purple-600">
          Dashboard
        </Link>
        <Link to="/create" className="text-gray-700 hover:text-purple-600">
          + Create Tour
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
