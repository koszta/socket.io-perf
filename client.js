var io = require('socket.io-client'),
    port = process.argv[2] || 3000,
    namespace = process.argv[3] || '/',
    room = process.argv[4],
    url = 'http://localhost:' + port + namespace,
    socket = io.connect(url);

console.log('connecting to:', url);

socket.on('connect', function() {
  console.log('client connected');
  if(room) {
    console.log('joining room ' + room);
    socket.emit('join', room);
  }
});

socket.on('disconnect', function(){
  console.log('client disconnected');
});

socket.on('message', function(data) {
  console.log('event received with data: ', JSON.stringify(data));
});
