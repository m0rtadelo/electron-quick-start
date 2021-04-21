const {app, BrowserWindow} = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('client/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('post', async (event, ...args) => {
    console.log({event, args});
    return { data: `You say: ${args[0]}`, status: 200, payload: args };
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})