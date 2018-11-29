const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//listens for specific events and do something when it comes in
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id); //removes from any previous rooms
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.leave(room name)

    // io.emit -> io.to(params.room).emit | everyone -> everyone in room
    // socket.broadcast.emit -> socket.broadcast.to(params.room).emit | everyone except sender -> everyone in room except sender
    // socket.emit | targetted user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
    callback();
  });

  socket.on('createMessage', (newMsg, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(newMsg.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMsg.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat!`));
    }
  })
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
