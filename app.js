/**
 * Module dependencies.
 */
var _ = require('lodash'),
  S = require('string'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  request = require('request'),
  cheerio = require('cheerio');

// Process command line arguments
var argv = require('minimist')(process.argv.slice(2));

// List of valid genres
var genres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Short',
  'Thriller',
  'War',
  'Western'
  ];

// Set default genre
var genre = 'Action';
// Check if it's a valid genre
if (!argv.genre) console.log('Getting scripts for movies of ' + genre);
else if (!_.contains(genres, argv.genre)) return console.log('Sorry, invalid genre.');
else {
  genre = argv.genre;
  console.log('Getting scripts for movies of ' + genre);
}

// Get list of script URLs
request('http://www.imsdb.com/feeds/genre.php?genre=' + genre, {rejectUnauthorized: false}, function (error, response, html) {
  if (error || response.statusCode !== 200) {
    console.log(error);
    return;
  }

  // RegEx URLs
  var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/ig;
  var urls = html.match(pattern) || [];

  // Validate
  if(urls.length === 0) return null;
  // Remove invalid script URLs
  var cleaned = _.remove(urls, function (url) { return S(url).contains('.html'); });

  // Create directory if doesn't exist
  checkDirectory(function () {
    // Loop through script URLs
    cleaned.forEach(function (url, index, array) {
      console.log(url);
      // Call for every script URL
      saveScript(url);
    });
  });

});

function saveScript (scriptURL) {
  // Request the script page
  request(scriptURL, {rejectUnauthorized: false}, function (error, response, html) {
    // Handle error
    if (error || response.statusCode !== 200) {
      console.log(error);
      return;
    }

    // Extract page contents
    var $ = cheerio.load(html);
    var script = $('table:nth-child(2)').text();
    // Remove whitespace and extra text
    //script = S(script).collapseWhitespace();
    script = script.replace('Search IMSDb','');
    // Get a clean title
    var title = S($('title').text()).chompRight(' Script at IMSDb.').slugify().s;

    // Return if no script (probably TV episode, slightly different URL)
    if (script.length < 1) return;

    // Write to file
    fs.writeFile('scripts/' + genre + '/' + title + '.txt', script, function (err) {
      if (err) console.log(err);
      else console.log('Saved ' + title);
    });
  });
}

function checkDirectory (callback) {
  // Create directory if it doesn't exist
  fs.exists('scripts/' + genre + '/', function (exists) {
    if (!exists) {

      mkdirp('scripts/' + genre + '/', function (err) {
        if (err) return console.log('Failed to make directory for ' + genre);
        // Execute callback
        callback();
      });
    }
    // Execute callback
    callback();
  });
};

