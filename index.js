var bodyParser = require('body-parser'),
    express = require('express'),
    expressSession = require('express-session'),
    path = require('path'),
    routes = require('./routes/routes.js');

var app = express();

app.use(express.static(path.join(__dirname + '/public')));//allow app to use static resources
app.set('views', __dirname + '\\views'); //setting the directory in which the jade files will be
app.set('view engine', 'jade');
app.use(expressSession({
	secret: 'meowSecret',
	saveUninitialized: false,
	resave: false
}));


var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/', routes.index);
app.get('/addPodcast', routes.addPodcast);
app.get('/login', routes.userLogin);
app.get('/logout', routes.userLogout);
app.get('/my-subscriptions', routes.mySubscriptions);
app.get('/register', routes.userRegister);
app.get('/testaudioplayer', routes.testAudioPlayer);

app.get('/ajax/getloggedinuser', routes.getLoggedInUser);
app.get('/ajax/getcheckpoints', routes.ajaxGetCheckpoints);
app.get('/ajax/getallpodcasts', routes.ajaxGetAllPodcasts);
app.get('/ajax/getsubscribedpodcasts', routes.ajaxGetSubscribedPodcasts),
app.get('/ajax/getsubscriptionstatus', urlencodedParser, routes.ajaxGetSubscriptionStatus);


app.post('/addPodcast', urlencodedParser, routes.addPodcastPost);
app.post('/login', urlencodedParser, routes.userLoginPost);
app.post('/register', urlencodedParser, routes.userRegisterPost);

app.post('/ajax/addbookmark', urlencodedParser, routes.ajaxAddBookmark);
app.post('/ajax/togglesubscription', urlencodedParser, routes.ajaxToggleSubscription);
console.log('Meow');
app.listen(3000);