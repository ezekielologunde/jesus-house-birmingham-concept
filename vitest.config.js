import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
  },
  resolve: {
    alias: {
      "next/font/google": path.resolve(__dirname, "./tests/mocks/next-font-google.js"),
      "@/app/layout.js": path.resolve(__dirname, "./app/layout.jsx"),
      "@": path.resolve(__dirname, "."),
    },
  },
});
