const Store = require('electron-store');

const store = new Store({
  configName: 'user-perferences',
  defaults: {
    windowBounds: { x: null, y: null },
  },
});

module.exports = store;
