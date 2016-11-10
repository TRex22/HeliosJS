/*TODO Pretty much build this*/
// route to display versions
module.exports = function(app, passport) {
    // define the versions
    var VERSIONS = { 'Version 1': '/v1' };

    // versioned routes go in the routes/ directory
    // import the routes
    for (var k in VERSIONS) {
        app.use(VERSIONS[k], require('./routes' + VERSIONS[k]));
    }

    exports.index = function(req, res) {
        res.render('index.ejs', { 'title': pkg.name, 'versions': JSON.stringify(VERSIONS), 'buildVersion': pkg.version });
    };

    exports.teapot = function(req, res) {
        res.status(418);
        res.json({ "Message": "I'm a teapot!!!" });
    };

    // error handlers - 404 and 500 others check the logs

    require('./routes/errors.js')(app);

};
