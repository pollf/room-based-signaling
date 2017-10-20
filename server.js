let express = require('express');
let path    = require('path');
let socket = require('socket.io')

let app = express();

let server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

let io = socket(server);

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
      console.log("a client joined room " + room);
        socket.join(room);
        //emit all meetingSignals to the corresponding room
        socket.on('meetingSignal', function(data) {
            io.sockets.in(room).emit('meetingSignal', data);
        });
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/client.html'));
});
