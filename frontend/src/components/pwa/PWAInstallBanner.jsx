import React, { useState } from "react";
import { FaDownload, FaTimes, FaMobileAlt } from "react-icons/fa";
import { usePWA } from "../../context/PWAContext";

export default function PWAInstallBanner() {
  const { isInstalled, isInstallable, installApp, setShowInstallModal } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) return null;

  return (
    <aside aria-label="Install App Banner" className="bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm font-medium z-40 relative">
      <div className="flex items-center gap-2.5 max-w-2xl truncate">
        <span className="p-1 bg-white/20 rounded-lg shrink-0">
          <FaMobileAlt className="text-white text-xs sm:text-sm" />
        </span>
        <span className="truncate">
          Install <strong className="font-bold">FarmLink</strong> on your phone for instant offline advisory & live mandi rates!
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            if (isInstallable) {
              installApp();
            } else {
              setShowInstallModal(true);
            }
          }}
          className="bg-white text-green-800 hover:bg-green-50 font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition"
        >
          <FaDownload className="text-[10px]" />
          <span>Install App</span>
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          aria-label="Dismiss banner"
        >
          <FaTimes className="text-xs" />
        </button>
      </div>
    </aside>
  );
}
