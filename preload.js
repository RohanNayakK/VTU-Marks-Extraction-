
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

ipcRenderer.on('generationComplete', (msg) => {
  let cancelBtn = document.getElementById("cancelBtn")
  let detailsFormFieldSet2 = document.getElementById("detailsFormFieldSet2")
  let detailsForm2= document.getElementById('detailsForm2')
  detailsFormFieldSet2.remove()
  alert("Successfully Generated")

  let alertMessage = document.createElement("div")
  alertMessage.classList.add("alertMessageSuccess")
  alertMessage.innerText= "Successfully Completed, check generated file in mentioned path"

  

  detailsForm2.appendChild(alertMessage)
  cancelBtn.innerText ="Home"
  detailsForm2.appendChild(cancelBtn)
  
  
  
})