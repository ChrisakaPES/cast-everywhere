
exports.index = function (req,res) {
    
    var options = {
        root: __dirname.replace('routes', 'views'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent':true
        }
    }
    res.sendFile('/index.html', options);   
}