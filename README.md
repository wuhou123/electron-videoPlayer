# 基本信息

## 项目简介

一套基于 electron6.0 + vue-cli3 + vuetify 的桌面端应用, 开发了视频资源列表展示，搜索，播放功能，主要用于测试和学习。

## 体验

windows 系统可以 [下载应用](https://github.com/wuhou123/electron-videoPlayer/releases)
[document](https://wuhou123.gitee.io/vuepress)

## 依赖

```bash
{
  "name": "electron-vue3",
  "version": "1.0.0",
  "private": true,
  "author": "yf",
  "license": "MIT",
  "description": "a demo",
  "scripts": {
    "serve": "vue-cli-service serve",
    "pr-build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "build": "vue-cli-service electron:build",
    "electron:build2": "vue-cli-service electron:build --win msi",
    "dev": "vue-cli-service electron:serve",
    "postinstall": "electron-builder install-app-deps",
    "postuninstall": "electron-builder install-app-deps"
  },
  "main": "background.js",
  "dependencies": {
    "@shopify/draggable": "^1.0.0-beta.8",
    "axios": "^0.19.0",
    "core-js": "^3.3.2",
    "dayjs": "^1.8.17",
    "electron-store": "^5.1.0",
    "element-ui": "^2.12.0",
    "lokijs": "^1.5.8",
    "lowdb": "^1.0.0",
    "vue": "^2.6.10",
    "vue-dplayer": "^0.0.10",
    "vue-router": "^3.1.3",
    "vuetify": "^2.1.12",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^4.0.0",
    "@vue/cli-plugin-eslint": "^4.0.0",
    "@vue/cli-plugin-router": "^4.0.0",
    "@vue/cli-plugin-vuex": "^4.0.0",
    "@vue/cli-service": "^4.0.0",
    "@vue/eslint-config-standard": "^4.0.0",
    "babel-eslint": "^10.0.3",
    "electron": "^6.0.0",
    "eslint": "^5.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "lodash": "^4.17.15",
    "node-sass": "^4.12.0",
    "sass": "^1.23.7",
    "sass-loader": "^8.0.0",
    "vue-cli-plugin-electron-builder": "^1.4.2",
    "vue-template-compiler": "^2.6.10",
    "vuetify-loader": "^1.4.2"
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ],
  "__npminstall_done": false
}
```

**注意： vue-cli3 版本下安装配置 vue-cli-plugin-electron-builder，sass-loader8.0 配置全局变量变化**

## 安装概述

#### 准备

1. electron 安装打包依赖文件，建议使用 cnpm
2. 尝试升级依赖包版本注意兼容问题

#### 开发

1. cnpm install
2. yarn dev 开发环境调试
3. yarn build 打包输出安装包

#### 生产

`vue.config.js`包含 electron-builder 的配置文件。

1. 运行`yarn build`输出至 dist 目录
2. 安装，愉快的玩耍

## 扫盲

[electron 了解入门](https://segmentfault.com/a/1190000019426512)
