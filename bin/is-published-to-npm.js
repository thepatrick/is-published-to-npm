#!/usr/bin/env node

'use strict';

/* eslint-env node */
/* eslint vars-on-top: 0, no-process-exit: 0 */

var fs = require('fs');
var path = require('path');

var isPublishedToNPM = require('../src/is-published-to-npm');

var pkg = process.argv[2];
var version = process.argv[3];

if (!(pkg && version)) {
  try {
    var pkgJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
    pkg = pkgJson.name;
    version = pkgJson.version;
  } catch(err) {
    console.log('is-published-to-npm must either be run from a a directory with a package.json or');
    console.log('with package name and arguments provided:');
    console.log('> is-published-to-npm pkgname version');
    process.exit(2);
  }
}

isPublishedToNPM(pkg, version, function(err) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  } else {
    console.log(pkg + ' v' + version + ' has not been published yet!');
  }
});
