var LoggedInMenuItems = React.createClass({
    displayName: "LoggedInMenuItems",

    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "li",
                { className: "pure-menu-item" },
                React.createElement(
                    "a",
                    { href: "/my-subscriptions", className: "pure-menu-link" },
                    "My Profile"
                )
            ),
            React.createElement(
                "li",
                { className: "pure-menu-item" },
                React.createElement(
                    "a",
                    { href: "/logout", className: "pure-menu-link" },
                    "Logout"
                )
            )
        );
    }
});
var NoLoggedInUserMenuItems = React.createClass({
    displayName: "NoLoggedInUserMenuItems",

    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "li",
                { className: "pure-menu-item" },
                React.createElement(
                    "a",
                    { href: "/login", className: "pure-menu-link" },
                    "Login"
                )
            ),
            React.createElement(
                "li",
                { className: "pure-menu-item" },
                React.createElement(
                    "a",
                    { href: "/register", className: "pure-menu-link" },
                    "Register"
                )
            )
        );
    }
});
var SideNav = React.createClass({
    displayName: "SideNav",

    componentDidMount: function () {
        this.isUserLoggedIn();
    },
    getInitialState: function () {
        return { user: {} };
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
                this.setState({ user: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var endPositionNav;
        if (this.state.user.isAuthenticated) {
            endPositionNav = React.createElement(LoggedInMenuItems, null);
            console.log("Logged In user menu items");
        } else {
            endPositionNav = React.createElement(NoLoggedInUserMenuItems, null);
            console.log("No Logged In user menu items");
        }
        console.log(endPositionNav);
        return React.createElement(
            "div",
            { className: "pure-menu" },
            React.createElement(
                "a",
                { className: "pure-menu-heading", href: "/" },
                "Cast Everywhere"
            ),
            React.createElement(
                "ul",
                { className: "pure-menu-list" },
                React.createElement(
                    "li",
                    { className: "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "/", className: "pure-menu-link" },
                        "Discover"
                    )
                ),
                React.createElement(
                    "li",
                    { className: "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "step2", className: "pure-menu-link" },
                        "Subscriptions"
                    )
                ),
                endPositionNav,
                React.createElement(
                    "li",
                    { className: "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "step5", className: "pure-menu-link" },
                        "Options"
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(SideNav, null), document.getElementById("menu"));