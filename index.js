var express = require('express'),
    routes = require('./routes/routes.js');

var app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'jade');

app.get('/', routes.index);

app.listen(3000);