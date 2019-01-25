var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');

	// socket.emit('createMessage', {
	// 	from: 'Jean@example.com',
	// 	text: 'Hey, this is Jean'
	// });

});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
	console.log('New message', msg);
	var li = jQuery('<li></li>');
	li.text(`${msg.from}: ${msg.text}`);

	jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'Hi'
// }, function (data) {
// 	console.log('Got it.', data);
// });

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {

	});
});