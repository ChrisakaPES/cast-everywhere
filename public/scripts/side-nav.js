var LoggedInMenuItems = React.createClass({
    render: function() {
        return (
            <div>
                <li className="pure-menu-item"><a href="/my-subscriptions" className="pure-menu-link">My Profile</a></li>
                <li className="pure-menu-item"><a href="/logout" className="pure-menu-link">Logout</a></li>
            </div>
        );
    }
});
var NoLoggedInUserMenuItems = React.createClass({
    render: function() {
        return (
            <div>
                <li className="pure-menu-item"><a href="/login" className="pure-menu-link">Login</a></li>
                <li className="pure-menu-item"><a href="/register" className="pure-menu-link">Register</a></li>   
            </div>
        );
    }
});
var SideNav = React.createClass({
    componentDidMount: function() {
        this.isUserLoggedIn();   
    },
    getInitialState: function() {
        return {user: {}}  
    },
    isUserLoggedIn() {
        //Complete This one sessions are done
        $.ajax({
            url: '/ajax/getloggedinuser',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log("Data pulled from RSS feed");
                console.log(data);
                this.setState({user: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });  
    },
    render: function () {
        var endPositionNav;
        if(this.state.user.isAuthenticated) {
            endPositionNav = <LoggedInMenuItems />;   
            console.log("Logged In user menu items")
        } else {
            endPositionNav = <NoLoggedInUserMenuItems />;   
            console.log("No Logged In user menu items")
        }
        console.log(endPositionNav);
        return (
            <div className="pure-menu">
                <a className="pure-menu-heading" href="/">Cast Everywhere</a>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="/" className="pure-menu-link">Discover</a></li>
                    <li className="pure-menu-item"><a href="step2" className="pure-menu-link">Subscriptions</a></li>
                    {endPositionNav}
                    <li className="pure-menu-item"><a href="step5" className="pure-menu-link">Options</a></li>
                </ul>
            </div>
        )
    }
});

ReactDOM.render(
    <SideNav />,
    document.getElementById("menu"));