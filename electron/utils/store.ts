import { nativeTheme } from 'electron';
import Store from 'electron-store';

type StoreProps = {
  userId: string;
  isDarkMode: boolean;
  windowBounds: { x: number | undefined; y: number | undefined };
  disableGlobalShortCut: boolean;
  defaultGlobalShortCut: string;
};

const store = new Store<StoreProps>();

if (store.get('isDarkMode') === null) {
  store.set('isDarkMode', nativeTheme.shouldUseDarkColors);
}

if (store.get('disableGlobalShortCut') === null) {
  store.set('disableGlobalShortCut', false);
}

if (store.get('defaultGlobalShortCut') === null) {
  store.set('defaultGlobalShortCut', 'CommandOrControl+Shift+E');
}

// const store = new Store({
//   name: 'user-perferences',
//   defaults: {
//     windowBounds: { x: undefined, y: undefined },
//     disableGlobalShortcut: false,
//     defaultGlobalShortcut: 'CommandOrControl+Shift+E',
//   },
// });

export default store;
