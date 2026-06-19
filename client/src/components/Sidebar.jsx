import { LayoutDashboard, Upload, Map, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="w-64 bg-[#0F1024]/80 border-r border-white/10 min-h-screen p-6">
      <h1 className="text-white text-2xl font-bold mb-10">Trrip Travels</h1>

      <div className="space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-slate-300 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 text-slate-300 hover:text-white"
        >
          Upload
        </Link>

        <Link
          to="/trips"
          className="flex items-center gap-3 text-slate-300 hover:text-white"
        >
          Trips
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 mt-10"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
