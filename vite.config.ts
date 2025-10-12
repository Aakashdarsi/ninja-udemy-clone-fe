import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
    proxy: {
      // Proxy API requests to your local backend
      "/api": {
        target: "http://localhost:3000", // Change this to your backend server's address
        changeOrigin: true,
      },
    },
  },
});
