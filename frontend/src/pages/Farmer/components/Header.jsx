import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaBell,
  FaSignOutAlt,
  FaChevronDown,
  FaUserCircle,
  FaGlobe,
  FaDownload,
} from "react-icons/fa";
import { LANGUAGES } from "./translations";
import { usePWA } from "../../../context/PWAContext";

function Header({ language, onLanguageChange, t, onLogout }) {
  const [langOpen, setLangOpen] = useState(false);
  const { isInstalled, isInstallable, installApp, setShowInstallModal } = usePWA();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm safe-top">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-10 w-10 md:h-11 md:w-11 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-md shrink-0">
            <FaShieldAlt className="text-white text-lg md:text-xl" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight leading-tight truncate">
                FarmLink
              </h1>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 border border-green-200">
                PWA
              </span>
            </div>
            <p className="text-[11px] md:text-xs text-green-700 font-medium truncate">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* PWA Install Quick Button */}
          {!isInstalled && (
            <button
              onClick={() => {
                if (isInstallable) {
                  installApp();
                } else {
                  setShowInstallModal(true);
                }
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-full px-3 py-1.5 text-xs font-bold transition-all shadow-sm active:scale-95"
              title="Install Mobile App"
            >
              <FaDownload className="text-[10px]" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 bg-white/80 hover:bg-white border border-gray-200 rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors shadow-sm active:scale-95"
            >
              <FaGlobe className="text-green-600" />
              <span className="hidden sm:inline">{language || "English"}</span>
              <FaChevronDown className="text-[10px] text-gray-400" />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 transition-colors ${
                        lang === language
                          ? "text-green-700 font-semibold bg-green-50"
                          : "text-gray-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification */}
          <button
            aria-label="Notifications"
            className="relative h-10 w-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white border border-gray-200 shadow-sm transition-colors active:scale-95"
          >
            <FaBell className="text-gray-600" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <button className="hidden sm:flex items-center gap-2 h-10 pl-1.5 pr-3 rounded-full bg-white/80 hover:bg-white border border-gray-200 shadow-sm transition-colors active:scale-95">
            <FaUserCircle className="text-2xl text-green-700" />
            <span className="text-sm font-semibold text-gray-700">
              Farmer
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-3.5 md:px-4 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-md active:scale-95"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">{t("logout")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;