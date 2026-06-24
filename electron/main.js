const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let backendProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "../frontend/dist/index.html"));

  // Uncomment for debugging
  // win.webContents.openDevTools();

  win.on("closed", () => {
    if (backendProcess) {
      backendProcess.kill();
    }

    app.quit();
  });
}

app.whenReady().then(() => {
  const backendPath = app.isPackaged
    ? path.join(process.resourcesPath, "app.asar.unpacked", "backend")
    : path.join(__dirname, "../backend");

  console.log("Backend Path:", backendPath);

  backendProcess = spawn("npm", ["start"], {
    cwd: backendPath,
    shell: true,
  });

  backendProcess.stdout.on("data", (data) => {
    console.log(`Backend: ${data}`);
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(`Backend Error: ${data}`);
  });

  backendProcess.on("error", (err) => {
    console.error("Failed to start backend:", err);
  });

  backendProcess.on("exit", (code) => {
    console.log("Backend exited with code:", code);
  });

  setTimeout(() => {
    createWindow();
  }, 3000);
});

app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill();
  }

  app.quit();
});
