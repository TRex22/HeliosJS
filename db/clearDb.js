'use strict'
//use with caution!!!!
var logger = require("../logger/logger");
var config = require("../config.json");

var user = require('../models/user');
var interest = require('../models/interest');
var systemMessage = require('../models/systemMessage');
var userMessage = require('../models/userMessage');
var systemDefaults = require('../models/systemDefaults');
var userRole = require('../models/userRole');

var dbHelper = require('../services/dbHelper.js');

function go() {
    dbHelper.dropCollection("SchoolDomain");
    dbHelper.dropCollection("User");
    dbHelper.dropCollection("SystemDefaults");
    dbHelper.dropCollection("UserMessage");
    dbHelper.dropCollection("SystemMessage");
    dbHelper.dropCollection("UserRole");
    dbHelper.dropCollection("UserLog");
}

module.exports = { go: go };
