import Store from 'electron-store';

const store = new Store({
  name: 'user-perferences',
  defaults: {
    windowBounds: { x: undefined, y: undefined },
    disableGlobalShortcut: false,
    defaultGlobalShortcut: 'CommandOrControl+Shift+E',
  },
});

export default store;
