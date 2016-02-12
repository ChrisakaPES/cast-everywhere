var React = React;
var console = console;
var document = document;
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
        var imageContainer = event.currentTarget;
        var descriptionDiv = imageContainer.getElementsByTagName('div')[0];
        descriptionDiv.style.display = "block";
    }.bind(this),
    expandPodcastEntryList: function (event) {
        console.log("Podcast Tile Clicked Meow");
        var tables = document.getElementsByTagName('table');
        console.log(tables);
        for (var tableIndex in tables) {
            console.log(tables[tableIndex]);
            if (tables[tableIndex].style.display !== 'none') {
                tables[tableIndex].style.display = 'none';
            }
        }
        var tile = event.currentTarget;
        tile.style.height = tile.style.height !== "500px" ? "500px" : "350px";
        var podcastEpisodeTable = tile.getElementsByTagName('table');
        podcastEpisodeTable.style.display = 'block';
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

    selectPodcastEpisode: function (event) {}.bind(this),
    render: function () {
        var episodeNodes = this.props.episodes.map(function (episode, i) {
            return React.createElement(
                'tr',
                { onClick: this.selectPodcastEpisode, key: i },
                React.createElement(
                    'td',
                    null,
                    episode.title
                ),
                React.createElement(
                    'td',
                    null,
                    episode.pubDate
                ),
                React.createElement('input', { type: 'hidden', name: 'episodeURL', value: episode.enclosure.url }),
                React.createElement('input', { type: 'hidden', name: 'episodeLength', value: episode.enclosure.length }),
                React.createElement('input', { type: 'hidden', name: 'episodeType', value: episode.enclosure.url })
            );
        });
        return React.createElement(
            'table',
            { className: 'podcast-episode-table' },
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Title'
                ),
                React.createElement(
                    'th',
                    null,
                    'Publish Date'
                )
            ),
            episodeNodes
        );
    }
});
ReactDOM.render(React.createElement(BrowserComponent, null), document.getElementById('main-content'));