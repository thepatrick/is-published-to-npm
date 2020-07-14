is-published-to-npm
===================

Is this version of this package published to npm yet?

Use as a cli tool:

``` bash
# from a directory with a package.json
is-published-to-npm

# or for any package
is-published-to-npm {your package} {your version}
```

(Check the exit status - anything not zero means it has already been published)

Or as a module:

``` javascript
const { isPublishedToNPM } = require('is-published-to-npm');
// or import { isPublishedToNPM } from 'is-published-to-npm';

const pkg = process.argv[2];
const version = process.argv[3];

isPublishedToNPM(pkg, version)
  .then(published => {
    if (published) {
      console.log(pkg + ' v' + version + ' has been published');
      process.exit(1);
    } else {
      console.log(pkg + ' v' + version + ' has not been published yet');
    }
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
```
