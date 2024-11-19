const { app, BrowserWindow } = require('electron/main')
const process = require('process')
const fs = require('fs')
const windowStateKeeper = require('electron-window-state');
const config = require('./config.json')



let url = config.URL
let useragent = config.UserAgent


const createWindow = () => {
  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
   defaultWidth: 1000,
   defaultHeight: 800
  });
  const win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height
  })

  mainWindowState.manage(win);
  win.removeMenu()
  win.loadURL(url, {userAgent: useragent})
}

app.commandLine.appendSwitch("no-proxy-server")
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})