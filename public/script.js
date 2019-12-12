var api = "http://api.giphy.com/v1/gifs/search?";
var apikey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=happy";

function setup(){
  noCanvas();
  var url = api + apikey + query;
  loadJSON(url, gotData);
}

function gotData(giphy){
  for (var  i = 0 ; i < giphy.data.lenght; i++){

    createImg(giphy.data[i].images.oreginal.url);
  }
}


/*
My privet giphy key = ueK7m0ZXirAVG13dhdmJ1weVbu7BP4XC;

http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=happy
*/

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
    // här skulle jag till example cheack om det message eller / comand och sen skulle clienten 
    //vilja en method och sen skulle vi unropa function som skulle hämta giphy api eller som skulle skicka vanlig message.
    
    socket.emit('send message', $message.val());
    $message.val('');
  });

  socket.on('new message', function(data){
    $chat.append('<div class="well"><strong>'+data.user+'</strong>:'+data.msg+'</div>');
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