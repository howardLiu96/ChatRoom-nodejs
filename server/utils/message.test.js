var expect = require('expect');
var {generateMessage} = require('./message');

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