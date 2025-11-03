import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@digital-wallet/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "figma:asset/f476cb1ee6d48a8a10be4f9745528859aa46ad63.png": path.resolve(
        __dirname,
        "./src/assets/f476cb1ee6d48a8a10be4f9745528859aa46ad63.png"
      ),
      "figma:asset/a6a6ebcc2d3bd9ac456d7376e2a094dae5097638.png": path.resolve(
        __dirname,
        "./src/assets/a6a6ebcc2d3bd9ac456d7376e2a094dae5097638.png"
      ),
      "figma:asset/904161eaaeda9a6e1380789b5df872e0184f6ddd.png": path.resolve(
        __dirname,
        "./src/assets/904161eaaeda9a6e1380789b5df872e0184f6ddd.png"
      ),
      "figma:asset/034a0093adcbb8be6bca570d81a33610166d62db.png": path.resolve(
        __dirname,
        "./src/assets/034a0093adcbb8be6bca570d81a33610166d62db.png"
      ),
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-tabs"],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true, // 모바일 접속을 위한 설정
    open: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
});
