var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required'},
    lastName:  {type: String, required: '{PATH} is required'},
    username:  {type: String, required: '{PATH} is required', unique: true},
    email:     {type: String, required: '{PATH} is required', unique: true},
    salt: String,
    hashed_pwd: String,
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'hung');
            User.create({firstName: 'Hung', lastName:'Ho', username:'hung', email:'hung@test.com', salt: salt, hashed_pwd: hash, roles:['admin']});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'test1');
            User.create({firstName: 'test1', lastName:'test1', username:'test1', email:'test1@test.com', salt: salt, hashed_pwd: hash, roles:[]});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'test2');
            User.create({firstName: 'test2', lastName:'test2', username:'test2', email:'test2@test.com', salt: salt, hashed_pwd: hash, roles:[]});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'test3');
            User.create({firstName: 'test3', lastName:'test3', username:'test3', email:'test3@test.com', salt: salt, hashed_pwd: hash, roles:[]});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
