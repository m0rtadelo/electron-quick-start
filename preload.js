const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
  post: async (message) => await ipcRenderer.invoke('post', message)
});

