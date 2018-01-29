<p align="center">
	<img width=100% src="https://user-images.githubusercontent.com/4650739/35399428-ccd8dc4c-01b9-11e8-9722-25c51f4c630e.png" />

</p>

<h1 align="center">Movie Script Scraper</h1>

[![deps][deps]][deps-url]
[![Coverage Status](https://coveralls.io/repos/github/JoeKarlsson/movie-script-scraper/badge.svg?branch=master)](https://coveralls.io/github/JoeKarlsson/movie-script-scraper?branch=master)
[![Build Status](https://travis-ci.org/JoeKarlsson/movie-script-scraper.svg?branch=master)](https://travis-ci.org/JoeKarlsson/movie-script-scraper)
[![snyk][snyk]][snyk-url]
[![bch compliance][bchcompliance]][bchcompliance-url]
[![Maintainability](https://api.codeclimate.com/v1/badges/516ac255b87a71d5fd91/maintainability)](https://codeclimate.com/github/JoeKarlsson/movie-script-scraper/maintainability)
[![bitHound Overall Score](https://www.bithound.io/github/JoeKarlsson/movie-script-scraper/badges/score.svg)](https://www.bithound.io/github/JoeKarlsson/movie-script-scraper)
[![bitHound Dev Dependencies](https://www.bithound.io/github/JoeKarlsson/movie-script-scraper/badges/devDependencies.svg)](https://www.bithound.io/github/JoeKarlsson/movie-script-scraper/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/JoeKarlsson/movie-script-scraper/badges/code.svg)](https://www.bithound.io/github/JoeKarlsson/movie-script-scraper)
[![Package Quality](http://npm.packagequality.com/shield/movie-script-scraper.svg)](http://packagequality.com/#?package=movie-script-scraper)
[![npm version](https://badge.fury.io/js/movie-script-scraper.svg)](https://badge.fury.io/js/movie-script-scraper)
[![stars][stars]][stars-url]
[![pr][pr]][pr-url]
[![license][license]][license-url]
[![twitter][twitter]][twitter-url]

[![NPM](https://nodei.co/npm/movie-script-scraper.png)](https://npmjs.org/package/movie-script-scraper)

A simple scraper to retrieve movie scripts by genre or title from [IMSDB](http://www.imsdb.com/).

# Installation

```bash
npm install -S movie-script-scraper
```

# Usage

## Example Usage

**Movie Script Scraper** exposes a function; simply pass this function the options ([see below](https://github.com/JoeKarlsson/movie-script-scraper#options)), and it will return a promise with an array of the file paths of the scripts it saved.

```javascript
const mss = require('movie-script-scraper');

const options = {
	genre: 'Action',
	total: 10,
};

mss(options)
	.then(filePaths => {
		console.log(filePaths);
	})
	.catch(err => {
		console.error('There was a problem');
	});
```

### Options

* `genre` [__string__] - Any valid film genre, a complete list can be found [here](https://github.com/JoeKarlsson/movie-script-scraper/blob/master/src/helper/isValidGenre.js).
  * Defaults to "Action".
* `total` [__number__] - the total number of scripts you want from a given genre.
  * Defaults to 10.
* `title` [__string__] - The name of the film's script you want.
* `dest` [__string__] - Location that you want to save your scripts.
  * Defaults to ./scripts in the root directory.

## Running from command line

You can run the Movie Script Scraper directly from the CLI (if it's globally available in your PATH, e.g. by `npm install -g movie-script-scraper`) with variety of useful [options](https://github.com/JoeKarlsson/movie-script-scraper#options).

```bash
movie-script-scraper  --total 10 --genre Comedy
```

or enter a title:

```bash
movie-script-scraper  --title 'american sniper'
```

# How it Works

Conveniently IMSDB provides RSS feeds based on movie genre (ex. <http://www.imsdb.com/feeds/genre.php?genre=Comedy>). Using the awesome fetch module we are then able to grab that page and use a regular expression to generate an array of movie script URLs. We then visit each URL with Fetch and use another awesome module called Cheerio to select just the movie script from each page and finally output each script to a file.

## Running Locally

1. Install dependencies with:

```bash
npm install
```

2. Run Tests

```bash
npm test
```

## Contributing

Don't hesitate to create a pull request. Every contribution is appreciated. In development you can start the tests by calling `npm test`. Checkout our [contribution README](https://github.com/JoeKarlsson/movie-script-scraper/blob/master/CONTRIBUTING.md) for more info.

TLDR;

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :D

### Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/JoeKarlsson?v=3">
        <br />
        <a href="https://github.com/JoeKarlsson">Joe Karlsson</a>
      </td>
    <tr>
  <tbody>
</table>

### License

#### [MIT](./LICENSE)

[deps]: https://david-dm.org/JoeKarlsson/movie-script-scraper/status.svg
[deps-url]: https://david-dm.org/JoeKarlsson/movie-script-scraper
[pr]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: CONTRIBUTING.md
[stars]: https://img.shields.io/github/stars/JoeKarlsson/movie-script-scraper.svg?style=flat-square
[stars-url]: https://github.com/JoeKarlsson/movie-script-scraper/stargazers
[license]: https://img.shields.io/github/license/JoeKarlsson/movie-script-scraper.svg
[license-url]: https://github.com/JoeKarlsson/movie-script-scraper/blob/master/LICENSE
[twitter]: https://img.shields.io/twitter/url/https/github.com/JoeKarlsson/movie-script-scraper.svg?style=social&style=flat-square
[twitter-url]: https://twitter.com/intent/tweet?text=Movie%20Site%20Scrapper:&url=https%3A%2F%2Fgithub.com%2FJoeKarlsson%2Fmovie-script-scraper
[snyk]: https://snyk.io/test/github/joekarlsson/movie-script-scraper/badge.svg
[snyk-url]: https://snyk.io/test/github/joekarlsson/movie-script-scraper
[bchcompliance]: https://bettercodehub.com/edge/badge/JoeKarlsson/movie-script-scraper?branch=master
[bchcompliance-url]: https://bettercodehub.com/
