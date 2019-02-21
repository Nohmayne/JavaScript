var express = require('express');
var app = express();

var server = app.listen(3000, '0.0.0.0');
app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  var address = socket.handshake.address;
  console.log('New socket: ' + socket.id);
  console.log('IP: ' + address.address);
  console.log('Port: ' + address.port);

  socket.on('Paths', pathsMsg);
  socket.on('Clear', clearMsg);
  socket.on('Undo', undoMsg);
  function pathsMsg(data) {
    // console.log(data);
    socket.broadcast.emit('cPaths', data);
  }

  function clearMsg(data) {
    socket.broadcast.emit('cClear', data);
  }

  function undoMsg(data) {
    socket.broadcast.emit('cUndo', data);
  }
}

console.log('Server started');
