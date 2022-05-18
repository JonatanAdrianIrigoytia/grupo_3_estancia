const fs = require('fs');

let User = {
    fileName: '/data/users.json',
    
    getData: function() {
        return JSON.parse(fs.readFileSync(this.filenName, 'utf-8'));
    },
    generateId: function (){
        let allUsers = this.findAll();
        let lastUser = allUser.pop();
        if(lastUser){
       return lastUser.id + 1;     
        }
        return 'no existen usuarios aún';
    },

    findAll: function (){
        return this.getData();
    },
    findByPk: function (id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(OneUser => oneUser.id === id);
        return userFound;
    },
    findByField: function (Field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(OneUser => oneUser[Field] === text);
        return userFound;
    },
    
    create: function(userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generatorId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    delete: function (id) {
        let allUsers  = this.findAll();
        let finalUsers =allUsers.filter(oneUser => oneUser.id !==id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
   
};

module.exports = User;
