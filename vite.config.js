

import { defineConfig } from 'vite';

export default defineConfig({
      plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: '/',
        about: '/src/pages/about.html',
        contact: '/src/pages/contact.html',
        project: '/src/pages/project.html',
        services: '/src/pages/services.html',
      }
    }
  }
});
