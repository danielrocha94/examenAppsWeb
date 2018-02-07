var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

var io = require('socket.io')(server);
var history = [];

const mongoose = require('mongoose'); 

const Message = require('./models/message');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/chatapp");
const db = mongoose.connection;

//db error
db.on('error', () => {
  console.error('mongo connection error!');
});

io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    history.push(msg);
    io.emit('history', history);
  });

  socket.on('storeMessage', function(message) {
    Message.create(message);
  });

  socket.on('loadHistory', function(){
    io.emit('history', history);
  });
});

server.listen(8080, function() {
  console.log('Chat server running');
});
