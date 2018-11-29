// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// var me = new Person('Rob', 25);
// let description = me.getUserDescription();
// console.log(description);

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        // find user
        let user = this.users.filter((user) => user.id === id)[0];
        // if we find a user determine return a new array without
        // the removed value in it
        if(user) {
            // find the user that needs to be removed and only return
            // the values that are not equal to the id
            this.users = this.users.filter((user) => {
                return user.id !== id;
            })
        }
        return user
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];

    }
    getUserList(room) {
        let users = this.users.filter((user) => {
            return user.room === room;
        });
        let namesArray = users.map((user) => {
            return user.name
        });
        return namesArray;
    }


}

module.exports = {Users};


//addUser(id, name, room)

//removeUser(id)

//fetchUser(id)

//getUserList(room)

