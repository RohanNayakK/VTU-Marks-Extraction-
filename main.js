// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const { spawn } = require('child_process');
const { electron } = require('process');
const { ipcMain } = require('electron')

const { remote } = require('electron')
function createWindow () {
  // Create the browser window.
   const mainWindow = new BrowserWindow({
   

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
 


  function fetchResult(dataObject) {
    return new Promise((resolve , reject) => {
        const childPython = spawn('python' ,['fetch.py', dataObject.collegeCode, dataObject.year, dataObject.branch, dataObject.startusn, dataObject.lastusn,dataObject.path]);
        let result='';
        childPython.stdout.on(`data` , (data) => {
            result = data.toString();
            console.log(result)
        });
    
        childPython.on('close' , function(code) {
            resolve("200")
        });

        childPython.on('error' , function(err){
            reject(err)
        });

    })
  };
  
  ipcMain.on("callPython",async (event,data)=>{
    console.log(data)
    await fetchResult(data)
    mainWindow.loadFile(path.join(__dirname, 'success.html'))
  })


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.










