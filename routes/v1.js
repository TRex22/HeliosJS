/* jshint node: true */
//main v1 route

/*var express = require('express');
var router = express.Router();*/

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('v1', { title: 'helios-api' });
});

module.exports = router;
*/


// Version 1
var express = require('express');
var app = module.exports = express();
// normal routes, all will be pre-fixed by the version
