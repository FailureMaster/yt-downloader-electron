const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Only require ytdl when needed to avoid loading issues
let ytdl;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true, // Hides menu bar (can be shown with Alt key)
    // OR use this to completely remove it:
    // frame: false, // Removes title bar and menu completely
    icon: path.join(__dirname, 'icon.png') // You can add an icon later
  });

  // Alternative: Set menu to null to remove it completely
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile('app.html');
  
  // Optional: Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle download request from renderer process
ipcMain.handle('download-video', async (event, url, quality) => {
  try {
    // Load ytdl only when needed
    if (!ytdl) {
      ytdl = require('@distube/ytdl-core');
    }
    
    // Get video info
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s-]/gi, '');
    
    // Show save dialog
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Save Video',
      defaultPath: `${title}.mp4`,
      filters: [
        { name: 'MP4 Videos', extensions: ['mp4'] }
      ]
    });
    
    if (result.canceled) {
      return { success: false, message: 'Download canceled' };
    }
    
    const filePath = result.filePath;
    
    // Download video
    const qualityOption = quality === 'low' ? 'lowest' : quality === 'medium' ? 'highestvideo' : 'highest';
    
    return new Promise((resolve) => {
      const stream = ytdl(url, { 
        filter: 'videoandaudio',
        quality: qualityOption 
      });
      
      const writeStream = fs.createWriteStream(filePath);
      stream.pipe(writeStream);
      
      writeStream.on('finish', () => {
        resolve({ success: true, message: `Downloaded: ${title}`, path: filePath });
      });
      
      writeStream.on('error', (err) => {
        resolve({ success: false, message: `Error: ${err.message}` });
      });
    });
    
  } catch (err) {
    return { success: false, message: `Error: ${err.message}` };
  }
});