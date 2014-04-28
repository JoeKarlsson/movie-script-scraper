MSS
===

MSS "Movie Script Scrapper" - A simple scrapper to retrieve scripts by genre from IMSDB.

Usage
===

Enter a genre (defaults to Action) or a total (defaults to all scripts from resource):

        $ node app --total 10 --genre Comedy

Note: Be sure to install required modules with

        $ npm install

How it Works
===

Convienently IMSDB provides RSS feeds based on movie genre (ex. <http://www.imsdb.com/feeds/genre.php?genre=Comedy>). Using the awesome Request module we are then able to grab that page and use a regular expression to generate an array of movie script URLs. We then visit each URL with Request and use another awesome module called Cheerio to select just the movie script from each page and finaly output each script to a file.

LICENSE
===

The MIT License (MIT)

Copyright (c) 2014 Tim Kendall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
