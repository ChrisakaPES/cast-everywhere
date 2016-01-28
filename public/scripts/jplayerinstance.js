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
    function loadCheckpoints(duration) {
        $.getJSON('/ajax/getcheckpoints',{
            title: "Giant Bombcast",
            mp3: "http://www.giantbomb.com/podcasts/download/1473/Giant_Bombcast_01_12_2016-01-12-2016-0020062817.mp3"
        }).done(function(json){
            console.log();  
            for(var checkpoint in json){
                 console.log(json[checkpoint].timeStampInSecs);
                var checkpointLocationPoint = $(".jp-progress").width() * (Math.floor(json[checkpoint].timeStampInSecs) / duration);
                drawCheckpoint(checkpointLocationPoint);
            }
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
        //console.log(data);
    }
    var jplayer = $("#jquery_jplayer_1").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                title: "Giant Bombcast",
                mp3: "http://www.giantbomb.com/podcasts/download/1473/Giant_Bombcast_01_12_2016-01-12-2016-0020062817.mp3" 
            });
            $(this).jPlayer("play");
            $(this).jPlayer("pause");
            console.log(event.jPlayer.status);
            loadCheckpoints(event.jPlayer.status.duration);
        },
        click: function(event) {
            console.log(event.jPlayer);
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
        var timestamp = Math.floor(jPlayerData.status.currentTime);
        $.post('/ajax/addbookmark', {
            currentTime: timestamp,
            podcast: 'Giant Bombcast'
        });
        var checkpointLocationPoint = $(".jp-progress").width() * (Math.floor(jPlayerData.status.currentTime) / jPlayerData.status.duration);
        //$(".jp-progress").width() * (jPlayerData.status.currentPercentRelative /100); //3 + $(".jp-play-bar").width();
        //$(".jp-progress").width() * (Math.floor(jPlayerData.status.currentTime) / jPlayerData.status.duration);
        console.log("Checkpoint Spot: " + $(".jp-play-bar").width());
        drawCheckpoint(checkpointLocationPoint);
    });

    canvasMatchProgressBar();

//    console.log(jPlayerData.status);
//    loadCheckpoints(jPlayerData.status.duration)
});


