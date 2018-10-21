const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//listens for specific events and do something when it comes in
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (newMsg) => {
    console.log('new message from', newMsg);
    io.emit('newMessage', {
      from: newMsg.from,
      text: newMsg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
