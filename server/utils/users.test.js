const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Test 1'
		}, {
			id: '2',
			name: 'Howard',
			room: 'Test 2'
		}, {
			id: '3',
			name: 'Jen',
			room: 'Test 1'
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Howard',
			room: 'The Test Room'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should return names for Test 1', () => {
		var userList = users.getUserList('Test 1');
		expect(userList).toEqual(['Mike', 'Jen']);
	});

	it('should return names for Test 2', () => {
		var userList = users.getUserList('Test 2');
		expect(userList).toEqual(['Howard']);
	});

	it('should remove a user', () => {
		var userId = '1';
		var user = users.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove user', () => {
		var userId = '10';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var userId = '1';
		var userFind = users.getUser(userId);
		expect(userFind.id).toBe(userId);
	});

	it('should not find user', () => {
		var userId = '10';
		var userFind = users.getUser(userId);
		expect(userFind).toNotExist();
	});
});