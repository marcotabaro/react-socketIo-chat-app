const io = require('socket.io')(3000, {
    cors:{origin:"*",},
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user', myName => {
        users[socket.id] = myName;
        socket.broadcast.emit('user-connected', myName);
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, myName: users[socket.id]}) //Send the message to everyone else connected to the server, except for who sent the msg
    });
});
