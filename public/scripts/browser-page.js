var React = React;
var console = console;
var document = document;
var BrowserComponent = React.createClass({
    getInitialState: function () {
        return{data: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: '/ajax/getallpodcasts',
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
            <div className="test-background">
                <PodcastTileArray podcasts={this.state.data} />
            </div>
        );    
    }
});

var PodcastTileArray = React.createClass({
    render: function() {
        var podcastNodes = this.props.podcasts.map(function(podcast, i) {
            return (
                <PodcastTileListing key={i} podcastInfo={podcast} /> 
            );
        });
        return (
            <div className="podcast-tile-array">
                {podcastNodes}
            </div>
        );
    }
});
var PodcastTileListing = React.createClass({
    displayDescription: function(event) {
        var imageContainer = event.currentTarget;
        var descriptionDiv = imageContainer.getElementsByTagName('div')[0];
        descriptionDiv.style.display = "block";
        
    }.bind(this),
    expandPodcastEntryList: function(event) {
        console.log("Podcast Tile Clicked Meow");
        //Determine if currently clicked tile should expand or collapse at end of function
        var shouldTileExpand = false;
        var tile = event.currentTarget.parentElement;
        
        if(tile.className.indexOf('tile-collapsed') !== -1) {
            console.log("tile should Expand Meow");
            shouldTileExpand = true;
        }
        //close all open Tiles by searching all tiles and collapsing tables and tiles that are open
        var tiles = document.getElementsByClassName('podcast-tile');
        
        for(var tI = 0; tI < tiles.length; tI++) { //Maybe look for a way to break out of this as soon as a tile is changed (it is unlikely that more than one would be open at a time.
            if(tiles[tI].className.indexOf('tile-expanded') !== -1) {
                var tableOfExpandedTile = tiles[tI].getElementsByClassName('podcast-episode-table')[0];
                tableOfExpandedTile.className = tableOfExpandedTile.className.replace( /(?:^|\s)table-expanded(?!\S)/g , ' table-collapsed' );
                tiles[tI].className = tiles[tI].className.replace( /(?:^|\s)tile-expanded(?!\S)/g , ' tile-collapsed');
                break;
            }
        }
        //open current tile if tile was closed prior to closing of all tiles
        if(shouldTileExpand) {
            if(tile.className.indexOf('tile-collapsed') !== -1) {
                tile.className = tile.className.replace( /(?:^|\s)tile-collapsed(?!\S)/g , ' tile-expanded' );
                var tableOfTile = tile.getElementsByClassName('podcast-episode-table')[0];
                tableOfTile.className = tableOfTile.className.replace( /(?:^|\s)table-collapsed(?!\S)/g , ' table-expanded' );  
                
            }
        }
        
    }.bind(this),
    hideDescription: function(event) {
        var imageContainer = event.currentTarget;
        var descriptionDiv = imageContainer.getElementsByTagName('div')[0];
        descriptionDiv.style.display = "none";
    }.bind(this),
    render: function() {
        console.log(this.props.podcastInfo);
        return (
            <div className="podcast-tile tile-collapsed" >
                <div className="image-overlay-container" onClick={this.expandPodcastEntryList} onMouseOver={this.displayDescription} onMouseOut={this.hideDescription}>
                    <img className="podcast-image"  src={this.props.podcastInfo.feed.image.url} />
                    <div className="podcast-description">{this.props.podcastInfo.feed.description}</div>
                </div>
                <h2 className="no-margin">{this.props.podcastInfo.feed.title}</h2>
                <PodcastEpisodeListings episodes={this.props.podcastInfo.feed.entries}/>
            </div>
        );
    }
        
});
var PodcastEpisodeListings = React.createClass({
    selectPodcastEpisode: function(event) {
        console.log("Episode Selected");
        var inputs = event.currentTarget.getElementsByTagName('input');
        var urlToLoad, lengthOfEpisode, episodeType;
        for(var i = 0; i< inputs.length; i++) {
            switch(inputs[i].name) {
                case 'episodeURL': 
                    urlToLoad = inputs[i].value;
                    break;
                case 'episodeLength':
                    lengthOfEpisode = inputs[i].value;
                    break;
                case 'episodeType':
                    episodeType = inputs[i].value;
                    break;
            }
        }
//        jplayer.jPlayer( "setMedia", {
//            mp3: urlToLoad
//        }).jPlayer("play");
         
    }.bind(this),
    render: function() {
        var episodeNodes = this.props.episodes.map(function (episode, i) {
            if(i > 30) return;   
            return (
            <tr onClick={this.selectPodcastEpisode} key={i}>
                    <td>{episode.title}</td>
                    <td>{episode.pubDate}</td>
                    <input type="hidden" name="episodeURL" value={episode.enclosure.url}></input>
                    <input type="hidden" name="episodeLength" value={episode.enclosure.length}></input>
                    <input type="hidden" name="episodeType" value={episode.enclosure.url}></input>
                </tr>
            );
        }.bind(this));
        return (
            <table className="podcast-episode-table pure-table pure-table-horizontal table-collapsed">
               <thead> 
                    <tr>
                        <th>Title</th>
                        <th>Publish Date</th>
                    </tr>
                </thead>
                <tbody>
                    {episodeNodes}
                </tbody>
            </table>
        );
    }
});
ReactDOM.render(<BrowserComponent />,
        document.getElementById('main-content'));