import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        registro: resolve(__dirname, 'registro.html'),
        dashboard: resolve(__dirname, 'pages/dashboard.html'),
        autores_list: resolve(__dirname, 'pages/autores/index.html'),
        autores_form: resolve(__dirname, 'pages/autores/form.html'),
        livros_list: resolve(__dirname, 'pages/livros/index.html'),
        livros_form: resolve(__dirname, 'pages/livros/form.html'),
        cliente_dashboard: resolve(__dirname, 'cliente/dashboard-cliente.html'),
      },
    },
  },
});
