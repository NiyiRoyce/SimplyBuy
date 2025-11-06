const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',          // bind to all network interfaces
    port: 8080,
    hot: true,
    client: {
      webSocketURL: 'auto://0.0.0.0:8080/ws', // let Vue CLI auto-detect HTTPS vs HTTP
    },
  }
})
