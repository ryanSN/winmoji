const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')
const tray = require('./tray')
const Store = require('electron-config')
const store = new Store({
  configName: 'user-perferences',
  defaults: {
    windowBounds: { x: null, y: null }
  }
})

const mainPage = path.join('file://', __dirname, '/index.html')

const appName = 'winEmoji'
let mainWindow
let isQuitting = false

const createWindow = () => {
  let { x, y } = store.get('windowBounds')
  mainWindow = new BrowserWindow({
    width: 280,
    height: 400,
    title: appName + ' - windows emoji helper',
    'min-height': 400,
    'max-width': 280,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    x,
    y
  })
  mainWindow.loadURL(mainPage)
  mainWindow.setMenu(null)
  tray.create(mainWindow)

  mainWindow.on('close', e => {
    if (!isQuitting) {
      e.preventDefault()
      mainWindow.hide()
      let { x, y } = mainWindow.getBounds()
      store.set('windowBounds', { x, y })
    }
  })

  // register global shortcut
  const ret = globalShortcut.register('CommandOrControl+Shift+E', () => {
    if (!mainWindow.isVisible()) {
      mainWindow.show()
    } else {
      mainWindow.hide()
    }
  })

  if (!ret) {
    console.log('reg failed')
  }
}

app.on('will-quit', () => {
  // clean up after ourselves
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

app.on('ready', createWindow)

app.on('activate', () => {
  mainWindow.show()
})

app.on('before-quit', () => {
  isQuitting = true
  console.log(!mainWindow.isFullScreen())
})
