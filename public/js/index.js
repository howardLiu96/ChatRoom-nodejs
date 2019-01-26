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

socket.on('newLocationMessage', function (message) {
	// console.log(message);
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);

	li.append(a);
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

	var messageTextBox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function () {
		// clear message-input box
		messageTextBox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	// Keep disabled until get the position data. 
	// In getCurrentPosition method, re-assign the proprety and value of the button "send location".
	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
});