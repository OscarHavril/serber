var http = require('http');
//var dt = require('./module');
var url = require('url');
var fs = require('fs');
var logs = [];
//var parties = [];
function shuffle(array) {
    for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
}
function randomAdress(len) {
    var char = "1234567890abcdefghijklmnopqrstuvwxyz".split('');
    var str = shuffle(char);
    str = str.join();
    srt = str.substring(0, len);
    return str;
}
const hostname = '51.91.159.136';
const port = 3333;
var party;
const server = http.createServer((req, res) => {
    function sendFile(file) {
        fs.readFile('./' + file + '.html', 'utf-8', function (error, content) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content);
        });
    }
    //var ip = res.header('x-forwarded-for') || res.connection.remoteAddress;
    party = (url.parse(req.url).pathname).slice(1);
    res.statusCode = 200;
    if (!party) {
        sendFile('home');
    } else {
        switch (party) {
            case "project":
                sendFile("theButtonCh1");
                break;
            case "theButtons":
                sendFile("theButtonCh2");
                break;
            case "admLogs":
                sendFile("adminLogs");
                break;

            default:
                sendFile("home");
                break;
        }
    }
    res.setHeader('Content-Type', 'text/html');
    //  res.write('Hello, World!\n Current server date and time: ' + dt.myDateTime());
    //  res.end('\n You are located on party ' + party);
});
server.on('close', function () { // On écoute l'évènement close
    console.log('Bye bye !');
})
server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});

// Chargement de socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    if (party) {
        console.log('New client on point: ' + party);
    }
    else console.log('Client on lobby');
    socket.emit('connected', 'Connection tunnel on point: ' + party);

    socket.on('connectionAdvisor', function (message) {
        logs.push({ time: new Date(), /*ip: ip,*/ emplacement: party, });
    });

    socket.on('getlogs', function (message) {
        if (message = 'password') {
            socket.emit('logs', JSON.stringify(logs));
        } else {
            socket.emit('logs', 'Incorrect password, log access refused.');
        }
    });
/*    
    socket.on('joinGame', function (message) {
        console.log('Client asking for connection on point: ' + message);
        if (parties.indexOf(message) != -1) console.log('Connection authorized.'), socket.emit('gate', message);
        else console.log('Connection refused.'), socket.emit('fail', '404: Game not found');
    });
    socket.on('createGame', function (message) {
        console.log('Client asking for game creation.');
        var id = "";
        do {
            id = randomAdress(7);
        } while (parties.indexOf(id) != -1);
        parties.push(id);
        socket.emit('gate', id);
        console.log('Party sucessfully created on port: ' + id);
    });
*/
});

