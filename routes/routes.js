    var mongoose = require('mongoose'),
        queryString = require('querystring'),
        rssParser = require('rss-parser'),
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
    allTimestamps: [{
        podcastId: String,
        episodeInfo: [{
            timeStampInSecs: [Number],
            title: String
        }]
    }],
    userId: String
});
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    subscriptions: [String]
    
});

var User = mongoose.model('User',userSchema);
var Podcast = mongoose.model('Podcast', podcastSchema);
var PodcastTimestamp = mongoose.model('PodcastTimestamp', podcastTimestampSchema);

var view_directory = __dirname.replace('routes', 'views');

exports.accessChecker = function (req, res, next) {
    if(req.session.user && req.session.user.isAuthenticated) {
        //do something perhaps
        next();
    } else {
        res.redirect('/login');   
    }
}
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
    var podcastId = req.body.podcastId,
        podcastTitle = req.body.podcastTitle;
    
    if(!req.session.user) {
        return;
    }
    var doesUserHaveNoCheckpoints = false, 
        userId = req.session.user.userId;
    console.log(userId);
    
    
    //If user does have book marks grab the podcast array add add the bookmark 
    PodcastTimestamp.findOne({userId: userId}, function(err, timestamp) {
        if(err) return console.error(err);
        if(timestamp) {
            for(var i = 0; i < timestamp.allTimestamps.length ; i++) {
                //console.log(timestamp.allTimestamps[i].podcastId);
                //console.log(podcastId);
                if(timestamp.allTimestamps[i].podcastId === podcastId) {
                    console.log('Podcast found determining next step');
                    for(var j = 0; j < timestamp.allTimestamps[i].episodeInfo.length; j++) {
                        if(timestamp.allTimestamps[i].episodeInfo[j].title === podcastTitle) { // Episode Has bookmarks just adding to the existing list
                            console.log('Episode Found is DB adding to document Meow');
                            timestamp.allTimestamps[i].episodeInfo[j].timeStampInSecs.push(checkpointInSec);
                            timestamp.save(function (err, updatedTimestamp) {
                                if(err) return console.error(err); 
                            });
                            return;
                        }  
                    }
                    //Podcast has episodes with checkpoints but not this one so adding EpisodeInfo with appropriate info
                    timestamp.allTimestamps[i].episodeInfo.push({
                        timeStampInSecs: [checkpointInSec],
                        title: podcastTitle
                    });
                    console.log('Podcast Episode was not in db adding now');
                    timestamp.save(function (err, updatedTimestamp) {
                        if(err) return console.error(err); 
                    });
                    return;
                }
            }
            //Podcast doesn't have any checkpoints at all the podcast needs to be added to the collection along with checkpoint info
            timestamp.allTimestamps.push({
                podcastId: podcastId,
                episodeInfo: {
                    timeStampInSecs: [checkpointInSec],
                    title: podcastTitle
                }
            });
            console.log('Podcast does not have any checkpoints so they are being added');
            timestamp.save(function (err, updatedTimestamp) {
                if(err) return console.error(err); 
                return;
            });
        } else {
            doesUserHaveNoCheckpoints = true;
            console.log('doesUserHaveNoCheckpoints = true');
            //User does not have previous checkpoints at all so entire document must be added
            if(doesUserHaveNoCheckpoints) {
                console.log('User doesnt have checkpoints Meow')
                var newPodcastTimeStamp = new PodcastTimestamp({
                    allTimestamps: {
                        podcastId: podcastId,
                        episodeInfo: {
                            timeStampInSecs: [checkpointInSec],
                            title: podcastTitle
                        }
                    },
                    userId: userId
                });
                newPodcastTimeStamp.save(function (err, newPodcastCheckpoint) {
                    if(err)return console.error(err);
                    console.log("New Checkpoint added");
                    console.log(newPodcastCheckpoint);
                });
            }   
        }
    });
}

exports.ajaxGetAllPodcasts = function(req, res) {
    var podcastCollection = [];
    Podcast.find({}, function(err, podcasts) {
        collectParsedPodcastRSSInfoToSendViaAJAX(podcasts, function(collection) {
            res.json(collection);
        }); 
    });   
}

exports.ajaxGetCheckpoints = function (req, res) {
//    console.log("Get Checkpoint entrance Meow");
//    console.log(req.query);
    if(!req.session.user) {
        res.json([]);   
    }
    var queryData = queryString.parse(req._parsedUrl.query);
    var checkpoints = [],
        podcastId = queryData.podcastId,
        podcastTitle = queryData.podcastTitle,
        userId = req.session.user.userId;
    PodcastTimestamp.findOne({userId: userId}, function(err, timestampDoc) {
       if(err) return console.error(err);
        if(timestampDoc) {
            console.log(timestampDoc);
            for(var i = 0; i < timestampDoc.allTimestamps.length; i++) {
                if(timestampDoc.allTimestamps[i].podcastId === podcastId) {
                    console.log('podcast found determining next move');
                    for(var j = 0; j < timestampDoc.allTimestamps[i].episodeInfo.length; j++) {
                        if(timestampDoc.allTimestamps[i].episodeInfo[j].title === podcastTitle) {
                            console.log('Episodes Found');
                            checkpoints = timestampDoc.allTimestamps[i].episodeInfo[j].timeStampInSecs;
                        }
                    }
                }
            }
            res.json(checkpoints);
        }
    });
}

exports.ajaxGetLoggedInUser = function (req, res) {
    if(req.session.user && req.session.user.isAuthenticated) {
        res.json(req.session.user);    
    } else {
        res.json({
            isAuthenticated: false,
            username: 'NoLoggedInUser'
        });
    }
}

exports.ajaxGetSubscribedPodcasts = function(req, res) {
    //pull in subscribed Podcasts
    var userId = req.session.user.userId;
    console.log(userId);
    User.findById(userId, function (err, user) {
        if(err) return console.error;
        if(user) {
            var subscribedPodcasts = [];
            var numberOfSubscribedPodcasts = user.subscriptions.length;
            var numberOfPodcastsAdded = 0;
            console.log('UserFound Meow');
            for(var i = 0; i< user.subscriptions.length; i++) {
                Podcast.findById(user.subscriptions[i], function(err, podcast) {
                    if(err) return console.error;
                    if(podcast) {
                        console.log('podcastFound');
                        var podcastEntry = {
                            _id: podcast._id,
                            description: podcast.description,
                            rssUrl: podcast.rssUrl,
                            title: podcast.title
                        }
                        console.log(podcastEntry);
                        subscribedPodcasts.push(podcastEntry);
                        numberOfPodcastsAdded++;
                        if(numberOfPodcastsAdded === numberOfSubscribedPodcasts) {
                            collectParsedPodcastRSSInfoToSendViaAJAX(subscribedPodcasts, function(collection) {
                res.json(collection);   
            });   
                        }
                    }
                });   
            }
            console.log(subscribedPodcasts);
            
        }
    });
}

exports.ajaxGetSubscriptionStatus = function (req, res) {
    var podcastId = req.body.podcastId,
         userId = req.body.userId;
    
    User.findById(userId, function(err, user) {
        if(err) return console.error(err);
        if(user) {
            var subscriptions = user.subscriptions;
            var isUserSubscribed = false;
            for(var i = 0; i < subscriptions.length; i++) {
                if(subscriptions[i] === podcastId) {
                    isUserSubscribed = true;
                }
            }
            res.json(isUserSubscribed);
        } else {
            console.log('UserNotLoggedin');
            res.json(false);        
        }
    });
}

exports.ajaxToggleSubscription = function (req, res) {
    var podcastId = req.body.podcastId,
        userId = req.body.userId;
    var userBeingUpdated = User.findById(userId, function(err, user) {
        if(err) return console.error(err);
        if(user) {
            var subscriptions = user.subscriptions;
            var willBeSubscribedUponCompletion = true;
            console.log(podcastId);
            for(var i = 0; i < subscriptions.length; i++) {
                console.log(subscriptions[i]);
                if(subscriptions[i] === podcastId) {
                    console.log('Unsubscribed from podcast Meow');
                    user.subscriptions.splice(i, 1);
                    willBeSubscribedUponCompletion = false;
                }
            }
            if(willBeSubscribedUponCompletion) {
                console.log('subscribed to podcast meow');
                user.subscriptions.push(podcastId);//adding the podcast to the Subscription
            }
            user.save();
            res.json(willBeSubscribedUponCompletion);
        }
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

exports.mySubscriptions = function (req, res) {
    var options = {
        root: view_directory,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent':true    
        }
    }
    res.sendFile('/my-subscriptions.html', options);
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

exports.userLogin = function (req, res) {
    var options = {
        root: view_directory,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile('/user-login.html', options);
}

exports.userLoginPost = function(req, res) {
    var usernameSubmission = req.body.username,
        passwordSubmission = req.body.password;
    var isLoginAttemptValid = false;
    
    var userToLogin = User.findOne({
        name: usernameSubmission   
    }, function(err, user) {
        if(err) return console.error(err);
        if(user) {
            isLoginAttemptValid = user.password == passwordSubmission;
            if(isLoginAttemptValid) {
                req.session.user = {
                    isAuthenticated: true,
                    userId: user._id,
                    username: req.body.username
                }
                res.redirect(301, '/');
            }
        }
        if(!isLoginAttemptValid) {
            res.redirect(301, '/login');   
        }
    });
}

exports.userLogout = function(req, res) {
    req.session.user = null;
    res.redirect(301, '/');
}

exports.userRegister = function (req,res) {
    var options = {
        root: view_directory,
        dotfiles: 'deny',
        headers: {  
            'x-timestamp': Date.now(),
            'x-sent': true
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

function collectParsedPodcastRSSInfoToSendViaAJAX(podcasts, callback){
    var podcastCollection = [];
    var numPodcastFeedsToPull = podcasts.length;
    var rssFeedPulled = 0;
    var podcastEntry = {};
    //console.log(podcasts);
    for(var i = 0; i < podcasts.length; i++) {
        rssParser.parseURL(podcasts[i], function(err, parsed) {
            if(err)return console.error('RSSParser Error: ' + err);
            //console.log(parsed);
            podcastEntry.feed = parsed.feed;
            podcastCollection.push(parsed);
            rssFeedPulled++;
            if(rssFeedPulled === numPodcastFeedsToPull) {
                callback(podcastCollection);   
            }
            podcastEntry = {};
                
        }); 
        
    }
//    podcastCollection.push({
//            feed: {
//                title: "Giant Bombcast",
//                description: "The Giant Bomb staff discuss the latest video game news and new releases, taste-test questionable beverages, and get wildly off-topic in this weekly podcast.",
//                image: {
//                    title: "Giant Bombcast",
//                    url: "http://static.giantbomb.com/uploads/original/20/202777/2761597-giant+bombcast.png",
//                    width:144,
//                    height:144
//                },
//                entries: [{
//                    title: "Giant Bombcast 02/02/2016",
//                    enclosure: {
//                        url: "http://www.giantbomb.com/podcasts/download/1494/Giant_Bombcast_02_02_2016-02-02-2016-7667832768.mp3",
//                        length:10414,
//                        type: "audio/mpeg"
//                    },
//                    link: "http://www.giantbomb.com/podcasts/giant-bombcast-02022016/1600-1494/",
//                    description: "This week from the new studio: Jason mourns the last Street Fighter V beta; Dan has begun to bear Witness; Brad really likes the mood lighting; Jeff has thoughts on Mario. All this plus your emails!",
//                    pubDate: "Tue, 02 Feb 2016 14:30:00 PST"
//                },{
//                    title: "Giant Bombcast 01/26/2016",
//                    enclosure: {
//                        url: "http://www.giantbomb.com/podcasts/download/1486/Giant_Bombcast_01_26_2016-01-26-2016-9949472309.mp3",
//                        length:7813,
//                        type: "audio/mpeg"
//                    },
//                    link: "http://www.giantbomb.com/podcasts/giant-bombcast-01262016/1600-1486/",
//                    description: "We&#039;ve been doing a lot of Witnessing and we&#039;re very excited about it, but that doesn&#039;t mean we forgot about Sony reorgs, mysterious Konami vans, fighting game failures, in-game crosshairs, questionable root beer, or mobile apps made by certain controversi",
//                    pubDate: "Tue, 26 Jan 2016 17:15:00 PST" 
//                }, {
//                    title: "Giant Bombcast 01/19/2016",
//                    enclosure: {
//                        url: "http://www.giantbomb.com/podcasts/download/1480/Giant_Bombcast_01_19_2016-01-19-2016-9682693335.mp3",
//                        length:10165,
//                        type: "audio/mpeg"
//                    },
//                    link: "http://www.giantbomb.com/podcasts/giant-bombcast-01192016/1600-1480/",
//                    description: "Come for the handy tips on bathing your infant, stay for the lively chat about drinking at work, &quot;getting&quot; Resident Evil, plumbing the Darkest Dungeon, busting up Hitman, dredging up the Ninja Turtles, and chugging a 40 faster than anyone you know!",
//                    pubDate: "Tue, 19 Jan 2016 17:15:00 PST"   
                    
//                }]
//            }
//        });
//        podcastCollection.push({
//            feed: {
//                title: "The Giant Beastcast",
//                description: "The Giant Bomb East team gathers to talk about the week in video games, their lives, and basically anything that interests them. All from New York City!",
//                image: {
//                    title: "The Giant Beastcast",
//                    url: "http://static.giantbomb.com/uploads/original/0/31/2750982-beastcast_itunes.png",
//                    width:144,
//                    height:144
//                },
//                entries: [{
//                    title: "The Giant Beastcast - Episode 37",
//                    enclosure: {
//                        url: "http://www.giantbomb.com/podcasts/download/1497/Ep37_-_The_Giant_Beastcast-02-04-2016-5339695080.mp3",
//                        length:7914,
//                        type: "audio/mpeg"
//                    },
//                    link: "http://www.giantbomb.com/podcasts/the-giant-beastcast-episode-37/1600-1497/",
//                    description: "Alex simulates his dreams of being an American trucker, we share our different experiences with The Witness, and we go deep on The Division. Also, we go over bathroom talking etiquette because there&#039;s always time for that.",
//                    pubDate: "Fri, 05 Feb 2016 03:00:00 PST"
//                },{
//                    title: "The Giant Beastcast - Episode 36",
//                    enclosure: {
//                        url: "http://www.giantbomb.com/podcasts/download/1489/Ep36_-_The_Giant_Beastcast-01-29-2016-9516669667.mp3",
//                        length:8748,
//                        type: "audio/mpeg"
//                    },
//                    link: "http://www.giantbomb.com/podcasts/the-giant-beastcast-episode-36/1600-1489/",
//                    description: "We&#039;re back after sacrificing some time to the podcast gods. We&#039;ve got EA making E3 news, Sony make Sony moves, and GameStop doesn&#039;t just want to sell you games they want to publish them too.",
//                    pubDate: "Fri, 29 Jan 2016 12:00:00 PST " 
//                }, {
//                    title: "The Giant Beastcast - Episode 35",
//                    enclosure: {
//                        url: "http://www.giantbomb.com/podcasts/download/1483/Ep35_-_The_Giant_Beastcast-01-21-2016-0424099036.mp3",
//                        length:6820,
//                        type: "audio/mpeg"
//                    },
//                    link: "http://www.giantbomb.com/podcasts/the-giant-beastcast-episode-35/1600-1483/",
//                    description: "Sure, we talk about Deserts of Kharak, Oxenfree, and other video games but don&#039;t be fooled. This is not a video game podcast. It&#039;s a podcast about milk, weather forecasts, and Star Wars cakes.",
//                    pubDate: "Fri, 22 Jan 2016 03:00:00 PST"   
                    
//                }]
//            }
//        });
    
    
}

function getPodcastDBInfo(podcasts) {
    var podcastInfoArray = [];
    for(var podcastIndex in podcasts) {
        podcastInfoArray.push({
                description: podcasts[podcastIndex].description,
                rssUrl: podcasts[podcastIndex].rssUrl,
                title: podcasts[podcastIndex].title
        }); 
    }
    return podcastInfoArray;
}

