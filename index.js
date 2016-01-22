var bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path'),
    routes = require('./routes/routes.js');

var app = express();

app.use(express.static(path.join(__dirname + '/public')));//allow app to use static resources
app.set('views', __dirname + '\\views'); //setting the directory in which the jade files will be
app.set('view engine', 'jade');

var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/', routes.index);
app.get('/register', routes.userRegister);
app.get('/testaudioplayer', routes.testAudioPlayer);

app.post('/register', urlencodedParser, routes.userRegisterPost);

app.post('/ajax/addbookmark', urlencodedParser, routes.ajaxAddBookmark);
console.log('Meow');
app.listen(3000);