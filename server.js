const express = require('express')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

users = [];
connections = [];

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on("connection",function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected',connections.length);

  //Disconnect
  socket.on('disconnect',function(data){
  connections.splice(connections.indexOf(socket),1);
  console.log('Disconnected: %s sockets connected',connections.length);
});
  //Send Message
  socket.on('send message', function(data){
    io.sockets.emit('new message',{msg: data});
  
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

console.log('server running');