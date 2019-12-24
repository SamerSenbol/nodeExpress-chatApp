var api = "http://api.giphy.com/v1/gifs/search?";
var apikey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=happy";
const url ="http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=happy";

$(function (){
  var socket = io.connect();
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $messageArea = $('#messageArea');
  var $userFormArea = $('#userFormArea');
  var $users = $('#users');
  var $username = $('#username');

  $messageForm.submit(function(e){
    e.preventDefault();
    socket.emit('send message', $message.val());
    $message.val('');
  });

  socket.on('new message', function(data){

    if(data.msg==='/happy'){
    $chat.append('<div class="well"><strong>'+data.user+'</strong>:<img src="https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif" width=200 height=200/>'+'</div>'); 
    }
    else{
      $chat.append('<div class="well"><strong>'+data.user+'</strong>:'+data.msg+'</div>'); 
    }
  });

  $userFormArea.submit(function(e){
    e.preventDefault();
    socket.emit('new user', $username.val(), function(data){
      
      if(data){
        
        $userFormArea.hide();
        $messageArea.show();
      }
    });

    $username.val('');
  });

  socket.on('get users', function(data){
    var html  = '';
    for(i = 0; i < data.length; i++){
      html += '<li class="list-group-item">'+ data[i]+ '</li>';
      $users.html(html);
    }
  });
});