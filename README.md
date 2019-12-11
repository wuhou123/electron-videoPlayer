
## 安装流程
### 前置条件
1. 由于国内网络问题，安装淘宝源的cnpm
  `npm install cnpm -g`
2. 要求含有vue-cli3
  `cnpm install @vue/cli`

### 开发环境
1. clone本 repo
2. 运行`cnpm install` 安装依赖
3. 运行`cnpm run electron:serve`运行本项目

### 生产环境
`vue.config.js`包含electron-builder的配置文件。
1. 运行`cnpm run electron:build`输出至dist目录

--------------
打包可能会超时, 这些作为本人记录，如果遇到问题，qq问我。
1. 进入C:\Users\Hao Peng\AppData\Local\electron-builder\Cache
2. 建立文件夹nsis和winCodeSign
3. 下载报错中提示的软件版本，并放入对应文件夹
--------------

## 项目简介
### 架构说明
Electron分为Main进程（主进程）和Renderer进程（渲染进程）

主进程为Node.js服务端环境，负责数据库处理，文件处理

渲染进程为基于Vue.js的HTML环境

主进程会将渲染进程的html，创建window，挂载html运行

主进程与渲染进程通过electron包提供的ipcMain和ipcRenderer进行进程通讯。会采用封装的Payload和事件总线进行事件传递，见后文。

#### 主进程
1. electron + electron-builder：桌面端封装工具
2. lowdb: 基于json的数据库

#### 渲染进程
1. vue.js + vue-router + vuex + vue-cli-electron-builder-plugin：renderer架构
2. element-ui: 前端组件库

### 文件结构
1. build文件夹
    存放打包需要的文件，目前只有icon
2. public文件夹
    * 静态文件夹
    * 包含渲染进程favcon.ico,index.html等静态文件
    * 包含主进程中的db存储，excel文件读写
3. src文件夹
    * 项目代码
    * -assets: 渲染进程静态文件夹
    * -biz: 主进程业务代码
    * -components: Vue.js组件
    * -plugins: Vue.js插件
    * -router: Vue-router
    * -store: Vuex
    * -views: Vue.js主视图
    * background.js: 主进程入口
    * main.js 渲染进程入口
4. vue.config.js
    * vue-cli3的配置文件
    * 内置[electron-builder插件](https://nklayman.github.io/vue-cli-plugin-electron-builder/)的配置。


