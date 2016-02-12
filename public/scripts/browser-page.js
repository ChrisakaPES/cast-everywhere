var React = React;
var console = console;
var document = document;
var BrowserComponent = React.createClass({
    getInitialState: function() {
        return{data: []};
    },
    componentDidMount: function() {
        $.ajax({
              url: '/ajax/getallpodcasts',
              dataType: 'json',
              cache: false,
              success: function(data) {
                console.log("Data pulled from RSS feed");
                console.log(data);
                this.setState({data: data});
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
        });
    },
    render: function() {
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
        var tables = document.getElementsByTagName('table')
        console.log(tables);
        for(var tableIndex in tables) {
            console.log(tables[tableIndex]);
            if(tables[tableIndex].style.display !== 'none') {
                tables[tableIndex].style.display = 'none';
            }
        }
        var tile = event.currentTarget;
        tile.style.height = (tile.style.height !== "500px") ? "500px" : "350px";
        var podcastEpisodeTable = tile.getElementsByTagName('table');
        podcastEpisodeTable.style.display = 'block';
    
    }.bind(this),
    hideDescription: function(event) {
        var imageContainer = event.currentTarget;
        var descriptionDiv = imageContainer.getElementsByTagName('div')[0];
        descriptionDiv.style.display = "none";
    }.bind(this),
    render: function() {
        console.log(this.props.podcastInfo);
        return (
            <div className="podcast-tile" onClick={this.expandPodcastEntryList}>
                <div className="image-overlay-container" onMouseOver={this.displayDescription} onMouseOut={this.hideDescription}>
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
        
    }.bind(this),
    render: function() {
        var episodeNodes = this.props.episodes.map(function (episode, i) {
            return (
            <tr onClick={this.selectPodcastEpisode} key={i}>
                    <td>{episode.title}</td>
                    <td>{episode.pubDate}</td>
                    <input type="hidden" name="episodeURL" value={episode.enclosure.url}></input>
                    <input type="hidden" name="episodeLength" value={episode.enclosure.length}></input>
                    <input type="hidden" name="episodeType" value={episode.enclosure.url}></input>
                </tr>
            );
        });
        return (
            <table className="podcast-episode-table">
                <tr>
                    <th>Title</th>
                    <th>Publish Date</th>
                </tr>
                {episodeNodes}
            
            </table>
        );
    }
});
ReactDOM.render(<BrowserComponent />,
        document.getElementById('main-content'));