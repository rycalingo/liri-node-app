//  liri.js
require('dotenv').config();

var fs = require('fs');
var request = require('request');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var userEntry = process.argv[2];
var userArg = process.argv[3];

// Log Entered Command
var logEntry = function(val, arg = 'none') {
  var d = new Date();
  var date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  var dateTime = date + '_' + time + '_';
  // console.log(dateTime);
  fs.appendFile('log.txt', dateTime + val + ' ' + JSON.stringify(arg) +'\r', function(err) {

    if (err) return console.log(val);
  });
};

// Twitter API Call
var getMyTweets = function() {
  var client = new Twitter(keys.twitter);
  var params = { screen_name: 'G_Ry07', count: 15 };

  client.get('statuses/user_timeline/', params, function(err, data, res) {
	// console.log(res);
	if (!err) {

	  for(var i = 0; i < data.length; i++) {
	    var twitterItem =
		  '#' + i + ' ======================\n' +
		  '@' + data[i].user.screen_name + ': ' + 
		  data[i].text + '\n' + 
		  data[i].created_at + '\n';
		  
		  console.log(twitterItem);
		}
	}else {

	  console.log('Error :'+ err);
	  return;
	}
  });

};
// Spotify API Call
var getMySpotify = function(songName) {
  //If it doesn't find a song, find Ace of Base "The Sign"

  var spotify = new Spotify(keys.spotify);
  if (songName === undefined) {
    songName = 'The Sign';
  };

  spotify.search({ type: 'track', limit: '5', query: songName }, function(err, data) {
    if (err) { return console.log('Error: ' + err) };

    var songs = data.tracks.items;
    var songInfo = [];

    for (var i = 0; i < songs.length; i++) {
// console.log(songs);
// push music info into an array
      songInfo.push({
        'Artist(s)': songs[i].artists.map(artist => { return artist.name }),
        'Song': songs[i].name,
        'Preview Song': songs[i].preview_url,
        'Album': songs[i].album.name,
      });
    }
// console.log songInfo    
    songInfo.forEach( (item) => {
    	for (let key in item) {
    		console.log(JSON.stringify(key) + ': ' + JSON.stringify(item[key]));
    	}
    })
  });
};

// Movie API Call
var getMyMovie = function(movieName) {

  if (movieName === undefined) { movieName = 'Mr Nobody'; };

  var urlQuery = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json&apikey=trilogy";
  request(urlQuery, function(err, res, data) {
    if (!err && res.statusCode == 200) {
      
      var movieInfo = [];
      var movieData = JSON.parse(data);

// push movie info into an array
      movieInfo.push({
	    'Title' : movieData.Title,
	    'Year' : movieData.Year,
	    'IMDB Rating' : movieData.imdbRating,
	    'Rotten Tomatoes Rating' : movieData.tomatoRating,
	    'Country' : movieData.Country,
	    'Language' : movieData.Language,
	    'Plot' : movieData.Plot,
	    'Actors' : movieData.Actors,
	  });
// console.log movieInfo
	  movieInfo.forEach( (item) => {
	    for (let key in item) {
	      console.log(JSON.stringify(key) + ': ' + JSON.stringify(item[key]));
	    }
	  });
	}
  });

};

var chooseCommand = function(command, arg) {
	logEntry(command, arg);

	switch (command) {
		case 'my-tweets':
			// node liri.js my-tweets
			console.log('my-tweets');
			getMyTweets();
			break;
		case 'spotify-this-song':
			// node liri.js spotify-this-song
			console.log('spotify-this-song');
			getMySpotify(arg);
			break;

		case 'movie-this':
			// node liri.js movie-this
			console.log('movie-this');
			getMyMovie(arg);
			break;

		default:
			// node liri.js do-what-it-says
			console.log('do-what-it-says');
	}
};

chooseCommand(userEntry, userArg);
