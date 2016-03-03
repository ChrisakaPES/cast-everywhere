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
        $.ajax({
            url: '/ajax/getloggedinuser',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log("Data pulled from RSS feed");
                console.log(data);
                this.setState({ user: data });
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
            React.createElement(PodcastTileArray, { podcasts: this.state.data, user: this.state.user })
        );
    }
});

var PodcastTileArray = React.createClass({
    displayName: 'PodcastTileArray',

    render: function () {
        var currentUser = this.props.user;
        var podcastNodes = this.props.podcasts.map(function (podcast, i) {
            return React.createElement(PodcastTileListing, { key: i, podcastInfo: podcast, user: currentUser });
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
        //Determine if currently clicked tile should expand or collapse at end of function
        var shouldTileExpand = false;
        var tile = event.currentTarget.parentElement;

        if (tile.className.indexOf('tile-collapsed') !== -1) {
            console.log("tile should Expand Meow");
            shouldTileExpand = true;
        }
        //close all open Tiles by searching all tiles and collapsing tables and tiles that are open
        var tiles = document.getElementsByClassName('podcast-tile');

        for (var tI = 0; tI < tiles.length; tI++) {
            //Maybe look for a way to break out of this as soon as a tile is changed (it is unlikely that more than one would be open at a time.
            if (tiles[tI].className.indexOf('tile-expanded') !== -1) {
                var tableOfExpandedTile = tiles[tI].getElementsByClassName('podcast-episode-table')[0];
                tableOfExpandedTile.className = tableOfExpandedTile.className.replace(/(?:^|\s)table-expanded(?!\S)/g, ' table-collapsed');
                tiles[tI].className = tiles[tI].className.replace(/(?:^|\s)tile-expanded(?!\S)/g, ' tile-collapsed');
                break;
            }
        }
        //open current tile if tile was closed prior to closing of all tiles
        if (shouldTileExpand) {
            if (tile.className.indexOf('tile-collapsed') !== -1) {
                tile.className = tile.className.replace(/(?:^|\s)tile-collapsed(?!\S)/g, ' tile-expanded');
                var tableOfTile = tile.getElementsByClassName('podcast-episode-table')[0];
                tableOfTile.className = tableOfTile.className.replace(/(?:^|\s)table-collapsed(?!\S)/g, ' table-expanded');
            }
        }
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
            { className: 'podcast-tile tile-collapsed' },
            React.createElement(
                'div',
                { className: 'image-overlay-container', onClick: this.expandPodcastEntryList, onMouseOver: this.displayDescription, onMouseOut: this.hideDescription },
                React.createElement('img', { className: 'podcast-image', src: this.props.podcastInfo.feed.image.url }),
                React.createElement(
                    'div',
                    { className: 'podcast-description' },
                    this.props.podcastInfo.feed.description
                ),
                React.createElement(SubscriptionButton, { user: this.props.user, podcastId: this.props.podcastInfo._id })
            ),
            React.createElement(
                'h2',
                { className: 'no-margin' },
                this.props.podcastInfo.feed.title
            ),
            React.createElement(PodcastEpisodeListings, { podcastId: this.props.podcastInfo._id, episodes: this.props.podcastInfo.feed.entries })
        );
    }

});
var SubscriptionButton = React.createClass({
    displayName: 'SubscriptionButton',

    componentDidMount: function () {
        $.ajax({
            url: '/ajax/getsubscriptionstatus',
            data: {
                podcastId: this.props.podcastId,
                userId: this.props.user.userId
            },
            dataType: 'json',
            cache: false,
            type: "POST",
            success: function (data) {
                console.log("Data pulled from RSS feed");
                console.log(data);
                this.setState({ isSubscribed: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { isSubscribed: false };
    },
    handleSubscription: function (event) {
        event.preventDefault();
        this.toggleSubscription();
    },
    toggleSubscription: function () {
        $.ajax({
            url: '/ajax/togglesubscription',
            data: {
                podcastId: this.props.podcastId,
                userId: this.props.user.userId
            },
            dataType: 'json',
            cache: false,
            type: "POST",
            success: function (data) {
                console.log("Data pulled from RSS feed");
                console.log(data);
                this.setState({ isSubscribed: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('/ajax/togglesubscription', status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var buttonText;
        if (this.state.isSubscribed) {
            //display a button to unsubscribe to podcast
            buttonText = 'Unsubscribe';
        } else {
            //display a button that subscribes to podcast
            buttonText = 'Subscribe';
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { type: 'submit', onClick: this.handleSubscription, className: 'pure-button pure-button-primary center-button subscription-button' },
                buttonText,
                React.createElement('input', { type: 'hidden', value: this.props.podcastId })
            )
        );
    }
});
var PodcastEpisodeListings = React.createClass({
    displayName: 'PodcastEpisodeListings',

    selectPodcastEpisode: function (event) {
        var inputs = event.currentTarget.getElementsByTagName('input');
        var urlToLoad, lengthOfEpisode, episodeType, episodeName;
        for (var i = 0; i < inputs.length; i++) {
            switch (inputs[i].name) {
                case 'episodeURL':
                    urlToLoad = inputs[i].value;
                    break;
                case 'episodeLength':
                    lengthOfEpisode = inputs[i].value;
                    break;
                case 'episodeType':
                    episodeType = inputs[i].value;
                    break;
                case 'episodeTitle':
                    episodeName = inputs[i].value;
                    break;
            }
        }
        console.log(urlToLoad + ': ' + lengthOfEpisode + ', ' + episodeType);
        jplayerDiv.jPlayer("setMedia", {
            title: episodeName,
            mp3: urlToLoad
        }).jPlayer("play");
        //loadCheckPoints();
        var podcastId = this.props.podcastId;
        document.getElementById('hiddenInputForPodcastId').value = podcastId;
        //        $.ajax({
        //            url:'/ajax/getcheckpoints/?podcastId=' + podcastId + '&episodeTitle=' + episodeName,
        //            dataType: 'json',
        //            cache: true,
        //            type: 'GET',
        //            success: function(data) {
        //                //get array of checkpoint locations pass it to jPlayer  
        //            }.bind(this),
        //            error: function (xhr, status, err) {
        //                console.error(xhr, status, err.toString());    
        //            }.bind(this)
        //           
        //        });
    },
    render: function () {
        var episodeNodes = this.props.episodes.map(function (episode, i) {
            if (i > 30) return;
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
                React.createElement('input', { type: 'hidden', name: 'episodeTitle', value: episode.title }),
                React.createElement('input', { type: 'hidden', name: 'episodeURL', value: episode.enclosure.url }),
                React.createElement('input', { type: 'hidden', name: 'episodeLength', value: episode.enclosure.length }),
                React.createElement('input', { type: 'hidden', name: 'episodeType', value: episode.enclosure.type })
            );
        }.bind(this));
        return React.createElement(
            'table',
            { className: 'podcast-episode-table pure-table pure-table-horizontal table-collapsed' },
            React.createElement(
                'thead',
                null,
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
                )
            ),
            React.createElement(
                'tbody',
                null,
                episodeNodes
            )
        );
    }
});
ReactDOM.render(React.createElement(BrowserComponent, null), document.getElementById('main-content'));