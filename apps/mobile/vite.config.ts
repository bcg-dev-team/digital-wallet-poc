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
      "figma:asset/d354673552a465504a29e5fb8faea6af002ba04b.png": path.resolve(
        __dirname,
        "./src/assets/d354673552a465504a29e5fb8faea6af002ba04b.png"
      ),
      "figma:asset/e6769d863f16bbccc165602f58f3391daffd454e.png": path.resolve(
        __dirname,
        "./src/assets/e6769d863f16bbccc165602f58f3391daffd454e.png"
      ),
      "figma:asset/c70a76a62088b5d21df9ee6ece31859439bd6a1d.png": path.resolve(
        __dirname,
        "./src/assets/c70a76a62088b5d21df9ee6ece31859439bd6a1d.png"
      ),
      "figma:asset/c464d9e903817c3ef7f389ae66705c9445719c95.png": path.resolve(
        __dirname,
        "./src/assets/c464d9e903817c3ef7f389ae66705c9445719c95.png"
      ),
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    emptyOutDir: true,
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
    watch: {
      // UI 패키지 변경사항 감지 (개발 모드)
      ignored: ["!**/packages/ui/src/**"],
    },
  },
  preview: {
    port: 3000,
    host: true,
  },
});
