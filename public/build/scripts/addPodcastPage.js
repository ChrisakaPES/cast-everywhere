var AddPodcastForm = React.createClass({
    displayName: "AddPodcastForm",

    render: function () {
        return React.createElement(
            "div",
            { className: "test-background" },
            React.createElement(
                "form",
                { method: "post", action: "/addPodcast", className: "pure-form pure-form-aligned" },
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "title" },
                        "Podcast Name:"
                    ),
                    React.createElement("input", { type: "text", name: "title", placeholder: "Podcast Name" })
                ),
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "podcasturl" },
                        "Podcast RSS Url:"
                    ),
                    React.createElement("input", { type: "text", name: "podcasturl", placeholder: "www.example.com/rss/podcast.rss" })
                ),
                React.createElement(
                    "div",
                    { className: "pure-control-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "description" },
                        "Description:"
                    ),
                    React.createElement("textarea", { name: "description", rows: "5", cols: "100" })
                ),
                React.createElement(
                    "button",
                    { type: "submit", className: "pure-button pure-button-primary" },
                    "Submit"
                )
            )
        );
    }
});
ReactDOM.render(React.createElement(AddPodcastForm, null), document.getElementById('main-content'));