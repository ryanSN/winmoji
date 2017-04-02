const path = require('path')
const electron = require('electron')

const app = electron.app
let tray = null

exports.create = win => {
  if (tray) {
    return
  }

  const iconPath = path.join(__dirname, 'assets/icons/win/icon.ico')

  const toggleWindow = () => {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  }

  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Toggle',
      click () {
        toggleWindow()
      }
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }
  ])

  tray = new electron.Tray(iconPath)
  tray.setToolTip(`${app.getName()}`)
  tray.setContextMenu(contextMenu)
  tray.on('click', toggleWindow)
}
