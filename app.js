/**
 * Module dependencies.
 */
var _ = require('lodash'),
  S = require('string'),
  fs = require('fs'),
  request = require('request'),
  cheerio = require('cheerio');

// Get list of script URLs
request('http://www.imsdb.com/feeds/genre.php?genre=Comedy', {rejectUnauthorized: false}, function (error, response, html) {
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

  cleaned.forEach(function (url, index, array) {
    console.log(url);
    // Call for every script URL
    saveScript(url);
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
    fs.writeFile('scripts/Comedy/' + title + '.txt', script, function (err) {
      if (err) console.log(err);
      else console.log('Saved ' + title);
    });
  });
}

