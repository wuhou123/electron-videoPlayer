'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray,
  shell,
  Notification
} from 'electron'
// import { establishConnection } from './biz/channel/connection'
const path = require('path')
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Menu.setApplicationMenu(null)

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }

  // 最小化窗口
  ipcMain.on('mainWindow:minimize', () => {
    mainWindow.minimize()
  })
  // 最大化窗口
  ipcMain.on('mainWindow:maximize', () => {
    mainWindow.maximize()
  })
  // 从最大化窗口恢复
  ipcMain.on('mainWindow:restore', () => {
    mainWindow.restore()
  })
  // 关闭窗口
  ipcMain.on('mainWindow:close', event => {
    mainWindow.hide()
    mainWindow.setSkipTaskbar(true)
    createdNotice()
    event.preventDefault()
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

/**
 * 创建通知
 */
let minNum = 0
function createdNotice() {
  if (minNum > 0) return
  minNum++
  // 通知图标
  const iconNoticePath = `${__static}/logo.png`
  let notification = new Notification({
    title: '加菲猫', // 通知的标题, 将在通知窗口的顶部显示
    body: '已将加菲猫放入此处,可以在右下角找到我！', // 通知的正文文本, 将显示在标题或副标题下面
    icon: iconNoticePath, // 用于在该通知上显示的图标
    silent: true // 在显示通知时是否发出系统提示音
  })
  notification.show()
  notification.on('click', () => {
    notification.close()
  })
}

// 托盘对象
let appTray = null
// 是否可以退出
let trayClose = false
// 系统托盘右键菜单
let trayMenuTemplate
// 系统托盘图标
let iconPath
// 图标的上上下文
let contextMenu
// 图标闪烁定时器
let flashTrayTimer
// 单一实例
const gotTheLock = app.requestSingleInstanceLock()
/**
 * 设置系统托盘
 */
function createTray() {
  // 是否可以退出
  trayClose = false

  // 系统托盘图标
  iconPath = `${__static}/logo.png`
  let iconMessagePath = `${__static}/logo.png`
  let iconTransparentPath = `${__static}/iconTransparent.png`

  if (process.platform === 'win32') {
    iconPath = `${__static}/favicon.ico`
    iconMessagePath = `${__static}/favicon.ico`
    iconTransparentPath = `${__static}/iconTransparent.ico`
  }

  // 系统托盘右键菜单
  trayMenuTemplate = [
    {
      label: '崩溃报告测试 process.crash()',
      click: function() {
        process.crash()
      }
    },
    {
      label: '崩溃报告测试throw new Error',
      click: function() {
        throw new Error('Error test in main progress')
      }
    },
    {
      label: '托盘闪烁',
      click: function() {
        // 判断如果上一个定时器是否执行完
        if (flashTrayTimer) {
          return
        }

        //系统托盘图标闪烁
        appTray.setImage(iconMessagePath)
        let count = 0
        flashTrayTimer = setInterval(function() {
          count++
          if (count % 2 == 0) {
            appTray.setImage(iconTransparentPath)
          } else {
            appTray.setImage(iconMessagePath)
          }
        }, 600)
      }
    },
    // {
    //   label: '关于项目',
    //   click: function() {
    //     shell.openExternal('')
    //   }
    // },
    {
      label: '退出',
      click: function() {
        // 退出
        trayClose = true
        app.quit()
      }
    }
  ]

  appTray = new Tray(iconPath)
  // 图标的上上下文
  contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
  // 设置此托盘图标的悬停提示内容
  appTray.setToolTip('加菲猫 - for freedom and fun')
  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu)
  // 主窗口显示隐藏切换
  appTray.on('click', () => {
    // 清楚图标闪烁定时器
    clearInterval(flashTrayTimer)
    flashTrayTimer = null
    // 还原图标
    appTray.setImage(iconPath)
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

/**
 * 单一实例
 */
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
  })

  // 创建 mainWindow, 加载应用的其余部分, etc...
  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      try {
        await installVueDevtools()
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
    createWindow()
    createTray()
  })
}
