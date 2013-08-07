var socket = require('socket.io');
var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/static'));

// app.get('/',function(req,res){
//     res.render('index.html');
// });

var server = http.createServer(app);
var io = socket.listen(server);
var messages = [];

var pushMessage = function(name, data){
    messages.push({name: name, data: data});
};

io.sockets.on('connection', function(client){
    console.log("client conneted..");

    client.on('join', function(name){
        client.set('nickname', name);
        messages.forEach(function(message){
            client.emit('messages', message.name +': '+ message.data);
        });
    });

    client.on('messages', function(data){
        client.get('nickname', function(err, name){
            client.broadcast.emit('messages', name +': '+ data);
            pushMessage(name, data);
            console.log(name +': '+ data);
        });
    });
});

server.listen(process.env.PORT || 8080);
