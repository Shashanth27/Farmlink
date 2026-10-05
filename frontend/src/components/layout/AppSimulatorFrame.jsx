import React, { useState, useEffect } from "react";
import { FaMobileAlt, FaDesktop, FaWifi, FaBatteryFull, FaSignal } from "react-icons/fa";
import { usePWA } from "../../context/PWAContext";

export default function AppSimulatorFrame({ children }) {
  const { isMobileSimulator, toggleMobileSimulator, isInstalled } = usePWA();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900/5 selection:bg-green-500 selection:text-white">
      {/* Desktop Presentation Toggle Button (Only on medium/large screens) */}
      <div className="hidden md:flex fixed top-3 right-4 z-50 items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xl border border-white/10">
        <span className="text-gray-400 font-normal">Review Mode:</span>
        <button
          onClick={toggleMobileSimulator}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition ${
            isMobileSimulator
              ? "bg-green-600 text-white shadow-md shadow-green-600/30"
              : "bg-white/10 hover:bg-white/20 text-gray-200"
          }`}
          title="Toggle Mobile App Device Frame for Presentation"
        >
          {isMobileSimulator ? <FaMobileAlt /> : <FaDesktop />}
          <span>{isMobileSimulator ? "Mobile App View" : "Full Screen"}</span>
        </button>
      </div>

      {isMobileSimulator ? (
        /* Mobile Smartphone Device Frame for Presentation Review */
        <div className="hidden md:flex min-h-screen items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-green-950">
          <div className="relative w-[400px] h-[844px] bg-black rounded-[50px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[6px] border-slate-700 ring-1 ring-white/20 flex flex-col overflow-hidden">
            {/* Phone Speaker Notch & Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-32 h-5 bg-black rounded-full flex items-center justify-center gap-3 px-2 border border-neutral-800">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
              <div className="w-10 h-1 bg-neutral-900 rounded-full" />
            </div>

            {/* Mobile Status Bar */}
            <div className="h-9 px-6 pt-1.5 flex items-center justify-between text-white text-[11px] font-semibold select-none z-40 bg-[#f7f9fc] text-slate-800 border-b border-gray-100">
              <span>{currentTime || "09:41"}</span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <FaSignal />
                <FaWifi />
                <FaBatteryFull className="text-xs text-green-600" />
              </div>
            </div>

            {/* App Screen Content inside Phone Frame */}
            <div className="flex-1 overflow-y-auto bg-[#f7f9fc] rounded-b-[40px] relative pb-16 custom-scrollbar">
              {children}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 w-32 h-1 bg-slate-400/80 rounded-full pointer-events-none" />
          </div>
        </div>
      ) : null}

      {/* Standard Full View (Active on mobile devices and when simulator mode is off) */}
      <div className={isMobileSimulator ? "md:hidden" : "block"}>
        {children}
      </div>
    </div>
  );
}
