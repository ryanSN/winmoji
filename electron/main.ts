import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import store from './utils/store';
import activateUser from './helpers/analytics';
import tray from './helpers/tray';
import updater from './helpers/updater';

const appName = 'winEmoji';
let mainWindow: BrowserWindow;
let isQuitting = false;

function createWindow() {
  const { x, y } = store.get('windowBounds');
  const disableGlobalShortcut = store.get('disableGlobalShortcut') || false;
  const defaultGlobalShortcut: string =
    store.get('defaultGlobalShortcut') || 'CommandOrControl+Shift+E';

  mainWindow = new BrowserWindow({
    width: 280,
    height: 400,
    title: appName + ' - windows emoji helper',
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    x,
    y,
    backgroundColor: store.get('isDarkMode') ? '#141e25' : '#ffffff',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    // 'build/index.html'
    mainWindow.loadURL(`file://${__dirname}/../index.html`);
    mainWindow.setMenu(null);
    tray(mainWindow);
  } else {
    mainWindow.loadURL('http://localhost:3000/index.html');

    mainWindow.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(
        __dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron' + (process.platform === 'win32' ? '.cmd' : '')
      ),
      forceHardReset: true,
      hardResetMethod: 'exit',
    });
  }

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
      const { x, y } = mainWindow.getBounds();
      store.set('windowBounds', { x, y });
    }
  });

  // register global shortcut
  if (!disableGlobalShortcut) {
    globalShortcut.register(defaultGlobalShortcut, () => {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
        mainWindow.webContents.send('window-open');
      } else {
        mainWindow.hide();
      }
    });
  }

  app.on('will-quit', () => {
    // clean up after ourselves
    // Unregister a shortcut.
    if (!disableGlobalShortcut) {
      globalShortcut.unregister(defaultGlobalShortcut);
    }
    globalShortcut.unregisterAll();
  });

  app.on('before-quit', () => {
    isQuitting = true;
  });
}

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

  app.whenReady().then(() => {
    // DevTools
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));

    createWindow();

    if (app.isPackaged) {
      updater();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
      mainWindow.webContents.send('window-open');
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  activateUser();
}

ipcMain.on('change-global-shortcut', (event, arg) => {
  console.log(arg);
});

app.setAppUserModelId('com.rchatters.winmoji');
