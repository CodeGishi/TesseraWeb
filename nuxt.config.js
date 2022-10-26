export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TesseraWeb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      // {
      //   href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
      //   rel: 'stylesheet',
      // },

      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
        rel: 'stylesheet',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/normalize.css',
    '@/assets/css/reset.css',
    '@/assets/css/global.css',
    '@/assets/css/tooltip.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/tesseraAPI.js' },
    { src: '~/plugins/tooltip.js' },
    // { src: '~/plugins/scroll-lock.js', mode: 'client' },
    { src: '~/plugins/generator.js' },
    { src: '~/plugins/zxcvbn.js' },
    { src: '~/plugins/uuid.js' },
    // { src: '~/plugins/aes256/aes256.js' },
    { src: '~/plugins/secret.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    // Equivalent to { path: '~/components' }
    '~/components',
    '~./components/shared/image/',
    '~./components/shared/icon/',
    '~./components/shared/button/',
    '~./components/shared/card/',
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // https://github.com/chantouchsek/nuxt-clipboard#readme
    'nuxt-clipboard',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  // },
  styleResources: {
    scss: [
      '~assets/scss/variables.scss',
      '~assets/scss/_mixins.scss',
      '~/assets/scss/style.scss',
    ],
  },

  /* Clipboard configuration */
  clipboard: {
    autoSetContainer: true,
  },

  serverMiddleware: {
    '/api': '~/api',
  },

  router: {
    middleware: ['check-auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  watchers: {
    webpack: {
      ignored: /node_modules/, // ignore node_modules
    },
    chokidar: {
      ignored: /api/, // ignore api folder
    },
  },

  env: {
    DEBUG: false,
    dev: process.env.NODE_ENV !== 'production',
  },
}
