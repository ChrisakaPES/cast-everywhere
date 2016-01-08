var mongoose = require('mongoose'),
    uriUtil = require('mongodb-uri');

var mongodbUri = 'mongodb://ds051740.mongolab.com:51740/capstonedb';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  user: 'backenduser',
  pass: 'password'
}
mongoose.connect(mongooseUri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('DB Connection is Open');
});

//Schemas
var podcastSchema = mongoose.Schema({});
var podcastSubscriptionScema = mongoose.Schema({});
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
    
});

var view_directory = __dirname.replace('routes', 'views');


exports.index = function (req,res) {
    var options = {
        root: view_directory,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent':true
        }
    }
    res.sendFile('/index.html', options);   
}
exports.userRegister = function (req,res) {
    var options = {
        root: view_directory,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent':true
        }
    }
    res.sendFile('/user-register.html', options);
}
exports.userRegisterPost