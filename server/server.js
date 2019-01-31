const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'Howard@example.com',
	// 	text: 'Hey',
	// 	createAt: 123
	// });
	socket.on('join', (params, callback) => {

		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});

	socket.on('createMessage', (newMsg, callback) => {
		var user = users.getUser(socket.id);
		if (user && isRealString(newMsg.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, newMsg.text));
		}
		
		callback();
		// socket.broadcast.emit('newMessage', {
		// 	from: newMsg.from,
		// 	text: newMsg.text,
		// 	createdAt: new Date().getTime()
		// });

	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}

		
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});