var UserLoginForm = React.createClass({
    displayName: "UserLoginForm",

    render: function () {
        return React.createElement(
            "div",
            { className: "center-form" },
            React.createElement(
                "h1",
                null,
                "Log-in"
            ),
            React.createElement(
                "form",
                { method: "post", action: "/login", className: "pure-form pure-form-aligned" },
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "username" },
                        "Username:"
                    ),
                    React.createElement("input", { type: "text", name: "username", placeholder: "Username" })
                ),
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "password" },
                        "Password:"
                    ),
                    React.createElement("input", { type: "password", name: "password", placeholder: "Password" })
                ),
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "rememberme" },
                        "Remember Me"
                    ),
                    React.createElement("input", { type: "checkbox", name: "rememberme" })
                ),
                React.createElement(
                    "button",
                    { type: "submit", className: "pure-button pure-button-primary center-button" },
                    " Log In "
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(UserLoginForm, null), document.getElementById('main-content'));