const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: "src/main.js",
      title: "JANコード(JAN-13)作成ツール"
    }
  }
})
