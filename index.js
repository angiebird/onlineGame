var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('msg', function(msg){
        console.log('message: ' + msg.text);
        io.emit('msg', msg.name + ": " + msg.text);
    });
    socket.on('pos', function(pos){
        console.log('pos: ' + pos);
        io.emit('pos', pos);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
