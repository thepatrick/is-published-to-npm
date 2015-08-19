is-published-to-npm
===================

Is this version of this package published to npm yet?

Use as a cli tool:

```
# from a directory with a package.json
is-published-to-npm

# or for any package
is-published-to-npm {your package} {your version}
```

(Check the exit status - anything not zero means yes it has!)

Or as a module:

```
var isPublishedToNPM = require('is-published-to-npm');

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
```
