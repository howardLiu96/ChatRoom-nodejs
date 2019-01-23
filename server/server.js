const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'Howard@example.com',
	// 	text: 'Hey',
	// 	createAt: 123
	// });

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (newMsg) => {
		console.log('createMessage', newMsg);
		io.emit('newMessage', generateMessage(newMsg.from, newMsg.text));

		// socket.broadcast.emit('newMessage', {
		// 	from: newMsg.from,
		// 	text: newMsg.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});