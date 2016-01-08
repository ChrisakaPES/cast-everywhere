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

var User = mongoose.model('User',userSchema);

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
exports.userRegisterPost = function (req,res) {
    var userName = req.body.username,
        userPassword = req.body.password,
        userEmail = req.body.email;
    var newUser = new User({
        name: userName,
        password: userPassword,
        email: userEmail
    }); 
    newUser.save(function (err, newUser) {
       if(err)return console.error(err);
        console.log("New User added.");
        console.log(newUser);
        res.redirect(301, '/');
    });
}