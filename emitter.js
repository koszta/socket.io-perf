var SocketIO = require('socket.io'),
    redis = require('socket.io-redis'),
    io = new SocketIO(),
    namespace = process.argv[2] || '/',
    room = process.argv[3],
    nsp;

io.adapter(redis({host: 'localhost', port: 6379}));

console.log('emitting to namespace:', namespace, 'room:', room);

nsp = io.of(namespace);

(function emitLoop() {
  (room ? nsp.in(room) : nsp).emit('message', {currentDate: Date.now()});

  setImmediate(emitLoop);
})();
