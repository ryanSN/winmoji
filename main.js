const {app, BrowserWindow} = require('electron')
const path = require('path')

const mainPage = path.join('file://', __dirname, '/index.html')

let mainWindow
let isQuitting = false

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    'min-height': 800,
    'max-height': 1400
  })

  mainWindow.loadURL(mainPage)

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault()
      mainWindow.hide()
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('before-quit', () => {
  isQuitting = true
})
