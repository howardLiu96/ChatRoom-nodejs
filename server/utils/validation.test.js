const expect = require('expect');

const {isRealStirng} = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		var test = 123;
		expect(isRealString(test)).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var test = '   ';
		expect(isRealString(test)).toBe(false);
	});

	it('should allow string with non-space characters', () => {
		var test = ' a ';
		expect(isRealString(test)).toBe(true);
	});
});