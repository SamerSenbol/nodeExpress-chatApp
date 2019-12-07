const express = require('express')
const app = express()
const port = 3000

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static('public'))


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))