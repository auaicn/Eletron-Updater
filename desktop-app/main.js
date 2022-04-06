const { app, BrowserWindow } = require("electron");
const path = require("path");
const dotenv = require("dotenv");

const assertIfPhaseNotGiven = () => {
  if ("phase" in process.env) {
    console.log("selected enviornment is", process.env["phase"]);
  } else {
    throw new Error("phase not given");
  }
};

const assertIfAPIKeyNotGiven = () => {
  if ("api_key" in process.env) {
    console.log("api_key is", process.env["api_key"]);
  } else {
    throw new Error("api_key not given");
  }
};

assertIfPhaseNotGiven();
assertIfAPIKeyNotGiven();

const createWindow = () => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "please provide title in index.html",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  browserWindow.loadFile("index.html");
};

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
