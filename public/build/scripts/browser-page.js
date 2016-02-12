var React = React;
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
        var podcastNodes = this.props.podcasts.map(function (podcast, i) {
            return React.createElement(PodcastTileListing, { key: i, podcastInfo: podcast });
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

    displayDescription: function (event) {
        console.log("Podcast Description Meow");
        console.log(event);
    }.bind(this),
    expandPodcastEntryList: function (element, podcastEntries) {
        console.log("Podcast Tile Clicked Meow");
        console.log(element);
        console.log(podcastEntries);
    }.bind(this),
    hideDescription: function () {}.bind(this),
    render: function () {
        console.log(this.props.podcastInfo);
        return React.createElement(
            'div',
            { className: 'podcast-tile', onclick: this.expandPodcastEntryList(this, this.props.podcastInfo.entries) },
            React.createElement(
                'div',
                { className: 'image-overlay-container', onMouseOver: this.displayDescription, onMouseOut: this.hideDescription },
                React.createElement('img', { className: 'podcast-image', src: this.props.podcastInfo.feed.image.url }),
                React.createElement(
                    'div',
                    { className: 'podcast-description' },
                    this.props.podcastInfo.feed.description
                )
            ),
            React.createElement(
                'h2',
                { className: 'no-margin' },
                this.props.podcastInfo.feed.title
            )
        );
    }

});
ReactDOM.render(React.createElement(BrowserComponent, null), document.getElementById('main-content'));