import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudSun, FaChartLine, FaSeedling, FaRobot } from "react-icons/fa";

const STAGES = [
  { icon: <FaCloudSun />, text: "Fetching Weather..." },
  { icon: <FaChartLine />, text: "Checking Market..." },
  { icon: <FaSeedling />, text: "Analyzing Crop..." },
  { icon: <FaRobot />, text: "Generating AI Recommendation..." },
];

function LoadingScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => Math.min(s + 1, STAGES.length - 1));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-green-900/95 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl text-lime-300"
        >
          {STAGES[stage].icon}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-white text-lg font-semibold"
          >
            {STAGES[stage].text}
          </motion.p>
        </AnimatePresence>

        <div className="mt-6 h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            className="h-full rounded-full bg-lime-300"
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;