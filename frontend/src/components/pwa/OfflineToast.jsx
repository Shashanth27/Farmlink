import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWifi, FaExclamationTriangle } from "react-icons/fa";
import { usePWA } from "../../context/PWAContext";

export default function OfflineToast() {
  const { isOnline } = usePWA();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-amber-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold"
        >
          <FaExclamationTriangle className="text-sm animate-pulse" />
          <span>Offline Mode • Cached data is being shown</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
