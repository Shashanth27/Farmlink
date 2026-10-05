import { motion } from "framer-motion";

function PriceRangeBar({ low, modal, high, lowLabel, modalLabel, highLabel }) {
  const span = Math.max(high - low, 1);
  const markerPercent = Math.min(
    100,
    Math.max(0, ((modal - low) / span) * 100)
  );

  return (
    <div className="mt-4">
      <div className="relative h-3 rounded-full bg-gradient-to-r from-red-300 via-amber-300 to-green-400 overflow-visible">
        <motion.div
          initial={{ left: "50%" }}
          animate={{ left: `${markerPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute -top-1.5 -translate-x-1/2"
        >
          <div className="h-6 w-6 rounded-full bg-white border-4 border-green-700 shadow-md" />
        </motion.div>
      </div>
      <div className="flex justify-between mt-2 text-[11px] font-semibold text-gray-500">
        <span>{lowLabel}</span>
        <span className="text-green-700">{modalLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

export default PriceRangeBar;