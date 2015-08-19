#!/usr/bin/env node

'use strict';

/* eslint-env node */
/* eslint vars-on-top: 0, no-process-exit: 0 */

var isPublishedToNPM = require('../src/is-published-to-npm');

if (process.argv.length < 4) {
  console.log('is-published-to-npm requires two arguments:');
  console.log('> is-published-to-npm pkgname version');
  process.exit(2);
}

var pkg = process.argv[2];
var version = process.argv[3];

isPublishedToNPM(pkg, version, function(err) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  } else {
    console.log(pkg + ' v' + version + ' has not been published yet!');
  }
});
