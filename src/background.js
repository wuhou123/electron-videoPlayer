'use strict'

import { app, protocol, BrowserWindow, ipcMain, Menu } from 'electron'
import { establishConnection } from './biz/channel/connection'
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
  ipcMain.on('mainWindow:close', () => {
    mainWindow.close()
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  establishConnection()
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

// ipcMain.on('messageA', function (e, arg) {
//   console.dir(arg)

//   e.reply('messageA-reply', readFile())
// })

// ipcMain.on('writeFile', function (e, fileName, content) {
//   writeFile(fileName, content)
// })

// ipcMain.on('readFile', function (e, fileName) {
//   e.reply('readFile-reply', readFile(fileName))
// })
