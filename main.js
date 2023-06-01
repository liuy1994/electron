require('update-electron-app')()
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow  = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)


  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
}

const handleSetTitle = (event, title) => {
  const webContent = event.sender
  const win = BrowserWindow.fromWebContents(webContent)
  win.setTitle(title)
}

const handlePing = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve("PING"), 2000)
  })
}

 const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // 单向通信，没有返回
  ipcMain.on("set-title", handleSetTitle)
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value)
  })

  // 双向通信，有返回
  ipcMain.handle("ping", handlePing)
  ipcMain.handle("dialog:openFile", handleFileOpen)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
