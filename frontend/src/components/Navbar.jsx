import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaPlus,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-cyan-500/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex justify-center items-center shadow-[0_0_30px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-all duration-300">
            <FaRobot className="text-white text-2xl" />
          </div>

          <div>
            <h1 className="text-white font-bold text-xl">
              AI Interview
            </h1>

            <p className="text-cyan-300 text-xs">
              Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-4">

          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all duration-300 ${
              location.pathname === "/dashboard"
                ? "bg-cyan-500 text-white shadow-lg"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/create-interview"
            className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all duration-300 ${
              location.pathname === "/create-interview"
                ? "bg-purple-500 text-white shadow-lg"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaPlus />
            Create
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;