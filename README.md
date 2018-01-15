# MSS

[![stars][stars]][stars-url]
[![pr][pr]][pr-url]
[![license][license]][license-url]
[![twitter][twitter]][twitter-url]

MSS "Movie Script Scrapper" - A simple scrapper to retrieve scripts by genre from IMSDB.

# Usage

Enter a genre (defaults to Action) or a total (defaults to all scripts from resource):

        $ node src/app --total 10 --genre Comedy

Note: Be sure to install required modules with

        $ npm install

# How it Works

Convienently IMSDB provides RSS feeds based on movie genre (ex. <http://www.imsdb.com/feeds/genre.php?genre=Comedy>). Using the awesome Request module we are then able to grab that page and use a regular expression to generate an array of movie script URLs. We then visit each URL with Request and use another awesome module called Cheerio to select just the movie script from each page and finaly output each script to a file.

## Contributing

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

[pr]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: CONTRIBUTING.md
[stars]: https://img.shields.io/github/stars/JoeKarlsson/mss.svg?style=flat-square
[stars-url]: https://github.com/JoeKarlsson/mss/stargazers
[license]: https://img.shields.io/github/license/JoeKarlsson/mss.svg
[license-url]: https://github.com/JoeKarlsson/mss/blob/develop/LICENSE
[twitter]: https://img.shields.io/twitter/url/https/github.com/JoeKarlsson/mss.svg?style=social&style=flat-square
[twitter-url]: https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FJoeKarlsson%2Fmss
