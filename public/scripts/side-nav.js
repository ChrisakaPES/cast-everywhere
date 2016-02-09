var SideNav = React.createClass({
    render: function () {
        return (
            <div className="pure-menu">
                <a class="pure-menu-heading" href="/">Cast Everywhere</a>

                <ul class="pure-menu-list">
                    <li class="pure-menu-item"><a href="/" class="pure-menu-link">Step 1</a></li>
                    <li class="pure-menu-item"><a href="step2" class="pure-menu-link">Step 2</a></li>

                    <li class="pure-menu-item" class="menu-item-divided pure-menu-selected">
                        <a href="step3" class="pure-menu-link">Step 3</a>
                    </li>

                    <li class="pure-menu-item"><a href="step4" class="pure-menu-link">Step 4</a></li>
                    <li class="pure-menu-item"><a href="step5" class="pure-menu-link">Step 5</a></li>
                </ul>
            </div>
        )
    }
});

ReactDOM.render(
    <SideNav />,
    document.getElementById("side-nav"));