import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

autoUpdater.on('error', (ev, err) => {
  console.log('Event: ' + JSON.stringify(ev) + '. MESSAGE: ' + err);
});

autoUpdater.on('update-downloaded', (ev, info) => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on('update-available', () => {
  const message = 'A new version has been downloaded';
  dialog
    .showMessageBox({
      type: 'question',
      title: 'Update Available',
      defaultId: 0,
      message: message,
      buttons: ['Update and Restart', 'Later'],
    })
    .then((response) => {
      if (response.response === 0) {
        setTimeout(() => autoUpdater.quitAndInstall(), 1);
      }
    });
});

const checkForUpdates = () => {
  autoUpdater.autoDownload = false;

  autoUpdater.checkForUpdates();
};

export default checkForUpdates;
