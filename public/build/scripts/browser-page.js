var BrowserComponent = React.createClass({
    displayName: 'BrowserComponent',

    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        $.ajax({
            url: '/ajax/getallpodcasts',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log("Data pulled from RSS feed");
                console.log(data);
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'test-background' },
            'Meow'
        );
    }

});
//var PodcastTileArray = React.createClass({
//    render
//})
ReactDOM.render(React.createElement(BrowserComponent, null), document.getElementById('main-content'));