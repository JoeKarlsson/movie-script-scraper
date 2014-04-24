MSS
===

MSS "Movie Script Scrapper" - A simple scrapper to retrieve scripts by genre from IMSDB.

Usage
===

1. Choose a genre Ex.

        request('http://www.imsdb.com/feeds/genre.php?genre=Comedy',...
2. Update output files path

        fs.writeFile('scripts/comedy/' + title + '.txt', script, function (err) {...
3. Run

        $ node app

Note: Be sure to install required modules with

        $ npm install

How it Works
===

Convienently IMSDB provides RSS feeds based on movie genre (ex. <http://www.imsdb.com/feeds/genre.php?genre=Comedy>). Using the awesome Request module we are then able to grab that page and use a regular expression to generate an array of movie script URLs. We then visit each URL with Request and use another awesome module called Cheerio to select just the movie script from each page and finaly output each script to a file.