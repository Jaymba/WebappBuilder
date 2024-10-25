const { app, BrowserWindow } = require('electron/main')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.removeMenu()
  win.loadURL('https://tbs.toshiba.com/tbs/')
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