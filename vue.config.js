module.exports = {
  chainWebpack: config => {
    ;['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(match => {
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt =>
          Object.assign(opt, { prependData: `@import '@/scss/variable.scss';` })
        )
    })
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.example.app',
        productName: 'test-app',
        directories: {
          buildResources: './build',
          output: './dist'
        },
        win: {
          //win相关配置
          icon: './build/icon2.png', //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: 'nsis', //利用nsis制作安装程序,
              arch: [
                'x64', //64位
                'ia32' //32位
              ]
            }
          ]
        },
        nsis: {
          allowToChangeInstallationDirectory: true,
          oneClick: false
        }
      }
    }
  }
}
