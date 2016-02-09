var SideNav = React.createClass({
    displayName: "SideNav",

    render: function () {
        return React.createElement(
            "div",
            { className: "pure-menu" },
            React.createElement(
                "a",
                { "class": "pure-menu-heading", href: "/" },
                "Cast Everywhere"
            ),
            React.createElement(
                "ul",
                { "class": "pure-menu-list" },
                React.createElement(
                    "li",
                    { "class": "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "/", "class": "pure-menu-link" },
                        "Step 1"
                    )
                ),
                React.createElement(
                    "li",
                    { "class": "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "step2", "class": "pure-menu-link" },
                        "Step 2"
                    )
                ),
                React.createElement(
                    "li",
                    { "class": "pure-menu-item", "class": "menu-item-divided pure-menu-selected" },
                    React.createElement(
                        "a",
                        { href: "step3", "class": "pure-menu-link" },
                        "Step 3"
                    )
                ),
                React.createElement(
                    "li",
                    { "class": "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "step4", "class": "pure-menu-link" },
                        "Step 4"
                    )
                ),
                React.createElement(
                    "li",
                    { "class": "pure-menu-item" },
                    React.createElement(
                        "a",
                        { href: "step5", "class": "pure-menu-link" },
                        "Step 5"
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(SideNav, null), document.getElementById("side-nav"));