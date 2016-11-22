var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../../config');
var should = require('chai').should();

var mongoose = require('mongoose');
var user = require('../../models/user');
var interest = require('../../models/interest');
var systemMessage = require('../../models/systemMessage');
var userMessage = require('../../models/userMessage');
var systemDefaults = require('../../models/systemDefaults');
var userRole = require('../../models/userRole');

/*describe('#Database Models', function() {
    // tests here
    it('Server should be able to start up', function() {
        
    });
});*/