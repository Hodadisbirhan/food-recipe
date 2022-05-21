
import { fileURLToPath, URL } from 'url'
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

export default {
  plugins: [Vue(), Pages(),  Layouts(
    // layoutsDir: 'src/mylayouts',
    // defaultLayout: 'myDefault'
  ),Components()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};