import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon-32x32.png",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "FarmLink - Smart Farmer Advisor",
        short_name: "FarmLink",
        description:
          "AI-powered decision support for farmers: live mandi prices, weather, and crop-specific sell/wait advisories.",
        theme_color: "#15803d",
        background_color: "#f7f9fc",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        categories: ["agriculture", "productivity", "utilities"],
        icons: [
          {
            src: "/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Farmer Advisory",
            short_name: "Advisor",
            description: "Open AI Crop Sell/Wait Advisory",
            url: "/farmer",
            icons: [{ src: "/pwa-192x192.png", sizes: "192x192" }],
          },
          {
            name: "Live Mandi Prices",
            short_name: "Mandi",
            description: "Check live APMC mandi market rates",
            url: "/farmer",
            icons: [{ src: "/pwa-192x192.png", sizes: "192x192" }],
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/advisory"),
            handler: "NetworkOnly",
          },
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/market") ||
              url.pathname.startsWith("/auth") ||
              url.pathname.startsWith("/admin"),
            handler: "NetworkFirst",
            options: {
              cacheName: "farmlink-api-cache",
              networkTimeoutSeconds: 8,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});