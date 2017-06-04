const {dialog} = require('electron')
const { autoUpdater } = require('electron-updater')

autoUpdater.on('error', (ev, err) => {
  console.log('Event: ' + JSON.stringify(ev) + '. MESSAGE: ' + err)
})

autoUpdater.on('update-downloaded', (ev, info) => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, winMoji will quit for update...'
  }, () => {
    // restart and install
    autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'question',
    title: 'Update Available',
    message: 'Update to winMoji available. Would you like to update now?',
    buttons: ['Update & Restart', 'Cancel']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    }
  })
})

const checkForUpdates = () => {
  autoUpdater.checkForUpdates()
}

module.exports.checkForUpdates = checkForUpdates
