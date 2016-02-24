var SideNav = React.createClass({
    componentDidMount: function() {
        //this.isUserLoggedIn();   
    },
    getInitialState: function() {
        return {user: {}}  
    },
    isUserLoggedIn() {
        //Complete This one sessions are done
        $.ajax({
            url: '/ajax/',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log("Data pulled from RSS feed");
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });  
    },
    render: function () {
        return (
            <div className="pure-menu">
                <a className="pure-menu-heading" href="/">Cast Everywhere</a>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="/" className="pure-menu-link">Discover</a></li>
                    <li className="pure-menu-item"><a href="step2" className="pure-menu-link">Subscriptions</a></li>

                    <li className="pure-menu-item menu-item-divided pure-menu-selected">
                        <a href="step3" className="pure-menu-link">Step 3</a>
                    </li>

                    <li className="pure-menu-item"><a href="step4" className="pure-menu-link">Step 4</a></li>
                    <li className="pure-menu-item"><a href="step5" className="pure-menu-link">Options</a></li>
                </ul>
            </div>
        )
    }
});

ReactDOM.render(
    <SideNav />,
    document.getElementById("menu"));