var SocketIO = require('socket.io'),
    redis = require('socket.io-redis'),
    port = process.argv[2] || 3000,
    namespace = process.argv[3] || '/',
    url = 'http://localhost:' + port + namespace;

console.log('starting up:', url, 'pid:', process.pid);
var io = new SocketIO(port);
io.adapter(redis({host: 'localhost', port: 6379}));
io.of(namespace).on('connection', function(socket) {
  console.log('client connected: ' + socket.id);
  socket.on('join', function(room, callback) {
    console.log(socket.id + ' joins ' + room);
    socket.join(room, callback);
  });
});
