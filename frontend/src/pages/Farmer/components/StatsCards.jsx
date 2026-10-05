import { motion } from "framer-motion";
import { FaCloudSun, FaRupeeSign, FaRobot, FaMapMarkerAlt } from "react-icons/fa";

function StatCard({ icon, label, value, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 shadow-md p-4 md:p-5 flex items-center gap-3.5"
    >
      <div
        className={`h-11 w-11 md:h-12 md:w-12 rounded-xl flex items-center justify-center text-lg md:text-xl shrink-0 ${accent}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] md:text-xs font-medium text-gray-500 truncate">
          {label}
        </p>
        <p className="text-sm md:text-base font-bold text-gray-800 truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function StatsCards({ t, advisory }) {
  const weatherValue = advisory
    ? advisory.weather.temperature
    : "—";
  const marketValue = advisory ? advisory.market.modalPrice : "—";
  const aiValue = advisory ? t("aiReady") : "Standing by";


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <StatCard
        icon={<FaCloudSun className="text-white" />}
        label={t("weather")}
        value={weatherValue}
        accent="bg-gradient-to-br from-sky-400 to-blue-500"
        delay={0}
      />
      <StatCard
        icon={<FaRupeeSign className="text-white" />}
        label={t("marketPrice")}
        value={marketValue}
        accent="bg-gradient-to-br from-amber-400 to-orange-500"
        delay={0.05}
      />
      <StatCard
        icon={<FaRobot className="text-white" />}
        label={t("aiStatus")}
        value={aiValue}
        accent="bg-gradient-to-br from-emerald-400 to-green-600"
        delay={0.1}
      />
      <StatCard
        icon={<FaMapMarkerAlt className="text-white" />}
        label={t("selectedMarket")}
        value={advisory ? advisory.market.marketName : "—"}
        accent="bg-gradient-to-br from-violet-400 to-purple-500"
        delay={0.15}
      />
    </div>
  );
}

export default StatsCards;