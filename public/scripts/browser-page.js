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
                console.log(data)
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
            
        )    
    
    }
    
});

var PodcastTileArray = React.createClass({
    render: function() {
        var podcastNodes = this.props.podcasts.map(function(podcast) {
            return (
                <PodcastTileListing podastInfo={podcast} /> 
            )
        });
        return (
            <div className="podcast-tile-array">
                {podcastNodes}
            </div>
        )
    }
});
var PodcastTileListing = React.createClass({
    render: function() {
        console.log(this.props.podcastInfo);
        return (
            <div className="podcast-tile">
                <img src={this.props.podcastInfo.feed.image.url} />
            </div>
        )
    }
        
});
ReactDOM.render(<BrowserComponent />,
        document.getElementById('main-content'));