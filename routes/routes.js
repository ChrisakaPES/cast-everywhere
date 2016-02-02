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
var podcastSchema = mongoose.Schema({
    title: String,
    rssUrl: String,
    description: String
});
var podcastSubscriptionSchema = mongoose.Schema({});
var podcastTimestampSchema = mongoose.Schema({
    podcastName: String,
    timeStampInSecs: Number
});
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
    
});

var User = mongoose.model('User',userSchema);
var Podcast = mongoose.model('Podcast', podcastSchema);
var PodcastTimestamp = mongoose.model('PodcastTimestamp', podcastTimestampSchema);

var view_directory = __dirname.replace('routes', 'views');

exports.addPodcast = function (req, res) {
    var options = {
        root: view_directory,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile('/add-podcast.html', options);
}
exports.addPodcastPost = function (req, res) {
    var podcastTitle = req.body.title;
    var podcastUrl = req.body.podcasturl;
    var podcastDescription = req.body.description;
    
    var newPodcast = new Podcast({
        title: podcastTitle,
        rssUrl: podcastUrl,
        description: podcastDescription
    });
    newPodcast.save(function (err, newPodcast) {
        if(err)return console.error(err);
        console.log("New Podcast Added");
        console.log(newPodcast);
        res.redirect(301, '/');
        
    });
}
exports.ajaxAddBookmark = function (req, res) {
    console.log(req.body);
    var checkpointInSec = req.body.currentTime;
    var podcastName = req.body.podcast;
    
    var newPodcastTimeStamp = new PodcastTimestamp({
        podcastName: podcastName,
        timeStampInSecs: checkpointInSec
    });
    newPodcastTimeStamp.save(function (err, newPodcastCheckpoint) {
        if(err)return console.error(err);
        console.log("New Checkpoint added");
        console.log(newPodcastCheckpoint);
    });
}
exports.ajaxGetAllPodcasts = function(req, res) {
    Podcast.find({}, function(err, podcasts) {
        console.log(podcasts);
        for(podcast in podcasts) {
            console.log(podcast);
            
        }
        
    })
    
}
exports.ajaxGetCheckpoints = function (req, res) {
    console.log("Get Checkpoint entrance Meow");
    console.log(req.query);
    PodcastTimestamp.find({podcastName: 'Giant Bombcast'}, function(err, timestamps) {
       if(err) return console.error(err);
        console.log(timestamps);
        res.json(timestamps);
    });
}
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
exports.testAudioPlayer = function(req,res) {
    var options = {
        root: view_directory,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent':true    
        }
    }
    
    res.sendFile('/test-audio-player.html', options);
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