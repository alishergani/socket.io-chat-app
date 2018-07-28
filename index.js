var express = require('express'); //
var socektIo = require('socket.io');
var http = require('http');

var app = express();
var server = http.Server(app);
var io = socektIo(server)

var port = 1234;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('Connected!#####################')
  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('typing', function(data) {
  	socket.broadcast.emit('typing', data)
  })
  socket.on('userconnected', function(name) {
  	console.log('connected:##:', name)
  	socket.broadcast.emit('online', name)
  })
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});
