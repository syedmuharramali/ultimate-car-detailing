import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // shadcn/ui and the Magic UI registry both emit imports like
      // `@/lib/utils` and `@/components/ui/button`. This makes them resolve.
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
