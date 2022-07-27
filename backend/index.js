
const io = require('socket.io')(8000, {
    cors: {
        origin: '*'
    }
});
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', { user_name: users[socket.id], id: socket.id });
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', { user_name: users[socket.id], id: socket.id });
        delete users[socket.id];
    });
});

