# Project Structure

This document describes the organization and structure of the Movie Script Scraper project.

## Directory Structure

```
movie-script-scraper/
├── config/                     # Configuration files
│   ├── .babelrc               # Babel configuration
│   ├── .eslintrc.js           # ESLint configuration
│   ├── .prettierrc            # Prettier configuration
│   └── jest.config.js         # Jest test configuration
├── docs/                      # Documentation
│   └── PROJECT_STRUCTURE.md   # This file
├── scripts/                   # Build and utility scripts
├── src/                       # Source code
│   ├── app.js                 # Main application entry point
│   ├── mss.js                 # Core scraper logic
│   ├── genre/                 # Genre-based scraping
│   │   ├── getScriptsByGenre.js
│   │   └── helper/            # Genre-specific utilities
│   │       ├── addScriptsToDir.js
│   │       ├── fileSystem.js
│   │       ├── handleURLs.js
│   │       └── shouldRandomlySave.js
│   ├── title/                 # Title-based scraping
│   │   ├── getScriptByTitle.js
│   │   └── helper/            # Title-specific utilities
│   │       └── createURL.js
│   ├── getScript/             # Individual script processing
│   │   ├── getScript.js
│   │   └── helper/            # Script processing utilities
│   │       ├── extractPageContents.js
│   │       ├── isInvalidScript.js
│   │       └── writeToFile.js
│   └── helper/                # Shared utilities
│       ├── api.js
│       ├── cleanArr.js
│       ├── handleError.js
│       ├── isValidGenre.js
│       ├── parseArgs.js
│       └── randomIntFromInterval.js
├── tests/                     # Test files
│   ├── unit/                  # Unit tests
│   │   ├── *.spec.js          # Individual module tests
│   │   ├── errorHandling.test.js
│   │   └── performance.test.js
│   ├── integration/           # Integration tests
│   │   └── scraper.integration.test.js
│   ├── e2e/                   # End-to-end tests
│   │   └── application.e2e.test.js
│   ├── fixtures/              # Test data and mocks
│   │   └── __mocks__/         # Jest mocks
│   └── setup.js               # Test setup configuration
├── .eslintignore              # ESLint ignore patterns
├── .gitignore                 # Git ignore patterns
├── .npmignore                 # NPM ignore patterns
├── .prettierignore            # Prettier ignore patterns
├── .travis.yml                # CI/CD configuration
├── CODE_OF_CONDUCT.md         # Code of conduct
├── CONTRIBUTING.md            # Contribution guidelines
├── LICENSE                    # License file
├── PULL_REQUEST_TEMPLATE.md   # PR template
├── README.md                  # Project documentation
├── package.json               # NPM package configuration
└── package-lock.json          # NPM lock file
```

## Architecture Overview

### Core Modules

1. **`app.js`** - Main entry point that handles command-line arguments and orchestrates the scraping process
2. **`mss.js`** - Core scraper logic that routes between genre and title-based scraping
3. **`genre/`** - Handles scraping multiple scripts from a specific genre
4. **`title/`** - Handles scraping a specific movie script by title
5. **`getScript/`** - Processes individual script pages and extracts content
6. **`helper/`** - Shared utilities used across the application

### Test Structure

- **Unit Tests** (`tests/unit/`): Test individual functions and modules in isolation
- **Integration Tests** (`tests/integration/`): Test interactions between modules
- **End-to-End Tests** (`tests/e2e/`): Test the complete application workflow
- **Fixtures** (`tests/fixtures/`): Test data, mocks, and sample files

### Configuration

All configuration files are centralized in the `config/` directory for better organization and maintainability.

## Design Principles

1. **Separation of Concerns**: Each module has a single responsibility
2. **Modularity**: Code is organized into logical, reusable modules
3. **Testability**: Comprehensive test coverage at all levels
4. **Maintainability**: Clear structure and documentation
5. **Scalability**: Architecture supports future enhancements

## File Naming Conventions

- **Source files**: `camelCase.js`
- **Test files**: `moduleName.spec.js` (unit), `featureName.test.js` (integration), `featureName.e2e.js` (e2e)
- **Configuration files**: `.configName` or `configName.config.js`
- **Documentation files**: `UPPERCASE.md`

## Module Dependencies

```
app.js
├── mss.js
│   ├── genre/getScriptsByGenre.js
│   │   ├── helper/api.js
│   │   ├── helper/isValidGenre.js
│   │   ├── helper/handleURLs.js
│   │   ├── helper/addScriptsToDir.js
│   │   └── helper/fileSystem.js
│   ├── title/getScriptByTitle.js
│   │   └── helper/createURL.js
│   └── helper/cleanArr.js
├── helper/parseArgs.js
└── helper/handleError.js
```

## Best Practices

1. **Error Handling**: All modules include proper error handling
2. **Input Validation**: All inputs are validated before processing
3. **Resource Management**: Proper cleanup of resources and handles
4. **Performance**: Optimized for speed and memory usage
5. **Security**: Safe handling of user inputs and external data
6. **Documentation**: Comprehensive inline documentation and comments
