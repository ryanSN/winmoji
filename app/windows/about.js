const electron = require('electron')
const path = require('path')

const init = () => {
  if (about.win) {
    return about.win.show()
  }

  const win = (about.win = new electron.BrowserWindow({
    backgroundColor: '#ECECEC',
    center: true,
    fullscreen: false,
    height: 200,
    icon: getIconPath(),
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    skipTaskbar: true,
    title: 'About WinMoji',
    useContentSize: true,
    width: 300,
    webPreferences: {
      nodeIntegration: true
    }
  }))

  win.loadURL(path.join(__dirname, '../static/about.html'))

  win.setMenu(null)

  win.once('ready-to-show', function () {
    win.show()
  })

  win.once('closed', () => {
    about.win = null
  })
}

const getIconPath = () => {
  return path.join(__dirname, '../../assets/icons/png/64x64.png')
}

const about = (module.exports = {
  init,
  win: null
})
