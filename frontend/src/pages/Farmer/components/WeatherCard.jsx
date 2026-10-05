import { motion } from "framer-motion";
import { FaSun, FaCloudSun, FaCloudRain, FaWind, FaTint } from "react-icons/fa";

const CONDITION_CONFIG = {
  sunny: { icon: FaSun, color: "text-yellow-400", bg: "from-yellow-50 to-white" },
  cloudy: { icon: FaCloudSun, color: "text-sky-500", bg: "from-sky-50 to-white" },
  rainy: { icon: FaCloudRain, color: "text-blue-600", bg: "from-blue-50 to-white" },
};

function ProgressRow({ icon, label, value, percent, barColor }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg text-gray-400 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs font-semibold text-gray-500">{label}</span>
          <span className="text-sm font-bold text-gray-800">{value}</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, percent)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`h-full rounded-full ${barColor}`}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherCard({ t, data, empty }) {
  const condition = data?.condition || "sunny";
  const config = CONDITION_CONFIG[condition] || CONDITION_CONFIG.sunny;
  const ConditionIcon = config.icon;

  const humidityPercent = parseFloat(String(data?.humidity).replace(/[^\d.]/g, "")) || 0;
  const rainfallPercent = parseFloat(String(data?.rainfall).replace(/[^\d.]/g, "")) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl bg-gradient-to-br ${config.bg} border border-sky-100 shadow-md p-5 md:p-6`}
    >
      <div className="flex items-center gap-2 mb-4">
        <FaCloudSun className="text-2xl text-sky-500" />
        <h3 className="text-lg font-bold text-gray-800">
          {t("weatherForecast")}
        </h3>
      </div>

      {empty ? (
        <p className="text-gray-500 text-sm">{t("fillFormPrompt")}</p>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Big, unmissable condition icon + temperature */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ConditionIcon className={`text-6xl md:text-7xl ${config.color}`} />
            </motion.div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-gray-800">
                {data.temperature}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {t("temperature")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <ProgressRow
              icon={<FaTint />}
              label={t("humidity")}
              value={data.humidity}
              percent={humidityPercent}
              barColor="bg-blue-400"
            />
            <ProgressRow
              icon={<FaCloudRain />}
              label={t("rainfall")}
              value={data.rainfall}
              percent={rainfallPercent}
              barColor="bg-sky-500"
            />
            <ProgressRow
              icon={<FaWind />}
              label={t("windSpeed")}
              value={data.windSpeed}
              percent={40}
              barColor="bg-gray-400"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default WeatherCard;