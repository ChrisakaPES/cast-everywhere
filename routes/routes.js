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