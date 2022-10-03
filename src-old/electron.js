const electron = require("electron");
const app = electron.app;
const fs = require("fs");

const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

console.log('foo');

fs.watch(path.join(__dirname), (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  if (filename) {
    if(filename == 'electron.js'){
      console.log(`filename provided: ${filename}`);
      app.relaunch();
      app.exit();
    }
  } else {
    console.log('filename not provided');
  }
});



let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680
  });

  // console.log(`file://${path.join(__dirname, "../src/index.html")}`);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../src/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.exit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
