const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~plugins/element-ui/element-ui.js',
      ssr: true,
    },
    // {
    //   src: '~/plugins/util/Api/Api.js',
    //   ssr: true,
    // }
  ],
  // axios: {
  //   debug: process.env._ENV =="production"?false:true,
  //   withCredentials:true,
  // },
  // proxy: {
  //   '/api': {
  //     target: 'https://127.0.0.1:3001', 
  //     changeOrigin: true,
  //     secure: false
  //     // pathRewrite: {
  //     //   '^/api': '/api',
  //     // },
  //   }
  // },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // '@nuxtjs/axios',
    // '@nuxtjs/proxy'
    ['cookie-universal-nuxt', { alias: 'cookie' }]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
