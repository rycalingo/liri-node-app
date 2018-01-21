//  liri.js
require('dotenv').config();

var fs = require('fs');
var request = require('request');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

var userEntry = process.argv[2];

// Log Entered Command
var logEntry = function(val) {
  var d = new Date();
  var date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  var dateTime = date + '_' + time + '_';
  console.log(dateTime);
  fs.appendFile('log.txt', dateTime + val + '\r', function(err) {

    if (err) return console.log(val);
  });
};


var chooseCommand = function(command) {
	logEntry(command);

	switch (command) {
		case 'my-tweets':
			// my-tweets
			console.log('my-tweets');
			// getMyTweets();
			break;
		case 'spotify-this-song':
			// spotify-this-song
			console.log('spotify-this-song');
			break;

		case 'movie-this':
			// movie-this
			console.log('movie-this');
			break;

		default:
			// do-what-it-says
			console.log('do-what-it-says');
	}
};

chooseCommand(userEntry);
