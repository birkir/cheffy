[![Build Status](https://travis-ci.org/birkir/cheffy.svg?branch=master)](https://travis-ci.org/birkir/cheffy)

# Cheffy web app
A recipe cookbook with direct ingredient relations to be able to build nutrient profile for recipe. Live link coming soon.

Built using
- React
- Redux
- Babel
- Firebase
- Gulp
- SASS
- Webpack

## Installing Dependencies
```bash
$ npm install
```

## Developing
```bash
$ gulp
or
$ ./node_modules/.bin/gulp
```

Executing the default `gulp` command will:
- Build the project
- Start the Webpack dev server at <a href="http://localhost:3000" target="_blank">localhost:3000</a>
- Watch for changes to the source files and process changes
- Live-reload the browser


## Testing
```bash
$ gulp test.watch
```
Executing `gulp test.watch` will:
- Run the test suites
- Watch for changes to the source files
- Re-run the tests whenever the sources are modified

For a single test run without auto-watch, execute `gulp test` instead.


## Release Builds
```bash
$ gulp dist
```
- Generate bundled and minified artifacts and deposit into `/target` directory
- Inject style and script tags into index.html
