//Setting environment for Heroku
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = 'index.html';

const server = express()
.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);


const users = {};

io.on('connection', socket => {
    socket.on('new-user', myName => {
        users[socket.id] = myName;
        socket.broadcast.emit('user-connected', myName);
    });
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, myName: users[socket.id]}) //Send the message to everyone else connected to the server, except for who sent the msg
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});
