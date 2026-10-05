import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaShareSquare, FaPlusSquare, FaCheckCircle, FaMobileAlt } from "react-icons/fa";
import { usePWA } from "../../context/PWAContext";

export default function PWAInstallModal() {
  const { showInstallModal, setShowInstallModal, isInstallable, installApp, isInstalled } = usePWA();

  if (!showInstallModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 overflow-hidden border border-gray-100"
        >
          {/* Close button */}
          <button
            onClick={() => setShowInstallModal(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <FaTimes className="text-lg" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-green-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-600/30 text-white text-2xl font-bold">
              🛡️
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Install FarmLink</h3>
              <p className="text-xs font-medium text-green-700">Official Mobile Web App (PWA)</p>
            </div>
          </div>

          {isInstalled ? (
            <div className="text-center py-6">
              <FaCheckCircle className="text-5xl text-green-600 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-gray-900">Already Installed!</h4>
              <p className="text-sm text-gray-600 mt-1">
                FarmLink is installed on your device. You can open it from your Home Screen or App Drawer.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 my-4 text-sm text-gray-600">
                <div className="bg-green-50/80 rounded-2xl p-3.5 flex items-start gap-3 border border-green-100">
                  <span className="p-2 bg-green-600 text-white rounded-xl shadow-sm text-sm">⚡</span>
                  <div>
                    <h5 className="font-semibold text-gray-900">Instant Loading & Offline Access</h5>
                    <p className="text-xs text-gray-600 mt-0.5">Works smoothly even in low rural connectivity areas.</p>
                  </div>
                </div>

                {/* Instructions per platform */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FaMobileAlt className="text-green-700" />
                    <span>How to Install:</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">📱 Android / Chrome:</span>
                      <span>Tap <b>Install App</b> below or Chrome menu (⋮) → "Add to Home screen".</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">🍏 iOS / Safari:</span>
                      <span>Tap Share <FaShareSquare className="inline text-blue-600 mx-0.5" /> → "Add to Home Screen" <FaPlusSquare className="inline text-gray-600 mx-0.5" />.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex flex-col gap-2.5">
                {isInstallable && (
                  <button
                    onClick={() => {
                      installApp();
                      setShowInstallModal(false);
                    }}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 transition active:scale-98"
                  >
                    <FaDownload className="text-sm" />
                    <span>Install FarmLink App</span>
                  </button>
                )}

                <button
                  onClick={() => setShowInstallModal(false)}
                  className="w-full py-3 px-4 text-gray-600 hover:bg-gray-100 font-medium rounded-2xl transition text-sm"
                >
                  Continue in Browser
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
