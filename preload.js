
// All of the Node.js APIs are available in the preload process.

const { ipcRenderer, contextBridge } = require("electron")

// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  console.log("Hello")

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

let sendSubmit=(dataObj)=>{
  ipcRenderer.send("callPython",dataObj)
}

let indexBridge={
  sendSubmit :sendSubmit
}


contextBridge.exposeInMainWorld("Bridge",indexBridge)