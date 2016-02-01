var AddPodcastForm = React.createClass({
    render: function () {
        return (
            <div className="test-background">
                <form method="post" action="/addPodcast" className="pure-form pure-form-aligned">
                    <div className="pure-control-group">
                        <label htmlFor="title">Podcast Name:</label>
                        <input type="text" name="title" placeholder="Podcast Name" />
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="podcasturl">Podcast RSS Url:</label>
                        <input type="text" name="podcasturl" placeholder="www.example.com/rss/podcast.rss" />
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" rows="5" cols="100" />
                    </div>
                    <button type="submit" className="pure-button pure-button-primary">Submit</button>
                </form>
            </div>
            )
    }
});
ReactDOM.render(<AddPodcastForm />,
    document.getElementById('main-content'));