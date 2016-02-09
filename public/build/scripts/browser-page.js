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
            React.createElement(PodcastTileArray, { podcasts: this.state.data })
        );
    }

});

var PodcastTileArray = React.createClass({
    displayName: 'PodcastTileArray',

    render: function () {
        var podcastNodes = this.props.podcasts.map(function (podcast) {
            return React.createElement(PodcastTileListing, { podastInfo: podcast });
        });
        return React.createElement(
            'div',
            { className: 'podcast-tile-array' },
            podcastNodes
        );
    }
});
var PodcastTileListing = React.createClass({
    displayName: 'PodcastTileListing',

    render: function () {
        console.log(this.props.podcastInfo);
        return React.createElement(
            'div',
            { className: 'podcast-tile' },
            React.createElement('img', { src: this.props.podcastInfo.feed.image.url })
        );
    }

});
ReactDOM.render(React.createElement(BrowserComponent, null), document.getElementById('main-content'));