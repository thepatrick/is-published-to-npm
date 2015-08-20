'use strict';

/* eslint-env node */
/* eslint vars-on-top: 0, no-process-exit: 0 */

var npm = require('npm');

module.exports = function(pkg, version, callback) {
  npm.load({}, function(err) {
    if (err) {
      throw err;
    }
    npm.commands.view([pkg, 'versions'], true, function(err, msg) {
      if (err && err.statusCode !== 404) {
        callback(undefined, []);
      } else {
        /* eslint guard-for-in: 0 */
        var remoteVersion = Object.keys(msg)[0];
        var remoteVersions = msg[remoteVersion].versions;

        if (~remoteVersions.indexOf(version)) {
          callback(new Error(
            pkg + ' v' + version + ' has already been published. You need to increment the ' +
            'version in a way that\'s appropriate to your changes before merging.'
          ));
        } else {
          callback(undefined, remoteVersions);
        }
      }
    });
  });
};
