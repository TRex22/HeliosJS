'use strict'
var logger = require("../logger/logger");

var mongoose = require('../config/db.js').mongoose;
var config = require('../config.json');
var async = require("async");

//models
var user = require('../models/user');
var interest = require('../models/interest');
var systemMessage = require('../models/systemMessage');
var userMessage = require('../models/userMessage');
var systemDefaults = require('../models/systemDefaults');
var userRole = require('../models/userRole');

/*function listUsers() {
    var User = mongoose.model('User', user);
    return User.find({}, function(err, data) {});
}*/

/* istanbul ignore  next*/
function getSystemDefaults(callback) {
    var sysDefault = mongoose.model('SystemDefaults', systemDefaults);

    sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
        callback.data.err = err;
        callback.data.defaults = defaults;
    });
}

/* istanbul ignore  next*/
function find(collec, query, callback) {
    mongoose.connection.db.collection(collec, function(err, collection) {
        callback.collec.data.err = err;
        collection.find(query).toArray(callback.collec.data);
    });
}

/* istanbul ignore  next*/
function dropCollection(collec) {
    if (mongoose.connection.collections[collec]) {
        mongoose.connection.collections[collec].drop(function(err) {
            if (err) {
                logger.warn("Delete Error on Collection: " + collec + " " + err);
            }
            logger.warn("collection " + collec + " dropped");
        });
    }
}

module.exports = {
    find: find,
    dropCollection: dropCollection,
    getSystemDefaults: getSystemDefaults
};
