const { app, BrowserWindow, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const tray = require('./helpers/tray');
const updater = require('./helpers/updater');
const { activateUser } = require('./helpers/analytics');
const store = require('./store');

require('v8-compile-cache');

const mainPage = path.join('file://', __dirname, '/windows/index.html');

const appName = 'winEmoji';
let mainWindow;
let isQuitting = false;

const createWindow = () => {
  const { x, y } = store.get('windowBounds');
  mainWindow = new BrowserWindow({
    width: 280,
    height: 400,
    title: appName + ' - windows emoji helper',
    'min-height': 400,
    'max-width': 280,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    x,
    y,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(mainPage);
  mainWindow.setMenu(null);
  tray.create(mainWindow);

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
      const { x, y } = mainWindow.getBounds();
      store.set('windowBounds', { x, y });
    }
  });

  // register global shortcut
  globalShortcut.register('CommandOrControl+Shift+E', () => {
    if (!mainWindow.isVisible()) {
      mainWindow.show();
      mainWindow.webContents.send('window-open');
    } else {
      mainWindow.hide();
    }
  });
};

const lockSingleInstance = app.requestSingleInstanceLock();

if (!lockSingleInstance) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLink, workingDirectory) => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
        mainWindow.webContents.send('window-open');
      }
    }
  });

  app.on('will-quit', () => {
    // clean up after ourselves
    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+Shift+E');

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });

  app.on('ready', () => {
    createWindow();
    if (!isDev) {
      updater.checkForUpdates();
    }
  });

  app.on('activate', () => {
    mainWindow.show();
    mainWindow.webContents.send('window-open');
  });

  app.on('before-quit', () => {
    isQuitting = true;
  });

  activateUser();
}
