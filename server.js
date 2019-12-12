var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('server running');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on("connection",function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected',connections.length);

  //Disconnect
  users.splice(users.indexOf(socket.username), 1);
  updateUsernames();
  socket.on('disconnect', function(data){
  connections.splice(connections.indexOf(socket),1);
  console.log('Disconnected: %s sockets connected',connections.length);
  });

  //Send Message
  socket.on('send message', function(data){

    
    io.sockets.emit('new message',{msg: data, user: socket.username});

  // Check if message is "/dance"
/* 
  if(message === "/danse"){
    io.to(user.room).emit('message', { user: user.name, text:"is dansening"});
  }
  else{
    
    io.to(user.room).emit('message', { user: user.name, text: message });
  } */
});

  // New User
  socket.on('new user', function(data, callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames()
  {
  io.sockets.emit('get users', users);
  }
  });