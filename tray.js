const path = require('path');
const electron = require('electron');
const platform = require('os').platform();
const windows = require('./app/windows');

const app = electron.app;
let tray = null;

exports.create = (win) => {
  if (tray) {
    return;
  }

  let iconPath = null;
  if (platform === 'win32') {
    iconPath = path.join(__dirname, 'assets/icons/win/icon.ico');
  } else if (platform === 'darwin') {
    if (electron.nativeTheme.shouldUseDarkColors) {
      iconPath = path.join(__dirname, 'assets/icons/mac/trayIcon@2x.png');
    } else {
      iconPath = path.join(__dirname, 'assets/icons/mac/trayIcon_light@2x.png');
    }
  } else {
    iconPath = path.join(__dirname, 'assets/icons/png/24x24.png');
  }

  const toggleWindow = () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
      win.webContents.send('window-open');
    }
  };

  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Toggle',
      click() {
        toggleWindow();
      },
    },
    {
      label: 'About',
      click() {
        windows.about.init();
      },
    },
    {
      type: 'separator',
    },
    {
      role: 'quit',
    },
  ]);

  tray = new electron.Tray(iconPath);
  tray.setToolTip(`${app.name}`);
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWindow);
};
