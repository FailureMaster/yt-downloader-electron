const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  downloadVideo: (url, quality) => ipcRenderer.invoke('download-video', url, quality)
});