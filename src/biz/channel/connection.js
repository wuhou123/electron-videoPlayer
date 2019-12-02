const { ipcMain } = require('electron')
const routes = require('./routes')

const establishConnection = () => {
  Object.keys(routes).forEach((routeName) => {
    console.log(routeName)
    ipcMain.on(routeName, (e, params) => {
      routes[routeName]({
        params,
        callback: (respond) => {
          e.sender.send(routeName, respond)
        }
      })
    })
  })
}

export {
  establishConnection,
}