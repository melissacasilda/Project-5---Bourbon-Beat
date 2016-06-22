
// need to pull albums from each artist and then
// map through the albums to pull out the tracks


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

        console.log(songID);
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