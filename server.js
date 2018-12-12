const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const socketIo = require("socket.io");
const fse = require('fs-extra');
let path = require('path');


app.get('/', (req, res) => {
   res.send('Welcome to my Rest API');
});

const server = http.createServer(app);
socketIo.listen(server);
server.listen(port);

setInterval(() => {
    let hour = new Date().getHours();
    let min = new Date().getMinutes();
    if (hour === 23 && min >= 58 && min < 59) {
        let parentDir = path.resolve(process.cwd());
        fse.remove(parentDir + '/generatedPackage', err => {
            if (err) return console.error(err)
        })
    }
}, 30000);