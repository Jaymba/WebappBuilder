const { app, BrowserWindow } = require('electron/main')
const process = require('process')
const fs = require('fs')
const path = require('path')
const windowStateKeeper = require('electron-window-state');
const config = require('./config.json')



let url = config.URL
let useragent = config.UserAgent
// Datto variables arrive as strings, so accept "true" as well as true
let debug = config.Debug === true || config.Debug === 'true'


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
    'height': mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindowState.manage(win);
  win.removeMenu()
  win.loadURL(url, { userAgent: useragent })
}

// Open DevTools on every window, including popups the site opens
if (debug) {
  app.on('browser-window-created', (_e, win) => win.webContents.openDevTools())
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