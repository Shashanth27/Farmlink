import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaDatabase,
  FaHistory,
  FaExclamationTriangle,
} from "react-icons/fa";
import api from "../../services/api";

function formatTimestamp(iso) {
  if (!iso) return "Never synced yet";
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatBlock({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/70 border border-white/60 p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-lg shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-base font-bold text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [status, setStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [error, setError] = useState(null);

  const loadStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await api.get("/admin/sync-status");
      setStatus(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not reach the backend. Is the API running?");
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    setLastResult(null);
    setError(null);
    try {
      const res = await api.post("/admin/sync-prices");
      setLastResult(res.data);
      await loadStatus();
    } catch (err) {
      console.error(err);
      setError("Sync failed. Please check the backend and try again.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9fc] via-white to-[#f7f9fc]">
      <header className="bg-white/70 backdrop-blur-lg border-b border-white/40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-md">
            <FaShieldAlt className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              FarmLink Admin
            </h1>
            <p className="text-xs text-green-700 font-medium">
              Market Data Console
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white shadow-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Daily Mandi Price Sync
              </h2>
              <p className="mt-1 text-white/85 text-sm md:text-base max-w-xl">
                Pull today's market prices into FarmLink so every farmer
                sees up-to-date rates. Run this once a day, ideally each
                morning.
              </p>
            </div>

            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center justify-center gap-2.5 bg-white text-green-700 hover:bg-green-50 disabled:opacity-70 disabled:cursor-not-allowed px-6 py-3.5 rounded-xl font-bold text-base shadow-md transition-colors shrink-0"
            >
              <motion.span
                animate={syncing ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  syncing
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : {}
                }
              >
                <FaSyncAlt />
              </motion.span>
              {syncing ? "Syncing..." : "Sync Today's Price"}
            </button>
          </div>
        </motion.div>

        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
            <FaExclamationTriangle />
            {error}
          </div>
        )}

        {lastResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium"
          >
            <FaCheckCircle className="text-green-600 shrink-0" />
            {lastResult.message}
          </motion.div>
        )}

        <div className="grid sm:grid-cols-3 gap-4">
          <StatBlock
            icon={<FaHistory />}
            label="Last Synced"
            value={
              loadingStatus ? "Loading..." : formatTimestamp(status?.lastSyncedAt)
            }
          />
          <StatBlock
            icon={<FaSyncAlt />}
            label="Records Added Last Sync"
            value={loadingStatus ? "…" : status?.lastRecordsAdded ?? 0}
          />
          <StatBlock
            icon={<FaDatabase />}
            label="Total Price Records"
            value={loadingStatus ? "…" : status?.totalRecords ?? 0}
          />
        </div>

        <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-md p-5 md:p-6 text-sm text-gray-600 leading-relaxed">
          <p className="font-semibold text-gray-800 mb-1.5">How this works</p>
          <p>
            Syncing checks every market + crop combination already tracked in
            FarmLink and adds today's price if it isn't there yet, so it's
            safe to click more than once a day. Until a live government mandi
            price feed (e.g. Agmarknet / data.gov.in) is connected on the
            backend, today's prices are generated from the most recent known
            price for each market with a small realistic day-to-day
            fluctuation, keeping the dashboard fully demoable end to end.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;