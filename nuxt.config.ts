import {resolve} from "path";

export default defineNuxtConfig({
    css: [
        "~/assets/scss/themes/dark/app-dark.scss",
        "~/assets/scss/app.scss",
        "~/assets/scss/iconly.scss",
        "~/assets/css/iransans.css",
        "~/assets/css/overwrite.css",
    ],
    router: {
        middleware: "auth",
    },
    ssr: false,
    hooks: {
        "pages:extend"(pages) {
            // Add fixed page
            //   pages.push({
            //     name: 'login',
            //     path: '/pages/login',
            //     file: resolve(__dirname, 'pages/login.vue'),
            //   });
        },
    },
    plugins: [{src: "~/plugins/bootstrap.client", mode: "client"}, "~/plugins/vue-persian-datetime-picker.js",],
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/google-fonts",
        "@nuxtjs/color-mode",
        "@vite-pwa/nuxt",
        "nuxt3-leaflet",
    ],

    pwa: {
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
        manifest: {
            "name": " نظارت  کارافرینی ",
            "short_name": " نظارت کارافرینی  ",
            "lang": "en",
          "start_url": "/",
          "display": "standalone",
          "background_color": "#000000",
          "theme_color": "#14213D",
            icons: [
              {
                "src": "/icons/android-chrome-16x16.png",
                "sizes": "16x16",
                "type": "image/png"
              },
              {
                "src": "/icons/android-chrome-24x24.png",
                "sizes": "24x24",
                "type": "image/png"
              },   {
                "src": "/icons/android-chrome-32x32.png",
                "sizes": "32x32",
                "type": "image/png"
              },   {
                "src": "/icons/android-chrome-57x57.png",
                "sizes": "57x57",
                "type": "image/png"
              },   {
                "src": "/icons/android-chrome-60x60.png",
                "sizes": "60x60",
                "type": "image/png"
              },   {
                "src": "/icons/android-chrome-64x64.png",
                "sizes": "64x64",
                "type": "image/png"
              },   {
                "src": "/icons/android-chrome-72x72.png",
                "sizes": "72x72",
                "type": "image/png"
              },   {
                "src": "/icons/android-chrome-76x76.png",
                "sizes": "76x76",
                "type": "image/png"
              },   {
                "src": "/icons/android-chrome-114x114.png",
                "sizes": "114x114",
                "type": "image/png"
              },  {
                "src": "/icons/android-chrome-120x120.png",
                "sizes": "120x120",
                "type": "image/png"
              },  {
                "src": "/icons/android-chrome-144x144.png",
                "sizes": "144x144",
                "type": "image/png"
              },  {
                "src": "/icons/android-chrome-180x180.png",
                "sizes": "180x180",
                "type": "image/png"
              },
              {
                "src": "/icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
              },
              {
                "src": "/icons/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
              },
              {
                "src": "/icons/android-chrome-maskable-16x16.png",
                "sizes": "16x16",
                "type": "image/png",
                "purpose": "maskable"
              },   {
                "src": "/icons/android-chrome-maskable-24x24.png",
                "sizes": "24x24",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-32x32.png",
                "sizes": "32x32",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-57x57.png",
                "sizes": "57x57",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-60x60.png",
                "sizes": "60x60",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-64x64.png",
                "sizes": "64x64",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-72x72.png",
                "sizes": "72x72",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-76x76.png",
                "sizes": "76x76",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-114x114.png",
                "sizes": "114x114",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-120x120.png",
                "sizes": "120x120",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-144x144.png",
                "sizes": "144x144",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-180x180.png",
                "sizes": "180x180",
                "type": "image/png",
                "purpose": "maskable"

              },
              {
                "src": "/icons/android-chrome-maskable-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "/icons/android-chrome-maskable-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
              }
            ]
        }
      ,
      head: {
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          }
        ]
      },
        devOptions: {
            enabled: true,
            type: "module",
        },
    },
    colorMode: {
        classPrefix: "theme-",
        classSuffix: "",
    },
    googleFonts: {
        families: {
            Nunito: true,
        },
    },
    components:true,
  devServer:{
      https:true
  }
});
