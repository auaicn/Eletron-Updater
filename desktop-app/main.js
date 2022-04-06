require("./env.js");
const path = require("path");
const electron = require("electron");

/**
 * 창을 띄우지 않는 앱도 존재한다. MacOS 의 경우에는, Command+Q 를 통해 끌 수 있는 실제 "애플리케이션" 을 의미한다.
 * app 객체를 통해 app 의 lifecycle 을 조작할 수 있다.
 */
const { app } = electron;

/**
 * 실제 창을 의미한다.
 * 창 하나당, process 를 하나씩 가지는 것으로 보인다. (시스템 활성 상태에서 확인)
 */
const { BrowserWindow } = electron;

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
