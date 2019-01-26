var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
	it('should generate the correct message object', () => {
		var from = 'AdminTest';
		var text = 'TestForMsgGen';
		var res = generateMessage(from, text);
		
		expect(res).toInclude({
			from,
			text
		});
		expect(res.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'AdminTest';
		var latitude = 1;
		var longitude = 1;
		var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
		var res = generateLocationMessage(from, latitude, longitude);

		expect(res.createdAt).toBeA('number');
		expect(res).toInclude({from, url});
	});
});