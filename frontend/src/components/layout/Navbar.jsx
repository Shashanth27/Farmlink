import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShieldAlt, FaDownload } from "react-icons/fa";
import { usePWA } from "../../context/PWAContext";

function Navbar() {
  const location = useLocation();
  const { isInstalled, isInstallable, installApp, setShowInstallModal } = usePWA();

  return (
    <nav className="sticky top-0 z-30 flex justify-between items-center px-4 sm:px-8 py-3.5 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm safe-top">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-500 flex items-center justify-center text-white shadow-sm">
          <FaShieldAlt className="text-base" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-black text-gray-900 tracking-tight">FarmLink</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-green-100 text-green-800">
            PWA
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          to="/"
          className={`text-sm font-semibold transition ${
            location.pathname === "/" ? "text-green-700" : "text-gray-600 hover:text-green-700"
          }`}
        >
          Home
        </Link>

        <Link
          to="/farmer"
          className={`text-sm font-semibold transition ${
            location.pathname === "/farmer" ? "text-green-700" : "text-gray-600 hover:text-green-700"
          }`}
        >
          Advisor
        </Link>

        <Link
          to="/login"
          className={`text-sm font-semibold transition ${
            location.pathname === "/login" ? "text-green-700" : "text-gray-600 hover:text-green-700"
          }`}
        >
          Login
        </Link>

        {!isInstalled && (
          <button
            onClick={() => {
              if (isInstallable) {
                installApp();
              } else {
                setShowInstallModal(true);
              }
            }}
            className="hidden sm:flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm active:scale-95"
          >
            <FaDownload className="text-[10px]" />
            <span>Install App</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;