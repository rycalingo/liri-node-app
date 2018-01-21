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