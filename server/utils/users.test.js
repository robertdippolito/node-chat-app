const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Rob',
            room: 'My Room'
        },
        {
            id: '2',
            name: 'Mike',
            room: 'Your Room'
        },
        {
            id: '3',
            name: 'Jen',
            room: 'My Room'
        }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'rob',
            room: 'my room'
        };
        let responseUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should return names for my course name', () => {
        let userList = users.getUserList('My Room');
        expect(userList).toEqual(['Rob','Jen']);
    });
    it('should return names for your course name', () => {
        let userList = users.getUserList('Your Room');
        expect(userList).toEqual(['Mike']);
    });
    it('should remove user', () => {
        let user = users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });
    it('should not remove user', () => {
        let user = users.removeUser('4');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
    it('should find user', () => {
        let myUser = users.getUser('1');
        expect(myUser.id).toBe('1');
    });
    it('should not find user', () => {
        let myUser = users.getUser('5');
        expect(myUser).toBeFalsy();
    });
});