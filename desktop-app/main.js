const { app, BrowserWindow } = require("electron");
const path = require("path");

const logSelectedEnvionmentToConsole = () => {
  const prefix = "selected enviornment is";
  if ("enviornment" in process.env) {
    console.log(prefix, process.env["enviornment"]);
  } else {
    console.log(prefix, "UNKNOWN");
  }
};

const createWindow = () => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: false,
    resizable: false,
    movable: false,
    closable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  browserWindow.loadFile("index.html");
};

logSelectedEnvionmentToConsole();

app.whenReady().then(() => {
  createWindow();

  // TODO - anyway, how to activate ?
  // 설치파일이 있으면, 가능한것으로 보인다.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // macOS platform 을 darwin 이라 부르는 듯 하다.
  if (process.platform !== "darwin") app.quit();
});
