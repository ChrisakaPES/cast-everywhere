var express = require('express'),
    path = require('path'),
    routes = require('./routes/routes.js');

var app = express();

app.use(express.static(path.join(__dirname + '/public')));//allow app to use static resources
app.set('views', __dirname + '\\views'); //setting the directory in which the jade files will be
app.set('view engine', 'jade');

app.get('/', routes.index);
app.get('/register', routes.userRegister);

console.log('Meow');
app.listen(3000);