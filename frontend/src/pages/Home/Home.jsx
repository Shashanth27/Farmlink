import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaShieldAlt, 
  FaCloudSun, 
  FaChartLine, 
  FaLeaf, 
  FaMobileAlt, 
  FaArrowRight, 
  FaDownload, 
  FaCheckCircle 
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import { usePWA } from "../../context/PWAContext";

function Home() {
  const navigate = useNavigate();
  const { isInstalled, isInstallable, installApp, setShowInstallModal } = usePWA();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-[#f7f9fc] to-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex flex-col items-center justify-center text-center">
        {/* App Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100/90 border border-green-200/80 text-green-800 text-xs font-semibold mb-6 shadow-sm animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
          <span>FarmLink Mobile App & PWA</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
          Smart Decision Support <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
            For Indian Farmers
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
          Real-time mandi prices, hyper-local weather alerts, and AI-powered crop selling advisories tailored directly to your farm.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md sm:justify-center mb-12">
          <button
            onClick={() => navigate("/farmer")}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 text-base"
          >
            <span>Open Advisor</span>
            <FaArrowRight className="text-xs" />
          </button>

          {!isInstalled ? (
            <button
              onClick={() => {
                if (isInstallable) {
                  installApp();
                } else {
                  setShowInstallModal(true);
                }
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition active:scale-95 text-base"
            >
              <FaDownload className="text-green-700 text-sm" />
              <span>Install App (PWA)</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-3 bg-green-100 text-green-800 font-semibold rounded-2xl text-sm">
              <FaCheckCircle className="text-green-600" />
              <span>Installed on Device</span>
            </div>
          )}
        </div>

        {/* Key App Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
          {/* Weather */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4">
              <FaCloudSun />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Live Weather & Rain</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Localized weather forecasting to time harvest and drying operations safely.
            </p>
          </div>

          {/* Mandi Prices */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-4">
              <FaChartLine />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Mandi Price Trends</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Real-time APMC mandi modal rates with historical trend charts and price projections.
            </p>
          </div>

          {/* AI Decision Advisory */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl mb-4">
              <FaLeaf />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">AI Sell / Wait Advisory</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Multi-lingual recommendations giving clear "Sell Now" or "Wait" guidance to maximize profits.
            </p>
          </div>
        </div>

        {/* PWA Mobile highlight banner */}
        <div className="mt-10 w-full bg-gradient-to-r from-emerald-800 to-green-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-left">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-300">
              <FaMobileAlt />
              <span>Mobile-First Progressive Web App</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Fast, Lightweight & Offline Capable</h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Install FarmLink directly onto Android or iOS devices without going through app stores. Works seamlessly with zero storage overhead.
            </p>
          </div>

          <button
            onClick={() => navigate("/farmer")}
            className="shrink-0 px-6 py-3 bg-white text-green-900 font-bold rounded-xl shadow hover:bg-green-50 transition active:scale-95 text-sm"
          >
            Launch App
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;