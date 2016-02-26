var UserLoginForm = React.createClass({
    render: function () {
        return (
            <div className="center-form" >
                <h1>Log-in</h1>
                <form method="post" action="/login" className="pure-form pure-form-aligned">
                    <div className="pure-control-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" placeholder="Username" />
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="rememberme">Remember Me</label>
                        <input type="checkbox" name="rememberme"/>
                    </div>
                    <button type="submit" className="pure-button pure-button-primary center-button"> Log In </button>
                </form>   
            </div>
        );
    }
});

ReactDOM.render( <UserLoginForm />,
    document.getElementById('main-content'));