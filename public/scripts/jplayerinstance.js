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
    
    var jplayer = $("#jquery_jplayer_1").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                title: "Giant Bombcast",
                mp3: "http://www.giantbomb.com/podcasts/download/1473/Giant_Bombcast_01_12_2016-01-12-2016-0020062817.mp3" 
            });
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

    function canvasMatchProgressBar() {
        checkpointCanvas.css('left', $(".jp-progress").position().left - 3);
        checkpointCanvas.css('height', $(".jp-progress").height());
        checkpointCanvas.css('width', $(".jp-progress").width()+6);

    }
    $(window).resize(canvasMatchProgressBar);
    
    $("#bookmarkButton").click(function(){
        console.log("Meow bookmarkButton Pressed");
        console.log(jPlayerData.status.currentTime);
        var timestamp = Math.floor(jPlayerData.status.currentTime);
        $.post('/ajax/addbookmark', {
            currentTime: timestamp,
            podcast: 'Giantbomb Cast'
        });
        
        var checkpointLocationPoint =  $(".jp-progress").width() * (jPlayerData.status.currentPercentRelative /100); //3 + $(".jp-play-bar").width();//$(".jp-progress").width() * (Math.floor(jPlayerData.status.currentTime) / jPlayerData.status.duration);
        console.log("Checkpoint Spot: " + $(".jp-play-bar").width());
        checkpointCanvasContext.fillStyle = "#FF0000";
        checkpointCanvasContext.moveTo(checkpointLocationPoint + 0, 0);
        checkpointCanvasContext.beginPath();
        checkpointCanvasContext.lineTo(checkpointLocationPoint + 7, 0);
        checkpointCanvasContext.lineTo(checkpointLocationPoint + 7, 7);
        checkpointCanvasContext.lineTo(checkpointLocationPoint + 4, 15);
        checkpointCanvasContext.lineTo(checkpointLocationPoint + 0, 7);
        checkpointCanvasContext.lineTo(checkpointLocationPoint + 0, 0);
        checkpointCanvasContext.stroke();
        checkpointCanvasContext.closePath();
        checkpointCanvasContext.fill();        
    });
    canvasMatchProgressBar();
});


