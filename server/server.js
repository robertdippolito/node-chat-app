const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//listens for specific events and do something when it comes in
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

  socket.on('createMessage', (newMsg) => {
    console.log('new message from', newMsg);
    io.emit('newMessage', generateMessage(newMsg.from, newMsg.text));
    // socket.broadcast.emit('newMessage', {
    //   from: newMsg.from,
    //   text: newMsg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
