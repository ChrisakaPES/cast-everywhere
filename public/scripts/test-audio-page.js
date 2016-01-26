var TestAudioPlayer = React.createClass({
    render: function () {
        return (
            <section className="bottom-of-page">
                
                <div id="jquery_jplayer_1" className="jp-jplayer"></div>
                <div id="jp_container_1" className="jp-audio" role="application" aria-label="media player">
                    <div className="jp-type-single">
                        <div className="jp-gui jp-interface">
                            <canvas id="checkpointCanvas" className="checkpoint-canvas" height="15" width="1342"></canvas>
                            <div className="jp-controls">
                                <button className="jp-play" role="button" tabindex="0">play</button>
                                <button className="jp-stop" role="button" tabindex="0">stop</button>
                                <button id="bookmarkButton" className="bookmark-button" role="button">B</button>
                            </div>
                            <div className="jp-progress">
                                <div className="jp-seek-bar">
                                    <div className="jp-play-bar"></div>
                                </div>
                            </div>
                            <div className="bookmarking section">
                                <button id="oldbookmarkButton" className="bookmark-button" role="button">B</button>
                            </div>
                            <div className="jp-volume-controls">
                                <button className="jp-mute" role="button" tabindex="0">mute</button>
                                <button className="jp-volume-max" role="button" tabindex="0">max volume</button>
                                <div className="jp-volume-bar">
                                    <div className="jp-volume-bar-value"></div>
                                </div>
                            </div>
                            <div className="jp-time-holder">
                                <div className="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
                                <div className="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
                                <div className="jp-toggles">
                                    <button className="jp-repeat" role="button" tabindex="0">repeat</button>
                                </div>
                            </div>
                        </div>
                        <div className="jp-details">
                            <div className="jp-title" aria-label="title">&nbsp;</div>
                        </div>
                        <div className="jp-no-solution">
                            <span>Update Required</span>
                            To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                        </div>
                    </div>
                </div>
            </section>  
                
        );
    }
});
ReactDOM.render(
    <TestAudioPlayer />,
    document.getElementById('main-content')
);