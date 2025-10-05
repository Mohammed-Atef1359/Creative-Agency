import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "/index.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "src/pages/contact.html"),
        project: resolve(__dirname, "src/pages/project.html"),
        services: resolve(__dirname, "src/pages/services.html"),
      },
    },
  },
});
