import { motion } from "framer-motion";
import {
  FaStore,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCalendarAlt,
} from "react-icons/fa";
import PriceRangeBar from "./PriceRangeBar";

function TrendBadge({ trend }) {
  const map = {
    Increasing: {
      icon: <FaArrowUp />,
      cls: "bg-green-100 text-green-700",
    },
    Decreasing: {
      icon: <FaArrowDown />,
      cls: "bg-red-100 text-red-700",
    },
    Stable: {
      icon: <FaMinus />,
      cls: "bg-gray-100 text-gray-600",
    },
  };
  const conf = map[trend] || map.Stable;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${conf.cls}`}
    >
      {conf.icon}
      {trend}
    </span>
  );
}

function PriceStat({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl py-3 px-2 text-center ${
        highlight ? "bg-amber-50 border border-amber-200" : "bg-white/60"
      }`}
    >
      <p className="text-[11px] text-gray-500 font-medium">{label}</p>
      <p
        className={`text-base font-extrabold mt-0.5 ${
          highlight ? "text-amber-700" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MarketCard({ t, data, empty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 shadow-md p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FaStore className="text-2xl text-amber-500" />
          <h3 className="text-lg font-bold text-gray-800">
            {t("marketCard")}
          </h3>
        </div>
        {!empty && <TrendBadge trend={data.trend} />}
      </div>

      {empty ? (
        <p className="text-gray-500 text-sm">{t("fillFormPrompt")}</p>
      ) : (
        <>
          <p className="text-sm font-semibold text-gray-600 mb-3">
            {data.marketName}
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <PriceStat label={t("lowestPrice")} value={data.lowestPrice} />
            <PriceStat
              label={t("modalPrice")}
              value={data.modalPrice}
              highlight
            />
            <PriceStat label={t("highestPrice")} value={data.highestPrice} />
          </div>

          <PriceRangeBar
            low={data.lowestPriceValue}
            modal={data.modalPriceValue}
            high={data.highestPriceValue}
            lowLabel={t("lowestPrice")}
            modalLabel={t("modalPrice")}
            highLabel={t("highestPrice")}
          />

          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <FaCalendarAlt />
            {t("arrivalDate")}: {data.arrivalDate}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default MarketCard;