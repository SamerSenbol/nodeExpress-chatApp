

var api = "http://api.giphy.com/v1/gifs/search?";
var apikey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=happy";
const url ="http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=happy";
/* function gotData(giphy){

  fetch(url).then((resp) => {
    return resp.json()
  }).then((data) => {
    let data = data.images.url;
});

  for (var  i = 0 ; i < giphy.data.lenght; i++){

    createImg(giphy.data[i].images.oreginal.url);
  }
}
 */

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

  /*   if($messageForm.value.indexOf('/') === 0){
      if($messageForm.value.indexOf('/giphy') === 0){
          socket.emit("giphy", $messageForm.value())
      }
  }else {
      if($messageForm.value){
          socket.emit('new message', $messageForm.value)
      }
  } */
    // här skulle jag till example cheack om det message eller / comand och sen skulle clienten 
    //vilja en method och sen skulle vi unropa function som skulle hämta giphy api eller som skulle skicka vanlig message.
    
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