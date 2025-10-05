import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/pages/index.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        contact: resolve(__dirname, "src/pages/contact.html"),
        project: resolve(__dirname, "src/pages/project.html"),
        services: resolve(__dirname, "src/pages/services.html"),
      },
    },
  },
});
