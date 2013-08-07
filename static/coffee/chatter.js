$(document).ready(function(){
    var server = io.connect(document.URL);
    var insertMessage = function(message){
        $("#message-history").append(message);
    };

    server.on('connect', function(data){
        nickname = prompt("What's your nickname?");
        server.emit('join',nickname);
    });

    server.on('messages', function(data){
        console.log('This is called');
        insertMessage(data + "<br/>");
    });

    $("#chat-form").submit(function(){
        var message = $('#chat-input').val();
        insertMessage("Me:" + message + "<br/>");
        server.emit('messages',message);
        return false;
    });
});
