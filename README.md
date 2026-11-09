# Movie Script Scraper

[![CI](https://github.com/JoeKarlsson/movie-script-scraper/actions/workflows/ci.yml/badge.svg)](https://github.com/JoeKarlsson/movie-script-scraper/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/movie-script-scraper.svg)](https://www.npmjs.com/package/movie-script-scraper)
[![License: MIT](https://img.shields.io/github/license/JoeKarlsson/movie-script-scraper.svg)](LICENSE)

Movie Script Scraper downloads movie scripts by genre from IMSDB and saves each
one as a plain text file you can search and count. Bechdel.io needed a lot of
scripts to check against the Bechdel Test, and this is where they came from. Tim
Kendall started it in 2014, and I rewrote it and put it on npm in 2018.

[Read the full statement](https://www.joekarlsson.com/work/movie-script-scraper/)

## Quick start

Node.js 16 or newer.

```bash
npm install -g movie-script-scraper
movie-script-scraper --genre Comedy --total 10           # saves to ./scripts
movie-script-scraper --all --total 20 --dest ./all-scripts
```

Or use it as a library. It returns a promise of the saved file paths:

```javascript
const mss = require('movie-script-scraper');

mss({ genre: 'Action', total: 10 }).then((filePaths) => console.log(filePaths));
```

Options (the same names work as CLI flags):

- `genre`: Action, Adventure, Animation, Comedy, Crime, Drama, Family, Fantasy,
  Film-Noir, Horror, Musical, Mystery, Romance, Sci-Fi, Short, Thriller, War or
  Western. Defaults to Action.
- `all`: pull from IMSDB's full script list instead of a genre. Defaults to false.
- `total`: how many scripts. Defaults to 10, or 50 with `all`.
- `dest`: where to save them. Defaults to `./scripts`.

It downloads five scripts at a time and retries failures with backoff.
Title-based scraping (`--title`) is disabled because IMSDB's URLs for titles
aren't reliable.

## Development

```bash
git clone https://github.com/JoeKarlsson/movie-script-scraper.git
cd movie-script-scraper
npm install
npm test               # Jest with coverage (unit, integration and e2e)
npm run test:unit      # just the unit tests; integration tests can fail on network issues
npm run healthcheck    # lint plus tests with coverage
npm run format         # Prettier
```

The scraper is `src/mss.js`, the CLI is `src/app.js`, and the genre, all-scripts
and script-fetching code is in `src/genre/`, `src/all/` and `src/getScript/`.
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

Tim Kendall started it in 2014. I rewrote it and put it on npm in 2018.

## License

MIT. See [LICENSE](LICENSE).
