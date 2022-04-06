window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const versionToKnow of ["chrome", "node", "electron", "package"]) {
    replaceText(`${versionToKnow}-version`, process.versions[versionToKnow]);
  }

  if ("phase" in process.env) {
    replaceText("phase", process.env["phase"]);
  }
});
