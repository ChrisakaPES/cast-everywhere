//$(document).ready(function() {
//    $("#jquery_jplayer_1").jPlayer({
//        ready: function() {
//            $(this).jPlayer("setMedia", {
//                title: "MeowTest",
//                m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
//                oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
//            });
//        },
//        cssSelectorAncestor: "#jp_container_1",
//        swfPath: "/swf",
//        supplied: "m4a, ogg",
//        useStateClassSkin: true,
//        autoblur: false,
//        smoothPlayBar: true,
//        keyEnabled: true,
//        remainingDuration: true,
//        toggleDuration: true
//    }); 
//});
var jplayerDiv, loadCheckPoints;
$(document).ready(function() {
    var checkpointCanvas = $('#checkpointCanvas');
    var checkpointCanvasContext = checkpointCanvas[0].getContext('2d');
    
    function canvasMatchProgressBar() {
        checkpointCanvas.css('left', $(".jp-progress").position().left - 3);
        checkpointCanvas.css('height', $(".jp-progress").height());
        checkpointCanvas.css('width', $(".jp-progress").width()+6);
    }
    
    function drawCheckpoint(startingPoint) {
        console.log(startingPoint);
        checkpointCanvasContext.fillStyle = "#FF0000";
        checkpointCanvasContext.moveTo(startingPoint + 0, 0);
        checkpointCanvasContext.beginPath();
        checkpointCanvasContext.lineTo(startingPoint + 7, 0);
        checkpointCanvasContext.lineTo(startingPoint + 7, 7);
        checkpointCanvasContext.lineTo(startingPoint + 4, 15);
        checkpointCanvasContext.lineTo(startingPoint + 0, 7);
        checkpointCanvasContext.lineTo(startingPoint + 0, 0);
        checkpointCanvasContext.stroke();
        checkpointCanvasContext.closePath();
        checkpointCanvasContext.fill();        
    }
    function clearCanvas() {
        checkpointCanvasContext.save();
        
        checkpointCanvasContext.setTransform(1,0,0,1,0,0);
        checkpointCanvasContext.clearRect(0, 0, checkpointCanvas.width, checkpointCanvas.height);
        
        checkpointCanvasContext.restore();

    }
    loadCheckPoints = function (duration) {
        var podcastId = document.getElementById('hiddenInputForPodcastId').value,
            podcastTitle = document.getElementById('podcastTitleDiv').innerHTML;
        $.getJSON('/ajax/getcheckpoints',{
            podcastId: podcastId,
            podcastTitle: podcastTitle
        }).done(function(json){
            console.log(json);  
            for(var i = 0; i < json.length; i++) {
                 console.log(json[i]);
                var checkpointLocationPoint = $(".jp-progress").width() * (Math.floor(json[i]) / duration);
                drawCheckpoint(checkpointLocationPoint);
            }
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
        //console.log(data);
    }
    jplayerDiv = $("#jquery_jplayer_1");
    var jplayer = jplayerDiv.jPlayer({
        ready: function(event) {
//            $(this).jPlayer("setMedia", {
//                title: "Giant Bombcast",
//                mp3: "http://www.giantbomb.com/podcasts/download/1473/Giant_Bombcast_01_12_2016-01-12-2016-0020062817.mp3" 
//            });
//            $(this).jPlayer("load");
//            console.log(event.jPlayer.status);
//            loadCheckpoints(event.jPlayer.status.duration);
        },
        click: function(event) {
            console.log(event.jPlayer);
        },
        loadeddata: function(event) {
            clearCanvas();
            console.log(event.jPlayer.status.duration);
            loadCheckPoints(event.jPlayer.status.duration);
        },
        loadedmetadata: function(event) {
            
        },
        play: function(event) {
            
        },
        cssSelectorAncestor: "#jp_container_1",
        swfPath: "/swf",
        supplied: "mp3",
        useStateClassSkin: true,
        autoblur: false,
        smoothPlayBar: false,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true,
        size: {
            width: "100%",
            height: "0"
        }
    });
    var jPlayerData = $("#jquery_jplayer_1").data('jPlayer');

    $(window).resize(canvasMatchProgressBar);
    
    $("#bookmarkButton").click(function(){
        console.log("Meow bookmarkButton Pressed");
        console.log(jPlayerData.status);
        var podcastId = document.getElementById('hiddenInputForPodcastId').value,
            podcastTitle = document.getElementById('podcastTitleDiv').innerHTML,
            timestamp = Math.floor(jPlayerData.status.currentTime);
        
        $.post('/ajax/addbookmark', {
            currentTime: timestamp,
            podcastId: podcastId,
            podcastTitle: podcastTitle
        });
        var checkpointLocationPoint = $(".jp-progress").width() * (Math.floor(jPlayerData.status.currentTime) / jPlayerData.status.duration);
        //$(".jp-progress").width() * (jPlayerData.status.currentPercentRelative /100); //3 + $(".jp-play-bar").width();
        //$(".jp-progress").width() * (Math.floor(jPlayerData.status.currentTime) / jPlayerData.status.duration);
        console.log("Checkpoint Spot: " + $(".jp-play-bar").width());
        drawCheckpoint(checkpointLocationPoint);
    });

    canvasMatchProgressBar();

    console.log(jplayer);
//    loadCheckpoints(jPlayerData.status.duration)
});


