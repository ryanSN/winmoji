const {app, BrowserWindow} = require('electron')
const path = require('path')

const mainPage = path.join('file://', __dirname, '/index.html')

const appName = 'winEmoji'
let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 280,
    height: 400,
    title: appName + ' - windows emoji helper',
    'min-height': 400,
    'max-width': 280,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  mainWindow.loadURL(mainPage)
  mainWindow.setMenu(null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('quit', () => {
  console.log('app quitting')
})
