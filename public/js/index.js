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

	var formattedTime = moment(msg.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: msg.text,
		from: msg.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current location</a>');

	// li.text(`${message.from} ${formattedTime} : `);
	// a.attr('href', message.url);

	// li.append(a);
	// jQuery('#messages').append(li);
});


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