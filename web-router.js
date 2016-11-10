var async = require("async");
var path = require('path');
var fs = require('fs');
var pkg = require('./package.json');
var config = require('./config.json');

// route to display versions
module.exports = function(app, passport) {
    // define the versions
    var VERSIONS = { 'Version 1': '/v1' };

    // versioned routes go in the routes/ directory
    // import the routes
    for (var k in VERSIONS) {
        app.use(VERSIONS[k], require('./routes' + VERSIONS[k]));
    }

    require('./routes/index.js')(app, passport);
    require('./routes/admin.js')(app, passport);
    require('./routes/accounts.js')(app, passport);
    require('./routes/messages.js')(app, passport);
    require('./routes/errors.js')(app);

};
