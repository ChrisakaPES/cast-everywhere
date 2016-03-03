var TestAudioPlayer = React.createClass({
    displayName: "TestAudioPlayer",

    render: function () {
        return React.createElement(
            "section",
            { className: "bottom-of-page" },
            React.createElement("div", { id: "jquery_jplayer_1", className: "jp-jplayer" }),
            React.createElement("input", { id: "hiddenInputForPodcastId", type: "hidden", value: "" }),
            React.createElement(
                "div",
                { id: "jp_container_1", className: "jp-audio", role: "application", "aria-label": "media player" },
                React.createElement(
                    "div",
                    { className: "jp-type-single" },
                    React.createElement(
                        "div",
                        { className: "jp-gui jp-interface" },
                        React.createElement("canvas", { id: "checkpointCanvas", className: "checkpoint-canvas", height: "15", width: "1342" }),
                        React.createElement(
                            "div",
                            { className: "jp-controls" },
                            React.createElement(
                                "button",
                                { className: "jp-play", role: "button", tabindex: "0" },
                                "play"
                            ),
                            React.createElement(
                                "button",
                                { className: "jp-stop", role: "button", tabindex: "0" },
                                "stop"
                            ),
                            React.createElement(
                                "button",
                                { id: "bookmarkButton", className: "bookmark-button", role: "button" },
                                "B"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "jp-progress" },
                            React.createElement(
                                "div",
                                { className: "jp-seek-bar" },
                                React.createElement("div", { className: "jp-play-bar" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "bookmarking section" },
                            React.createElement(
                                "button",
                                { id: "oldbookmarkButton", className: "bookmark-button", role: "button" },
                                "B"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "jp-volume-controls" },
                            React.createElement(
                                "button",
                                { className: "jp-mute", role: "button", tabindex: "0" },
                                "mute"
                            ),
                            React.createElement(
                                "button",
                                { className: "jp-volume-max", role: "button", tabindex: "0" },
                                "max volume"
                            ),
                            React.createElement(
                                "div",
                                { className: "jp-volume-bar" },
                                React.createElement("div", { className: "jp-volume-bar-value" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "jp-time-holder" },
                            React.createElement(
                                "div",
                                { className: "jp-current-time", role: "timer", "aria-label": "time" },
                                " "
                            ),
                            React.createElement(
                                "div",
                                { className: "jp-duration", role: "timer", "aria-label": "duration" },
                                " "
                            ),
                            React.createElement(
                                "div",
                                { className: "jp-toggles" },
                                React.createElement(
                                    "button",
                                    { className: "jp-repeat", role: "button", tabindex: "0" },
                                    "repeat"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "jp-details" },
                        React.createElement(
                            "div",
                            { id: "podcastTitleDiv", className: "jp-title", "aria-label": "title" },
                            " "
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "jp-no-solution" },
                        React.createElement(
                            "span",
                            null,
                            "Update Required"
                        ),
                        "To play the media you will need to either update your browser to a recent version or update your ",
                        React.createElement(
                            "a",
                            { href: "http://get.adobe.com/flashplayer/", target: "_blank" },
                            "Flash plugin"
                        ),
                        "."
                    )
                )
            )
        );
    }
});
ReactDOM.render(React.createElement(TestAudioPlayer, null), document.getElementById('player-div'));