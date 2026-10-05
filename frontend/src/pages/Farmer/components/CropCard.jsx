import { motion } from "framer-motion";
import {
  FaSeedling,
  FaCalendarCheck,
  FaBoxOpen,
  FaClock,
  FaFlask,
  FaTint,
} from "react-icons/fa";

function Row({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-green-50 last:border-0">
      <span className="mt-0.5 text-green-600 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

function CropCard({ t, data, empty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl bg-gradient-to-br from-lime-50 to-white border border-lime-100 shadow-md p-5 md:p-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <FaSeedling className="text-2xl text-lime-600" />
        <h3 className="text-lg font-bold text-gray-800">
          {t("cropKnowledge")}
        </h3>
      </div>

      {empty ? (
        <p className="text-gray-500 text-sm mt-2">{t("fillFormPrompt")}</p>
      ) : (
        <div className="mt-2">
          <Row
            icon={<FaCalendarCheck />}
            label={t("harvestTips")}
            value={data.harvestTip}
          />
          <Row
            icon={<FaBoxOpen />}
            label={t("storageTips")}
            value={data.storageTip}
          />
          <Row
            icon={<FaClock />}
            label={t("bestSellingPeriod")}
            value={data.bestSellingPeriod}
          />
          <Row
            icon={<FaFlask />}
            label={t("fertilizerAdvice")}
            value={data.fertilizerAdvice}
          />
          <Row
            icon={<FaTint />}
            label={t("waterRequirement")}
            value={data.waterRequirement}
          />
        </div>
      )}
    </motion.div>
  );
}

export default CropCard;