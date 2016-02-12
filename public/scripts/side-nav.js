var SideNav = React.createClass({
    render: function () {
        return (
            <div className="pure-menu">
                <a className="pure-menu-heading" href="/">Cast Everywhere</a>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="/" className="pure-menu-link">Step 1</a></li>
                    <li className="pure-menu-item"><a href="step2" className="pure-menu-link">Step 2</a></li>

                    <li className="pure-menu-item menu-item-divided pure-menu-selected">
                        <a href="step3" className="pure-menu-link">Step 3</a>
                    </li>

                    <li className="pure-menu-item"><a href="step4" className="pure-menu-link">Step 4</a></li>
                    <li className="pure-menu-item"><a href="step5" className="pure-menu-link">Step 5</a></li>
                </ul>
            </div>
        )
    }
});

ReactDOM.render(
    <SideNav />,
    document.getElementById("menu"));