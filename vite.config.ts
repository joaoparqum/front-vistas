import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vistas Explodidas - Casa do Construtor | Irecê', // Nome completo do app
        short_name: 'Vistas Explodidas', // Nome curto para atalhos
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff', // Cor de fundo
        theme_color: '#0404cf', // Cor do tema (corrige o aviso)
        icons: [
          {
            "src": "/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
        ],
      },
    }),
  ],
});
