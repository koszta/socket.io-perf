#A performance test for socket.io-redis

##Usage

### `npm start`
Using pm2 it starts the following services:

- 3 servers:
 - server1: Listening on port 3000, using namespace /test
 - server2: Listening on port 3001, using namespace /test
 - server3: Listening on port 3002, using namespace /

- 1 client:
 - client1: Connecting to server1, joining to room test

- 1 emitter:
 - emitter1: Emits to namespace /test, in room test

### `npm stop`
Deletes all the running services via pm2

### `npm test`
Runs pm2 monit for you to check CPU usage

## Notes
This project has been created to test socket.io-redis performance issues.

Expected behaviour: only server1, client1, emitter1 should have high cpu, server2, server3 should be around 0%.

Unfortunately the current version of socket.io-redis is listening for the whole pattern socket.io#* and the messages are sent to socket.io#id. This means that all the socket.io servers will receive all messages, even if the server does not use that namespace, even if there are no client listening to any of those rooms on them. If there are some nodes which send a lot of message, all the socket.io servers will have 100% cpu really quickly.

Here is my pull request which solves the issue:
https://github.com/Automattic/socket.io-redis/pull/46

You can try it by changing socket.io-redis version in package.json from "*" to "git://github.com/koszta/socket.io-redis.git#optimization" and running `npm install` again.
