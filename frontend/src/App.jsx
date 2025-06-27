import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateTour from "./pages/CreateTour";
import Viewer from "./pages/Viewer";
import Navbar from "./components/Navbar";
import EditTour from "./pages/EditTour";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTour />} />
        <Route path="/tour/:id" element={<Viewer />} />
        <Route path="/edit/:id" element={<EditTour />} /> {/* Add this */}
      </Routes>
    </>
  );
}

export default App;
