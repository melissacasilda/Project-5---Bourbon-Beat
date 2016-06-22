
var bourbon = {};

bourbon.apiURL = 'http://lcboapi.com/products';

// LCBO AJAX CALL TO GET INFORMATION
bourbon.getData = function() {
    $.ajax({
        url: bourbon.apiURL,
        method: 'GET',
        dataType: 'jsonp',
        header: {
            'Authorization': "MDpkZWFhNzdmYS0xZDM2LTExZTYtYTRkOC02YjhlZDJhM2ZmYzQ6dXVmR2RtaDlJVzlRM204WmwxZGlXUEdDUjBvRGFoTTJONjYz"
        },
        data: {
            per_page: 50,
            q: "bourbon"
        }
    }).then(function(bourbonData) {
        bourbon.displayData(bourbonData.result);
    });
};


// FUNCTION TO DISPLAY DATA ONTO PAGE
bourbon.displayData = function(bourbonData){

    var filterBourbon = bourbonData.filter(function(results){
        return (results.tertiary_category === "Bourbon / American Whiskey");
    });
    // console.log(filterBourbon);

    // FILTERING BOURBON INTO FLAVOUR NOTES
    var spicyArray = filterBourbon.filter(function(results){
        return(results.style === "Medium & Spicy" || results.style === "Bold & Spicy");
    });

    var sweetArray = filterBourbon.filter(function(results){
        return(results.style === "Medium & Sweet" || results.style === "Medium & Fruity")
    });

    var smokeyArray = filterBourbon.filter(function(results){
        return(results.style === "Bold & Sweet" || results.style === "Bold & Fruity" );
    });


    var noPreferenceArray = filterBourbon.filter(function(results){
        return(results.style === null || results.tasting_note === null);
    });

    // FUNCTION TO MAKE RESULTS RANDOM
    function randomBourbon(array) {
        var index = Math.floor(Math.random() * array.length);
        return array[index];
    }

    if(bourbon.choice === "spicy"){
        var spicyRandom = randomBourbon(spicyArray);
        // console.log(spicyRandom);
        var spicyName = $('<h3>').text(spicyRandom.name);
        var spicyStyle = $('<h4>').text(spicyRandom.style);
        var spicyNotes = $('<p>').text(spicyRandom.tasting_note); 
        var spicyImage = $('<img>').attr('src', spicyRandom.image_url);

        $('.bourbon-results').append(spicyName, spicyImage, spicyStyle,spicyNotes);
    };

    if(bourbon.choice === "sweet"){
        var sweetRandom = randomBourbon(sweetArray);
        // console.log(sweetRandom);
        var sweetName = $('<h3>').text(sweetRandom.name);
        var sweetStyle = $('<h4>').text(sweetRandom.style);
        var sweetNotes = $('<p>').text(sweetRandom.tasting_note); 
        var sweetImage = $('<img>').attr('src', sweetRandom.image_url);

        $('.bourbon-results').append(sweetName, sweetImage, sweetStyle,sweetNotes);
    };

    if(bourbon.choice === "smokey"){

        var smokeyRandom = randomBourbon(smokeyArray);

        if(smokeyRandom.tasting_note != null) {
            var smokeyName = $('<h3>').text(smokeyRandom.name);
            var smokeyStyle = $('<h4>').text(smokeyRandom.style);
            var smokeyNotes = $('<p>').text(smokeyRandom.tasting_note); 
            var smokeyImage = $('<img>').attr('src', smokeyRandom.image_url);

            $('.bourbon-results').append(smokeyName, smokeyImage, smokeyStyle,smokeyNotes);
        }else{
            return false;
        }
    };

    if(bourbon.choice === "no-pref"){

        var noPreferenceRandom = randomBourbon(noPreferenceArray);

        if(noPreferenceRandom.tasting_note != null) {
            console.log(noPreferenceRandom.tasting_note);

            var noPreferenceName = $('<h3>').text(noPreferenceRandom.name);
            var noPreferenceStyle = $('<h4>').text(noPreferenceRandom.style);
            var noPreferenceNotes = $('<p>').text(noPreferenceRandom.tasting_note);
            var noPreferenceImage = $('<img>').attr('src', noPreferenceRandom.image_url);

            $('.bourbon-results').append(noPreferenceName, noPreferenceImage, noPreferenceStyle,noPreferenceNotes);
        }
    };
};

bourbon.init = function() {

    $("#results").hide();

    $("#get-started").on("click", function(){
        $.smoothScroll({
            scrollTarget: ".question1"
        });
    });

    $("input[name='choose-note']").on("click", function(){
        $.smoothScroll({
            scrollTarget: ".question2"
        });
    });

    $("input[name='choose-music']").on("click", function(){

        $('#result-button').fadeIn();
    });

    $("#result-button").on("click", function(){
        $.smoothScroll({
            offset: -50,
            scrollTarget: "footer",
            speed: 1500
        });
    });

    $("form").on('submit', function(e){
        e.preventDefault();

        var userChoice = $("input[type=radio]:checked").val();
        $(".bourbon-results").empty();
        bourbon.choice = userChoice;
        beat.choice = userChoice;

        // console.log(app.bourbon);
        if (userChoice === "spicy"){
            bourbon.getData();
        }

        if (userChoice === "sweet"){
            bourbon.getData();
        }

        if (userChoice === "smokey"){
            bourbon.getData();
        }

        if (userChoice === "no-pref"){
            bourbon.getData();
        }

        $("#results").fadeIn();
    });

};



$(function(){
    bourbon.init();

    $("#restart").on("click", function(){
        $("body").scrollTop(0);
        location.reload();
    });
});




/////////////////

var beat = {};


beat.getData = function() {

    var spicyList =['4wvFYSwOhDNl1sbtiEU8J8', '2rf7bjT3f7dWeDFdoeLCdX', '6GJl4impgRmt2MY5CY5BbW', '4Hg3nMjHlIr0wtswiknM5z', '5f8A8TxP5gVwgxA1Mrt87n', '6OphQUjIBIZHXzugkjMjxz', '42s0JoL6ve0zxjbFVAxxti','4S6WZWWOjzMQW7fnW5k9eh', '2G9ntyxiHbD6yK9RxaB7Cy', '0YaeFHEYGpdzdFIxDRFvCv','1BgJCVNqPuzwbGD0e27dCx', '090X467JS4xj4diMdewTZs', '6FbPo7CMJIikS1y7EvaWzs', '0igXZxXbAV5a5EkVcQdlxb', '7oc83zmuY0ODfp8K478lHi', '7GcnWeopUkyCwFFEt6RrsA', '2Vr3ccUzeh8l5DiDvIh4UP', '4gpyOtOO0Ws6zhvcp4ASMY'];

    var sweetList =['21KIagsx1ZvYcv0sVkEAWv', '0kSkzG0sfuG4lRuFF5jWVr', '5Z55d6Bduppub0chxrcWQW', '1aS3ouxrqC2xAjR5LJku6M', '7iMybHeeEiPQSEI0TG3pdo', '2DQHgaOMVOs2OKLaksiMx9', '7GiLJfRPHARQrRJf01P2Tt', '5zTYki4rUrsOhT30gghHC6', '20OPxsW0aYB6InxDImJRdt' , '3heNYqE1CUM8WlJGm6UPEj', '5UXWs03dk4KTJioTAqQKWv', '4b6NstMmcJypSQzgj2P5zL', '2uRTsStAmo7Z2UwCIvuwMv', '3yoNZlqerJnsnMN5EDwwBS', '4SxFsOO0h4Nz3lFJuysKq5'];

    var smokeyList =['35Mx3PmgRKmfkVuseZEKft', '1DLuuk8EmrLYsHPIv6F09W', '1cEQBXubvMi6htzSm1GKzI', '0SVsGgGApRYVXP466ywwsC', '2f0KG8RWA1NamceKkZEJsR', '7gXh0cuAlgJhr9sr3bi3l9', '1RGG9MCrdqsaBqvvxiM2Hf', '0MHRNWUvq6JT8hjoL4ilvi', '0kEaFupzvrGdcczROS519i', '4gpyOtOO0Ws6zhvcp4ASMY', '3JscWpuM0XXbVvDMkUjlXw', '4NNjaoSpZ1OFQljHZY9Lx7', '2BlL4Gv2DLPu8p58Wcmlm9','1bnGRRSXinuQPmeeQM7AIv'];

    var noprefList =[spicyList , sweetList, smokeyList];

    noprefList = flatten(noprefList);


    if (beat.choice === "spicy"){
    var spotifyAjaxCall = spicyList.map(function(albumID){
        return $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumID,
            method: 'GET',
            dataType: 'json'
        });
    });
    }

    
    if (beat.choice === "sweet"){
    var spotifyAjaxCall = sweetList.map(function(albumID){
        return $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumID,
            method: 'GET',
            dataType: 'json'
        });
    });
    }

    if (beat.choice === "smokey"){

    var spotifyAjaxCall = smokeyList.map(function(albumID){
        return $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumID,
            method: 'GET',
            dataType: 'json'
        });
    });
    }


    if (beat.choice === "no-pref"){

    var spotifyAjaxCall = noprefList.map(function(albumID){
        return $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumID,
            method: 'GET',
            dataType: 'json'
        });
    });
    }


    // console.log(spotifyAjaxCall); 

    $.when.apply(null, spotifyAjaxCall)
        .then(function(){
            var albumArray = Array.prototype.slice.call(arguments);
            // console.log(albumArray);
            getSongTracks(albumArray)
        });

    function getSongTracks(albumArray){
        albumTracks = albumArray.map(function(albums){
            return albums[0].tracks.items;
        });

        albumTracks = flatten(albumTracks);

        var songID = albumTracks.map(function(tracks){
            return tracks.id;
        });

        songID = shuffle(songID)
        beat.displayData(songID);
    };

    // FUNCTION THAT SHUFFLES SONGS
    function shuffle(array) {
        for (var i = array.length-1; i >=0; i--) {
         
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            var itemAtIndex = array[randomIndex]; 
             
            array[randomIndex] = array[i]; 
            array[i] = itemAtIndex;
        }
        if (array.length >= 300){
            return array.slice(0, 300);
        }
        return array;
    }


    // FUNCTION THAT FLATTENS ARRAY
    function flatten(arrayToFlatten) {
        return arrayToFlatten.reduce(function (a,b){
            return a.concat(b);
        },[]);
    }
    beat.displayData();
};



beat.displayData = function(beatData) {


    if (beat.choice === "spicy"){
    var playlistEmbed = 'https://embed.spotify.com/?uri=spotify:trackset:Spicy Playlist:';
    $('iframe').attr('src', playlistEmbed + beatData);
    }

    if (beat.choice === "sweet"){
    var playlistEmbed = 'https://embed.spotify.com/?uri=spotify:trackset:Sweet Playlist:';
    $('iframe').attr('src', playlistEmbed + beatData);
    }

    if (beat.choice === "smokey"){
    var playlistEmbed = 'https://embed.spotify.com/?uri=spotify:trackset:Smokey Playlist:';
    $('iframe').attr('src', playlistEmbed + beatData);
    }

    if (beat.choice === "no-pref"){
    var playlistEmbed = 'https://embed.spotify.com/?uri=spotify:trackset:Wasted Playlist:';
    $('iframe').attr('src', playlistEmbed + beatData);
    }

};

beat.init = function() {
    $("iframe").hide();
    $(".iframe-text").hide();


    $("form").on('submit', function(e){
        e.preventDefault();

        var userChoice = $("input[type=radio]:checked").val();
        $(".bourbon-results").empty();
        beat.choice = userChoice;
        console.log(beat.choice);

        // console.log(app.bourbon);
        if (userChoice === "spicy"){
            beat.getData();
        }

        if (userChoice === "sweet"){
            beat.getData();
        }

        if (userChoice === "smokey"){
            beat.getData();
        }

        if (userChoice === "no-pref"){
            beat.getData();
        }

    });

        $("#play-button").on('click', function(){
            $(this).hide();
            $("iframe").fadeIn();
            $(".iframe-text").fadeIn();
        });
};

$(function(){
    beat.init();
});

