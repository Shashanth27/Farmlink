import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaRedo,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

function FloatingButtons({ t, onNearbyMarkets, onHelpline, onAskAgain }) {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      key: "nearby",
      icon: <FaMapMarkedAlt />,
      label: t("nearbyMarkets"),
      onClick: onNearbyMarkets,
      cls: "bg-blue-600 hover:bg-blue-700",
    },
    {
      key: "helpline",
      icon: <FaPhoneAlt />,
      label: t("helpline"),
      onClick: onHelpline,
      cls: "bg-red-600 hover:bg-red-700",
    },
    {
      key: "askAgain",
      icon: <FaRedo />,
      label: t("askAgain"),
      onClick: onAskAgain,
      cls: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.button
              key={action.key}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.15, delay: i * 0.04 }}
              onClick={() => {
                action.onClick?.();
                setOpen(false);
              }}
              className={`flex items-center gap-2.5 text-white pl-4 pr-5 py-3 rounded-full shadow-lg font-semibold text-sm ${action.cls}`}
            >
              {action.icon}
              {action.label}
            </motion.button>
          ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        className="h-14 w-14 rounded-full bg-green-700 hover:bg-green-800 text-white shadow-xl flex items-center justify-center text-xl"
        aria-label="Quick actions"
      >
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? <FaTimes /> : <FaPlus />}
        </motion.span>
      </motion.button>
    </div>
  );
}

export default FloatingButtons;