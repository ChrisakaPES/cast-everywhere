var UserRegisterForm = React.createClass({
    displayName: "UserRegisterForm",

    render: function () {
        return React.createElement(
            "div",
            { className: "test-background" },
            React.createElement(
                "h1",
                null,
                " Register "
            ),
            " ",
            React.createElement(
                "form",
                { method: "post",
                    action: "/register",
                    className: "pure-form pure-form-aligned" },
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "username" },
                        " Username: "
                    ),
                    " ",
                    React.createElement("input", { type: "text",
                        name: "username",
                        placeholder: "Username" })
                ),
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "password" },
                        " Password: "
                    ),
                    " ",
                    React.createElement("input", { type: "password",
                        name: "password",
                        placeholder: "Password" })
                ),
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "email" },
                        " Email: "
                    ),
                    " ",
                    React.createElement("input", { type: "text",
                        name: "email",
                        placeholder: "Email Address" })
                ),
                React.createElement(
                    "button",
                    { type: "submit",
                        className: "pure-button pure-button-primary" },
                    " Register "
                ),
                " "
            ),
            " "
        );
    }
});
ReactDOM.render(React.createElement(UserRegisterForm, null), document.getElementById('main-content'));