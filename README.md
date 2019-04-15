# [node-meta-trie](https://github.com/walasek/node-meta-trie) [![Build Status](https://img.shields.io/travis/walasek/node-meta-trie.svg?style=flat-square)](https://travis-ci.org/walasek/node-meta-trie) [![Package Version](https://img.shields.io/npm/v/meta-trie.svg?style=flat-square)](https://www.npmjs.com/walasek/node-meta-trie) ![License](https://img.shields.io/npm/l/meta-trie.svg?style=flat-square) [![Dependencies](https://david-dm.org/walasek/node-meta-trie.svg)](https://david-dm.org/walasek/node-meta-trie.svg)  [![codecov](https://codecov.io/gh/walasek/node-meta-trie/branch/master/graph/badge.svg)](https://codecov.io/gh/walasek/node-meta-trie)

A Trie structure for big dictionaries.

---

## Goal

Need to store a million keys in a dictionary? Running out of memory doing just that? Use a tree! Oh, and attach any metadata!

## Installation

Node `>=8.9.0` is required.

```bash
npm install --save meta-trie
```

To perform tests use:

```bash
cd node_modules/meta-trie
npm i
npm t
```

This project also has a benchmark that you can run yourself:

```bash
cd node_modules/meta-trie
npm i
npm run benchmark
```

## Usage

Documentation is available [here](https://walasek.github.io/node-meta-trie/).

```javascript
const TrieNode = require('meta-trie');

const my_tree = new TrieNode();
// Store anything, the key should be a string (can be a number, but that's hacky)
my_tree.put('some key', 'some value');

// Can retrieve it too
if(my_tree.get('some key') != 'some value')
	throw `This won't ever happen, no worries`;

// Can iterate over the whole tree
for([key, value] of my_tree)
	console.log(`${key} => ${value}`);
```

For simplicity there is also a simple Proxy that supports a dictionary-like interface. Beware that this has a performance hit.

```javascript
const trieDict = require('meta-trie/dict');

const my_tree = trieDict();
// Store stuff like in a dictionary
my_tree['some key'] = 'some value';

// Grab it too
if(my_tree['some key'] != 'some value')
	throw `Not a chance`;

// JSONize it, note there's no way to parse it back into a tree
console.log(JSON.stringify(my_tree));
// {"some key": "some value"}

// Iteration of the dict Proxy currently not implemented.
```

# Benchmarks

The following benchmark compares two different keying strategies - Wide tree tests a lot of short keys (each tree node has many children), while Deep tree tests longer keys with more randomness in them (also requires more memory/can store less data). Beware that key generation for Deep tree takes a lot more time.

```
Finished Wide tree, random read, 10 entries result: 10,528,851 ops/sec ±10.98% (4518512 samples) 0ms ±10.98% (4518512 samples)
Finished Deep tree, random read, 10 entries result: 4,279,341 ops/sec ±3.5% (3791636 samples) 0ms ±3.5% (3791636 samples)

Finished Wide tree, random read, 100 entries result: 7,041,257 ops/sec ±5.52% (4127222 samples) 0ms ±5.52% (4127222 samples)
Finished Deep tree, random read, 100 entries result: 3,582,229 ops/sec ±4.62% (3532846 samples) 0ms ±4.62% (3532846 samples)

Finished Wide tree, random read, 1000 entries result: 4,631,008 ops/sec ±4.04% (3639972 samples) 0ms ±4.04% (3639972 samples)
Finished Deep tree, random read, 1000 entries result: 3,276,533 ops/sec ±3.44% (3520151 samples) 0ms ±3.44% (3520151 samples)

Finished Wide tree, random read, 10000 entries result: 2,426,648 ops/sec ±2.6% (2888383 samples) 0ms ±2.6% (2888383 samples)
Finished Deep tree, random read, 10000 entries result: 3,061,468 ops/sec ±3.25% (3417499 samples) 0ms ±3.25% (3417499 samples)

Finished Wide tree, random read, 100000 entries result: 1,012,190 ops/sec ±1.79% (1753290 samples) 0ms ±1.79% (1753290 samples)
Finished Deep tree, random read, 100000 entries result: 2,635,031 ops/sec ±3.7% (3185012 samples) 0ms ±3.7% (3185012 samples)

Finished Wide tree, random read, 1000000 entries result: 729,707 ops/sec ±1.45% (1449511 samples) 0ms ±1.45% (1449511 samples)
Finished Deep tree, random read, 1000000 entries result: 2,339,466 ops/sec ±4.55% (2879711 samples) 0ms ±4.55% (2879711 samples)
```

It is crucial for high performance computing to properly pick a keying strategy for your use case. Keep in mind this library only helps with keys, it won't help you store 10 gigs of values (but willwork just fine as an index).

## Contributing

The source is documented with JSDoc. To generate the documentation use:

```bash
npm run docs
```

Extra debugging information is printed using the `debug` module:

```bash
DEBUG=binary-encoder:* npm t
```

The documentation will be put in the new `docs` directory.

To introduce an improvement please fork this project, commit changes in a new branch to your fork and add a pull request on this repository pointing at your fork. Please follow these style recommendations when working on the code:

* Use tabs (yup).
* Use `async`/`await` and/or `Promise` where possible.
* Features must be properly tested.
* New methods must be properly documented with `jscode` style comments.