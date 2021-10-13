import { contextBridge, ipcRenderer } from 'electron';
import { TO_MAIN, FROM_MAIN } from '../src/shared';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data: any) => {
    if (TO_MAIN.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, response: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, ...args) => {
      if (FROM_MAIN.includes(channel)) {
        return response(...args);
      }
    });
  },
});
