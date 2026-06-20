import {
  LayoutDashboard,
  Upload,
  Map,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Bar */}
      <div
        className="
          md:hidden
          fixed
          top-0
          left-0
          right-0
          z-50
          bg-[#0F1024]
          border-b
          border-white/10
          p-4
          flex
          justify-between
          items-center
        "
      >
        <h1 className="text-white text-2xl font-bold">
          Trrip Travels
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="text-white"
        >
          <Menu size={30} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            md:hidden
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-[#0F1024]/95
          backdrop-blur-xl
          border-r
          border-white/10
          p-6
          z-50
          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Close Button Mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white"
          >
            <X size={30} />
          </button>
        </div>

        <h1 className="text-white text-3xl font-bold mb-10">
          Trrip Travels
        </h1>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition

              ${
                isActive("/dashboard")
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/upload"
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition

              ${
                isActive("/upload")
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            <Upload size={20} />
            Upload
          </Link>

          <Link
            to="/trips"
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition

              ${
                location.pathname.startsWith("/trips")
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            <Map size={20} />
            Trips
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-3
            text-red-400
            hover:text-red-300
            mt-12
            px-4
            py-3
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;