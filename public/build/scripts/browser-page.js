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
        var imageContainer = event.currentTarget;
        var descriptionDiv = imageContainer.getElementsByTagName('div')[0];
        descriptionDiv.style.display = "block";
    }.bind(this),
    expandPodcastEntryList: function (event) {
        console.log("Podcast Tile Clicked Meow");
        console.log(event);
        var tile = event.currentTarget;
        tile.style.height = tile.style.height !== "500px" ? "500px" : "350px";
    }.bind(this),
    hideDescription: function (event) {
        var imageContainer = event.currentTarget;
        var descriptionDiv = imageContainer.getElementsByTagName('div')[0];
        descriptionDiv.style.display = "none";
    }.bind(this),
    render: function () {
        console.log(this.props.podcastInfo);
        return React.createElement(
            'div',
            { className: 'podcast-tile', onClick: this.expandPodcastEntryList },
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
            ),
            React.createElement(PodcastEpisodeListings, { episodes: this.props.podcastInfo.feed.entries })
        );
    }

});
var PodcastEpisodeListings = React.createClass({
    displayName: 'PodcastEpisodeListings',

    render: function () {
        var episodeNodes = this.props.episodes.map(function (episode, i) {
            return;
        });
        return React.createElement('div', null);
    }
});
ReactDOM.render(React.createElement(BrowserComponent, null), document.getElementById('main-content'));