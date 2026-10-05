import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

function TrendChart({ t, history, empty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-md p-5 md:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-2xl text-green-600" />
        <h3 className="text-lg font-bold text-gray-800">{t("trendChart")}</h3>
      </div>

      {empty ? (
        <p className="text-gray-500 text-sm">{t("fillFormPrompt")}</p>
      ) : (
        <div className="h-56 md:h-64 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #dbe7fb",
                  fontSize: 13,
                }}
                formatter={(value) => [`₹${value}`, "Modal Price"]}
              />
              <Area
                type="monotone"
                dataKey="modalPrice"
                stroke="#1d4ed8"
                strokeWidth={2.5}
                fill="url(#priceFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}

export default TrendChart;