<p align="center">
 <img width=100% src="https://user-images.githubusercontent.com/4650739/35399428-ccd8dc4c-01b9-11e8-9722-25c51f4c630e.png" />

</p>

<h1 align="center">Movie Script Scraper</h1>

[![Coverage Status][coverage-status]][coverage-status-url]
[![Build Status][build-status]][build-status-url]
[![snyk][snyk]][snyk-url]
[![Maintainability][maintainability]][maintainability-url]
[![Package Quality][package-quality]][package-quality-url]
[![npm version][npm-version]][npm-version-url]
[![stars][stars]][stars-url]
[![pr][pr]][pr-url]
[![license][license]][license-url]
[![Node.js Version][node-version]][node-version-url]
[![Jest Coverage][jest-coverage]][jest-coverage-url]
[![ESLint][eslint]][eslint-url]
[![Prettier][prettier]][prettier-url]
[![Dependencies][dependencies]][dependencies-url]

[![Last Commit][last-commit]][last-commit-url]
[![GitHub Issues][github-issues]][github-issues-url]
[![Contributors][contributors]][contributors-url]

[![NPM](https://nodei.co/npm/movie-script-scraper.png)](https://npmjs.org/package/movie-script-scraper)

A simple scraper to retrieve movie scripts by genre or title from [IMSDB](http://www.imsdb.com/).

## Features

- 🎬 **Genre-based scraping** - Download multiple scripts from any movie genre
- 🔍 **Title-based search** - Find and download specific movie scripts
- 📁 **Organized output** - Scripts saved in structured directories
- 🧪 **Comprehensive testing** - Unit, integration, and e2e test coverage
- 🔧 **Developer-friendly** - Modern tooling with ESLint, Prettier, and Jest
- 📊 **Quality assurance** - 80%+ test coverage with automated quality checks
- 🚀 **CLI support** - Run directly from command line or as a Node.js module

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

- `genre` [**string**] - Any valid film genre, a complete list can be found [in the isValidGenre helper](https://github.com/JoeKarlsson/movie-script-scraper/blob/master/src/helper/isValidGenre.js).
  - Defaults to "Action".
- `total` [**number**] - the total number of scripts you want from a given genre.
  - Defaults to 10.
- `title` [**string**] - The name of the film's script you want.
- `dest` [**string**] - Location that you want to save your scripts.
  - Defaults to ./scripts in the root directory.

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

The Movie Script Scraper works by leveraging IMSDB's RSS feeds and web scraping capabilities:

## Technical Process

1. **RSS Feed Parsing**: IMSDB provides RSS feeds based on movie genre (e.g., <http://www.imsdb.com/feeds/genre.php?genre=Comedy>)
2. **URL Extraction**: Using `node-fetch` to retrieve the RSS feed and regex patterns to extract movie script URLs
3. **Script Scraping**: Each script URL is visited using `node-fetch` and parsed with `cheerio` to extract the actual script content
4. **File Management**: Scripts are saved to organized directories with proper file naming conventions

## Architecture

The scraper supports two main modes:

### Genre-Based Scraping

- Fetches multiple scripts from a specified genre
- Uses RSS feeds to discover available scripts
- Implements random selection and duplicate prevention
- Supports configurable download limits

### Title-Based Scraping  

- Searches for a specific movie script by title
- Direct URL construction and validation
- Single script download with error handling

## Dependencies

- **cheerio**: Server-side jQuery implementation for HTML parsing
- **node-fetch**: Lightweight HTTP client for web requests
- **lodash**: Utility library for data manipulation
- **minimist**: Command-line argument parsing
- **mkdirp**: Directory creation utility

## Running Locally

1. Install dependencies with:

   ```bash
   npm install
   ```

2. Run Tests

   ```bash
   npm test
   ```

### Available Scripts

The project includes several npm scripts for development and testing:

#### Testing Scripts

- `npm test` - Run all tests with coverage
- `npm run test:unit` - Run only unit tests
- `npm run test:integration` - Run only integration tests  
- `npm run test:e2e` - Run only end-to-end tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with detailed coverage report

#### Development Scripts

- `npm start` - Run the application with default settings
- `npm run start:title` - Run with a specific title (e.g., 'frozen')
- `npm run dev` - Start development mode with test watching

#### Code Quality Scripts

- `npm run lint` - Run ESLint on source code
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

#### Maintenance Scripts

- `npm run healthcheck` - Run linting and full test suite
- `npm run clean` - Clean coverage and cache directories
- `npm run audit:fix` - Fix security vulnerabilities
- `npm run update:deps` - Update dependencies

## Testing

This project uses Jest for testing with comprehensive coverage across different test types:

### Test Structure

- **Unit Tests** (`tests/unit/`) - Test individual functions and modules in isolation
- **Integration Tests** (`tests/integration/`) - Test component interactions and API calls
- **End-to-End Tests** (`tests/e2e/`) - Test complete application workflows

### Coverage Requirements

The project maintains high code quality with coverage thresholds:

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Running Tests

```bash
# Run all tests with coverage
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run tests in watch mode for development
npm run test:watch

# Generate detailed coverage report
npm run test:coverage
```

### Test Configuration

Tests are configured in `config/jest.config.js` with:

- Babel transformation for modern JavaScript
- Module path mapping for cleaner imports
- Global test utilities and mocks
- Extended timeouts for integration tests

## Development Workflow

### Prerequisites

- **Node.js**: Version 16.0.0 or higher
- **npm**: Latest version recommended

### Code Quality Tools

- **ESLint**: Code linting with Airbnb base configuration
- **Prettier**: Code formatting for consistent style
- **Husky**: Git hooks for pre-commit and pre-push validation

### Development Process

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Create feature branch**: `git checkout -b feature-name`
4. **Make changes** following the coding standards
5. **Run tests**: `npm run healthcheck`
6. **Commit changes**: Git hooks will run linting and tests
7. **Push and create PR**: Submit pull request for review

### Project Structure

```text
src/
├── app.js                 # Main application entry point
├── mss.js                 # Core scraper logic
├── genre/                 # Genre-based scraping
├── title/                 # Title-based scraping
├── getScript/             # Script retrieval logic
└── helper/                # Utility functions

tests/
├── unit/                  # Unit tests
├── integration/           # Integration tests
├── e2e/                   # End-to-end tests
└── fixtures/              # Test data and mocks

config/
└── jest.config.js         # Jest configuration
```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information about our development process.

### Quick Start for Contributors

1. **Fork the repository** and clone your fork
2. **Install dependencies**: `npm install`
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** following our coding standards
5. **Run the health check**: `npm run healthcheck`
6. **Commit your changes**: `git commit -m "Add your feature"`
7. **Push to your fork**: `git push origin feature/your-feature-name`
8. **Create a Pull Request** with a clear description

### Code Standards

- Follow ESLint configuration (Airbnb base)
- Use Prettier for code formatting
- Write tests for new features
- Maintain test coverage above 80%
- Update documentation as needed

### Development Setup

```bash
# Clone and setup
git clone https://github.com/your-username/movie-script-scraper.git
cd movie-script-scraper
npm install

# Run development mode
npm run dev
```

## Troubleshooting

### Common Issues

#### Installation Problems

- **Node.js version**: Ensure you're using Node.js 16.0.0 or higher
- **Permission errors**: Try using `sudo` for global installations or use `nvm` to manage Node versions

#### Test Failures

- **Network timeouts**: Integration tests may fail due to network issues. Try running `npm run test:unit` first
- **Coverage issues**: Ensure all new code is properly tested to meet the 80% coverage threshold

#### Script Download Issues

- **Invalid genre**: Check the [valid genres list](src/helper/isValidGenre.js) for supported genres
- **Network errors**: The scraper depends on IMSDB availability. Check if the site is accessible
- **File permission errors**: Ensure the destination directory is writable

#### Development Issues

- **Linting errors**: Run `npm run lint:fix` to auto-fix common issues
- **Formatting issues**: Run `npm run format` to format your code
- **Test watching not working**: Try `npm run clean` and restart the watch mode

### Getting Help

- Check existing [issues](https://github.com/JoeKarlsson/movie-script-scraper/issues)
- Create a new issue with detailed information about your problem
- Include error messages, Node.js version, and steps to reproduce

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
[stars]: https://img.shields.io/github/stars/JoeKarlsson/movie-script-scraper.svg?style=flat-square
[stars-url]: https://github.com/JoeKarlsson/movie-script-scraper/stargazers
[license]: https://img.shields.io/github/license/JoeKarlsson/movie-script-scraper.svg
[license-url]: https://github.com/JoeKarlsson/movie-script-scraper/blob/master/LICENSE
[snyk]: https://snyk.io/test/github/joekarlsson/movie-script-scraper/badge.svg
[snyk-url]: https://snyk.io/test/github/joekarlsson/movie-script-scraper
[coverage-status]: https://coveralls.io/repos/github/JoeKarlsson/movie-script-scraper/badge.svg?branch=master
[coverage-status-url]: https://coveralls.io/github/JoeKarlsson/movie-script-scraper?branch=master
[build-status]: https://travis-ci.org/JoeKarlsson/movie-script-scraper.svg?branch=master
[build-status-url]: https://travis-ci.org/JoeKarlsson/movie-script-scraper
[maintainability]: https://api.codeclimate.com/v1/badges/516ac255b87a71d5fd91/maintainability
[maintainability-url]: https://codeclimate.com/github/JoeKarlsson/movie-script-scraper/maintainability
[package-quality]: http://npm.packagequality.com/shield/movie-script-scraper.svg
[package-quality-url]: http://packagequality.com/#?package=movie-script-scraper
[npm-version]: https://badge.fury.io/js/movie-script-scraper.svg
[npm-version-url]: https://badge.fury.io/js/movie-script-scraper
[node-version]: https://img.shields.io/node/v/movie-script-scraper.svg
[node-version-url]: https://nodejs.org/
[jest-coverage]: https://img.shields.io/badge/coverage-80%25-brightgreen.svg
[jest-coverage-url]: https://github.com/JoeKarlsson/movie-script-scraper
[eslint]: https://img.shields.io/badge/ESLint-Airbnb-4B32C3.svg
[eslint-url]: https://eslint.org/
[prettier]: https://img.shields.io/badge/Code%20Style-Prettier-ff69b4.svg
[prettier-url]: https://prettier.io/
[dependencies]: https://img.shields.io/david/JoeKarlsson/movie-script-scraper.svg
[dependencies-url]: https://david-dm.org/JoeKarlsson/movie-script-scraper
[dev-dependencies]: https://img.shields.io/david/dev/JoeKarlsson/movie-script-scraper.svg
[dev-dependencies-url]: https://david-dm.org/JoeKarlsson/movie-script-scraper?type=dev
[last-commit]: https://img.shields.io/github/last-commit/JoeKarlsson/movie-script-scraper.svg
[last-commit-url]: https://github.com/JoeKarlsson/movie-script-scraper/commits
[github-issues]: https://img.shields.io/github/issues/JoeKarlsson/movie-script-scraper.svg
[github-issues-url]: https://github.com/JoeKarlsson/movie-script-scraper/issues
[contributors]: https://img.shields.io/github/contributors/JoeKarlsson/movie-script-scraper.svg
[contributors-url]: https://github.com/JoeKarlsson/movie-script-scraper/graphs/contributors
