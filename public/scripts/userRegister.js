var UserRegisterForm = React.createClass({
    render: function () {
        return ( 
            <div className="center-form">
                <h1> Register </h1> 
                <form method="post" action = "/register" className= "pure-form pure-form-aligned">
                    <div className="pure-control-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" placeholder="Username"/>
                    </div> 
                    <div className = "pure-control-group" >
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" placeholder="Email Address"/>
                    </div> 
                    <button type="submit" className="pure-button pure-button-primary center-button">Register</button> 
                </form> 
            </div>
        );
    }
});
ReactDOM.render( < UserRegisterForm / >,
    document.getElementById('main-content')
);