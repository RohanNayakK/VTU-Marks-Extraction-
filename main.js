// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const { spawn } = require('child_process');
const { electron } = require('process');
const { ipcMain } = require('electron')





function createWindow () {
  // Create the browser window.
   const mainWindow = new BrowserWindow({
   

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  function getPlaylist(name) {
    return new Promise((resolve , reject) => {
        const childPython = spawn('python' ,['fetch.py', name]);
        let result='';
        childPython.stdout.on(`data` , (data) => {
            result = data.toString();
        });
    
        childPython.on('close' , function(code) {
          
            resolve(result)
        });

        childPython.on('error' , function(err){
            reject(err)
        });

    })
  };


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // mainWindow.maximize()


  ipcMain.on("callPython",async (event,data)=>{
    console.log("backend call")
    try{
      let res = await getPlaylist("4CB19IS047")
      console.log(res)
    }
    catch(err){
      console.error(err)
    }







    // const python = spawn('python', ['demo.py']);
    // python.stdout.on('data', function(data) {
    //   console.log("Success")
    //   console.log(data)
    // })

  })


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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










