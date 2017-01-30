//Animation Part

$(document).ready(function () {
    function beeLeft() {
        $("#img2").animate({top: "-=20"}, 2400, "swing", beeRight);
    }

    function beeRight() {
        $("#img2").animate({top: "+=20"}, 2400, "swing", beeLeft);
    }

    beeRight();

    function beeLeft1() {
        $("#img1").animate({top: "-=25"}, 2300, "swing", beeRight1);
    }

    function beeRight1() {
        $("#img1").animate({top: "+=25"}, 2300, "swing", beeLeft1);
    }

    beeRight1();

    function beeLeft3() {
        $("#img3").animate({top: "-=15"}, 2100, "swing", beeRight3);
    }

    function beeRight3() {
        $("#img3").animate({top: "+=15"}, 1100, "swing", beeLeft3);
    }

    beeRight3();

    function beeLeft4() {
        $("#img4").animate({top: "-=15"}, 2200, "swing", beeRight4);
    }

    function beeRight4() {
        $("#img4").animate({top: "+=15"}, 1200, "swing", beeLeft4);
    }

    beeRight4();

    function beeLeft5() {
        $("#img5").animate({top: "-=15"}, 1800, "swing", beeRight5);
    }

    function beeRight5() {
        $("#img5").animate({top: "+=15"}, 1800, "swing", beeLeft5);
    }

    beeRight5();

    $("#img1").hover(function () {
        $(this).stop();
        $(this).animate({
            height: '160',
            width: '160'
        }, "fast");
    });
    $("#img1").mouseleave(function () {
        $(this).animate({
            height: '150',
            width: '150'
        }, "fast");
        $("#img1").animate({top: "80"}, 1500, "swing", beeRight1);
    });

    $("#img2").hover(function () {
        $(this).stop();
        $(this).animate({
            height: '110',
            width: '110'
        }, "fast");
    });
    $("#img2").mouseleave(function () {
        $(this).animate({
            height: '100',
            width: '100'
        }, "fast");
        $("#img2").animate({top: "-10"}, 1500, "swing", beeRight);
    });

    $("#img3").hover(function () {
        $(this).stop();
        $(this).animate({
            height: '130',
            width: '130'
        }, "fast");
    });
    $("#img3").mouseleave(function () {
        $(this).animate({
            height: '120',
            width: '120'
        }, "fast");
        $("#img3").animate({top: "150"}, 1500, "swing", beeRight3);
    });

    $("#img4").hover(function () {
        $(this).stop();
        $(this).animate({
            height: '160',
            width: '160'
        }, "fast");
    });
    $("#img4").mouseleave(function () {
        $(this).animate({
            height: '150',
            width: '150'
        }, "fast");
        $("#img4").animate({top: "360"}, 1500, "swing", beeRight4);
    });

    $("#img5").hover(function () {
        $(this).stop();
        $(this).animate({
            height: '140',
            width: '140'
        }, "fast");
    });
    $("#img5").mouseleave(function () {
        $(this).animate({
            height: '130',
            width: '130'
        }, "fast");
        $("#img5").animate({top: "300"}, 1500, "swing", beeRight5);
    });

});

//MP3 Player(Amplitude JS part)

Amplitude.init({
    "songs": [
        {
            "name": "Rooms",
            "artist": "Mia and Jonah",
            "album": "Rooms For Adelaide",
            "url": "assets/amplitudeJS/song.mp3",
            "live": false,
            "cover_art_url": "assets/amplitudeJS/images/roomsforadelaide.jpg"
        }
    ],
    "default_album_art": "assets/amplitudeJS/images/no-cover.png"
});


$('#small-player').hover(function () {
    $('#small-player-middle-controls').show();
    $('#small-player-middle-meta').hide();
}, function () {
    $('#small-player-middle-controls').hide();
    $('#small-player-middle-meta').show();
});