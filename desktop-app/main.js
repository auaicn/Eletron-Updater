const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");

  setTimeout(() => {
    win.close();
  }, 5000);
};

const win2 = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
  },
});
console.log("main process is running");
console.log(__dirname);

app.whenReady().then(() => {
  createWindow();

  // TODO - anyway, how to activate ?
  // 설치파일이 있으면, 가능한것으로 보인다.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // macOS platform 을 darwin 으로 부르는 듯 하다.
  if (process.platform !== "darwin") app.quit();
});
