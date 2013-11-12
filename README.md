# buses-and-bikes

[![Build Status](https://travis-ci.org/Xylem/buses-and-bikes.png?branch=master)](https://travis-ci.org/Xylem/buses-and-bikes)

A project for Digital Modelling and Simulations.

## Running the application

### Installation

To install dependencies required only to run the application, do

```
npm install --production
```
### Starting the app

Running the application requires doing simply

```
node index
```
**For now, starting in verbose mode is recommended, as there is no other way to observe the output.**

#### Supported command line arguments

| Parameter           | Description                    |
|---------------------|--------------------------------|
| `-v` or `--verbose` | Prints all logs to the console |
| `-h` or `--help`    | Prints help                    |

## Development

For development, you'll most likely have to install the devDependencies first.

```
npm install
```

Make sure you have `grunt-cli` installed. If not, install it by:

```
npm install -g grunt-cli
```

#### Running tests

To run the tests, you can do either

```
npm test
```

or

```
grunt test
```

Additionally, you can specify `mocha` reporter by

```
grunt test:<reporter>
```

eg.

```
grunt test:nyan
```

For `xunit-file` reporter, you can (in fact, have to) specify output file

```
grunt test:xunit-file:test.xml
```

#### Documentation generation

Generating the documentation requires running:

```
grunt jsdoc
```