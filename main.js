const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Check if we are running in dev mode or prod mode
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    // In dev, load Vite's dev server
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In prod, load the built index.html
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function startBackend() {
  // Spawn the Node.js backend
  const serverPath = path.join(__dirname, 'backend', 'server.js');
  backendProcess = spawn('node', [serverPath], {
    cwd: path.join(__dirname, 'backend'),
    env: { ...process.env, PORT: 5000 }
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend stderr: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  startBackend();
  
  // Give the backend a second to start before opening the window
  setTimeout(() => {
    createWindow();
  }, 1000);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  // Ensure the backend process is killed when the app quits
  if (backendProcess) {
    backendProcess.kill();
  }
});
