import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

import { version as pkgVersion } from './package.json'

process.env.VITE_APP_VERSION = pkgVersion
if (process.env.NODE_ENV === 'production')
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()

export default defineConfig({
  base: '/',
  clearScreen: false,
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        'pinia',
        {
          '@/store/index': ['useStore', 'mainType'],
        },
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      resolvers: [NaiveUiResolver()],
    }),
    VueSetupExtend(),
  ],
  server: {
    host: '0.0.0.0',
    port: 8100,
    proxy: {
      '/api/': {
        target: 'http://stbs-auth-back.ss.gofund.cn/',
        ws: false,
        changeOrigin: true,
      },
      '/v1/': {
        target: 'http://stbs-auth-back.ss.gofund.cn/',
        ws: false,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/global.scss";',
      },
    },
  },
  build: {
    assetsDir: 'static',
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
