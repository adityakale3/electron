const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const fs = require('fs');
var win;
var filePathResult = undefined;

app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile('index.html');
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

ipcMain.on('save', (event, data) => {
    if(filePathResult === undefined){
    // Show save dailog

    dialog.showSaveDialog(win, {title:'test'})
        .then((savePath) => {
            console.log('File', savePath);
            filePathResult = savePath.filePath;
            writeToFile(data);
    }).catch((err) => {
        console.log(err);
    });
}else{
    writeToFile(data);
}

});

function writeToFile(data){
    fs.writeFile(filePathResult, data, (err) => {
        if(err) console.log('Some Error', err);
        win.webContents.send('saved', 'success');
    });
}


// Menu template

var menuTemplate = [

        {
            label : "BMS",
            submenu : [
                {
                    label : "Home",
                    accelerator : "CmdOrCrtl+S",
                    click(){ console.log('Aaai chya gawat'); }
                },
                {
                    label : "DTA",
                    click(){ console.log('Finally'); }
                }
            ]
        },
        {role: "editMenu"}
]