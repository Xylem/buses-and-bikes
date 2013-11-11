# buses-and-bikes

A project for Digital Modelling and Simulations.

## Installation

Currently, there's nothing to install to use the project. Just run

```
node index
```

## Development

For development, you'll most likely have to install the devDependencies first.

```
npm install
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

Make sure you have `grunt-cli` installed. If not, install it by:

```
npm install -g grunt-cli
```

Then, generating the documentation requires running:

```
grunt jsdoc
```