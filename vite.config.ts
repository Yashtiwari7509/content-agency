import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    glsl(),

    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff2}"],

        runtimeCaching: [
          // Images
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },

          // ✅ Three.js models
          {
            urlPattern: ({ url }) => url.pathname.endsWith(".glb") || url.pathname.endsWith(".gltf"),
            handler: "CacheFirst",
            options: {
              cacheName: "models",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },

          // ✅ HDR / EXR
          {
            urlPattern: ({ url }) => url.pathname.endsWith(".hdr") || url.pathname.endsWith(".exr"),
            handler: "CacheFirst",
            options: {
              cacheName: "textures",
            },
          },

          // JS & CSS
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets",
            },
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
