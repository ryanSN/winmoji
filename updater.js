const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const pkg = require('./package.json')

autoUpdater.on('error', (ev, err) => {
  console.log('Event: ' + JSON.stringify(ev) + '. MESSAGE: ' + err)
})

autoUpdater.on('update-downloaded', (ev, info) => {
  autoUpdater.quitAndInstall()
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox(
    {
      type: 'question',
      title: 'Update Available',
      message: 'Update to winMoji available. Would you like to update now?',
      buttons: ['Update and Restart', 'Cancel']
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        return autoUpdater.downloadUpdate()
      }
    }
  )
})

const checkForUpdates = () => {
  autoUpdater.currentVersion = pkg.version
  autoUpdater.autoDownload = false

  autoUpdater.checkForUpdates()
}

module.exports.checkForUpdates = checkForUpdates
