import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AppSimulatorFrame from "./components/layout/AppSimulatorFrame";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import PWAInstallBanner from "./components/pwa/PWAInstallBanner";
import PWAInstallModal from "./components/pwa/PWAInstallModal";
import OfflineToast from "./components/pwa/OfflineToast";

function App() {
  return (
    <AppSimulatorFrame>
      <div className="flex flex-col min-h-screen pb-16 md:pb-0">
        <PWAInstallBanner />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <MobileBottomNav />
        <PWAInstallModal />
        <OfflineToast />
      </div>
    </AppSimulatorFrame>
  );
}

export default App;