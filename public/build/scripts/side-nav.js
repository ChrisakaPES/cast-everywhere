var SideNav = React.createClass({
    displayName: "SideNav",

    render: function () {
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
                React.createElement(
                    "li",
                    { className: "pure-menu-item menu-item-divided pure-menu-selected" },
                    React.createElement(
                        "a",
                        { href: "step3", className: "pure-menu-link" },
                        "Step 3"
                    )
                ),
                React.createElement(
                    "li",
                    { className: "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "step4", className: "pure-menu-link" },
                        "Step 4"
                    )
                ),
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