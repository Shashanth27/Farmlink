import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  HiOutlineHome, 
  HiHome, 
  HiOutlineSparkles, 
  HiSparkles, 
  HiOutlineTrendingUp, 
  HiTrendingUp,
  HiOutlineUser,
  HiUser,
  HiOutlineDownload,
  HiOutlineDeviceMobile
} from "react-icons/hi";
import { usePWA } from "../../context/PWAContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isInstalled, setShowInstallModal, isInstallable, installApp } = usePWA();
  const currentPath = location.pathname;

  const scrollToSection = (id) => {
    if (currentPath !== "/farmer") {
      navigate("/farmer");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: HiOutlineHome,
      activeIcon: HiHome,
      isActive: currentPath === "/",
    },
    {
      label: "Advisor",
      path: "/farmer",
      icon: HiOutlineSparkles,
      activeIcon: HiSparkles,
      isActive: currentPath === "/farmer",
    },
    {
      label: "Market",
      action: () => scrollToSection("market-section"),
      icon: HiOutlineTrendingUp,
      activeIcon: HiTrendingUp,
      isActive: false,
    },
    {
      label: isInstalled ? "App Ready" : "Install",
      action: () => {
        if (isInstallable) {
          installApp();
        } else {
          setShowInstallModal(true);
        }
      },
      icon: isInstalled ? HiOutlineDeviceMobile : HiOutlineDownload,
      activeIcon: isInstalled ? HiOutlineDeviceMobile : HiOutlineDownload,
      isActive: false,
      badge: !isInstalled,
    },
    {
      label: "Account",
      path: "/login",
      icon: HiOutlineUser,
      activeIcon: HiUser,
      isActive: currentPath === "/login" || currentPath === "/register",
    },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-2 py-1.5 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.isActive ? item.activeIcon : item.icon;
          const content = (
            <div
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 relative ${
                item.isActive
                  ? "text-green-700 font-bold scale-105"
                  : "text-gray-500 hover:text-gray-800 font-medium"
              } active:scale-95`}
            >
              <div className="relative">
                <Icon className={`text-2xl ${item.isActive ? "text-green-700" : "text-gray-600"}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-600 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {item.isActive && (
                <span className="w-1 h-1 bg-green-700 rounded-full mt-0.5" />
              )}
            </div>
          );

          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                className="focus:outline-none flex-1 flex justify-center"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className="focus:outline-none flex-1 flex justify-center"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
