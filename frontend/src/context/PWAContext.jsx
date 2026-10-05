import React, { createContext, useContext, useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

const PWAContext = createContext({
  deferredPrompt: null,
  isInstallable: false,
  isInstalled: false,
  isOnline: true,
  showInstallModal: false,
  setShowInstallModal: () => {},
  installApp: async () => {},
  isMobileSimulator: false,
  setIsMobileSimulator: () => {},
  toggleMobileSimulator: () => {},
});

export function PWAProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [showInstallModal, setShowInstallModal] = useState(false);
  
  // Optional desktop simulator mode for project review presentation
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);

  useEffect(() => {
    // Register Service Worker
    try {
      const updateSW = registerSW({
        onNeedRefresh() {
          console.log("[PWA] New content available, refresh ready.");
        },
        onOfflineReady() {
          console.log("[PWA] App is ready to work offline.");
        },
      });
    } catch (e) {
      console.warn("[PWA] Service worker registration error:", e);
    }

    // Check if already running in standalone PWA mode
    const checkInstalled = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true ||
        document.referrer.includes("android-app://");
      setIsInstalled(Boolean(isStandalone));
    };

    checkInstalled();
    window
      .matchMedia("(display-mode: standalone)")
      .addEventListener("change", checkInstalled);

    // Listen for PWA beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log("[PWA] FarmLink installed successfully!");
    };

    // Network status listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback for iOS or desktop where direct trigger isn't supported
      setShowInstallModal(true);
    }
  };

  const toggleMobileSimulator = () => {
    setIsMobileSimulator((prev) => !prev);
  };

  return (
    <PWAContext.Provider
      value={{
        deferredPrompt,
        isInstallable,
        isInstalled,
        isOnline,
        showInstallModal,
        setShowInstallModal,
        installApp,
        isMobileSimulator,
        setIsMobileSimulator,
        toggleMobileSimulator,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  return useContext(PWAContext);
}
