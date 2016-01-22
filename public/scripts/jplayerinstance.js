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
    var jplayer = $("#jquery_jplayer_1").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                title: "Giant Bombcast",
                mp3: "http://www.giantbomb.com/podcasts/download/1473/Giant_Bombcast_01_12_2016-01-12-2016-0020062817.mp3" 
            });
//            $("#bookmarkButton").click(function() {
//                console.log("Meow bookmarkButton Pressed");
//                console.log(event);
//            });
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
    var checkpointCanvasContext = $('#checkpointCanvas')[0].getContext('2d');
    
    $("#bookmarkButton").click(function(){
        console.log("Meow bookmarkButton Pressed");
        console.log(jPlayerData.status.currentTime);
        var timestamp = jPlayerData.status.currentTime
        $.post('/ajax/addbookmark', {
            currentTime: timestamp,
            podcast: 'Giantbomb Cast'
        });
        
        checkpointCanvasContext.moveTo(0,0);
        checkpointCanvasContext.beginPath();
        checkpointCanvasContext.lineTo(0,8);
        checkpointCanvasContext.lineTo(8,8);
        checkpointCanvasContext.lineTo(8,0);
        checkpointCanvasContext.lineTo(0,0);
        checkpointCanvasContext.stroke();
        
        checkpointCanvasContext.moveTo(20,1);
        checkpointCanvasContext.beginPath();
        checkpointCanvasContext.lineTo(20,9);
        checkpointCanvasContext.lineTo(28,9);
        checkpointCanvasContext.lineTo(28,1);
        checkpointCanvasContext.lineTo(20,1);
        checkpointCanvasContext.stroke();
        
    });
});


