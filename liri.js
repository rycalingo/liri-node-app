//  liri.js
require('dotenv').config();

var fs = require('fs');
var request = require('request');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userEntry = process.argv[2];

var chooseCommand = function(command) {

	switch (command) {
		case "my-tweets":
			// my-tweets
			console.log("my-tweets");
			break;
		case "spotify-this-song":
			// spotify-this-song
			console.log("spotify-this-song");
			break;

		case "movie-this":
			// movie-this
			console.log("movie-this");
			break;

		default:
			// do-what-it-says
			console.log("do-what-it-says");
	}
};

chooseCommand(userEntry);


