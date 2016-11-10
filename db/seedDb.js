var logger = require("../logger/logger");
var config = require("../config.json");

var user = require('../models/user');
var interest = require('../models/interest');
var systemMessage = require('../models/systemMessage');
var userMessage = require('../models/userMessage');
var systemDefaults = require('../models/systemDefaults');
var userRole = require('../models/userRole');
var schoolDomain = require('../models/schoolDomain');

var wrap = require('co-express');
var co = require('co');

var userHelper = require('../services/userHelper.js');

function system() {
    var iSystemDefaults = new systemDefaults({
        DefaultProfilePictureURL: "/assets/avatar.png",
        DefaultBookPictureURL: "/assets/cover.jpg",
        DefaultTheme: "cyborg",
        DefaultBrandingText: "HeliosJS",
        Title: "HeliosJS"
    });
    iSystemDefaults.save();
    logger.warn("created systemDefaults");

    var schoolObj = require('./school-domains');
    var iSchoolDomain = new schoolDomain({
        date: new Date(),
        category: schoolObj.domains.category,
        domains: schoolObj.domains.domain
    });
    iSchoolDomain.save();
    logger.warn("created schoolDomain");

    var iUser = new user({
        username: "Admin",
        email: "contact@jasonchalom.com",
        salt: null,
        hash: null,
        name: "Administrator",
        address: "Room 13",
        phone: "1234567890",
        interests: [],
        picUrl: "http://www.lets-develop.com/wp-content/themes/olivias_theme/images/custom-avatar-admin.jpg",
        userRole: ["admin"],
        lastLoginDate: null,
        registrationDate: new Date(),
        money: 1000000,
        isStudent: false
    });

    iUser.salt = iUser.generateSalt();
    iUser.hash = iUser.generateHash("123456");
    iUser.save();
    logger.warn("created admin user");

    iUser2 = new user({
        username: "User",
        email: "user@jasonchalom.com",
        salt: null,
        hash: null,
        name: "User",
        address: "Room 13",
        phone: "1234567890",
        interests: [],
        picUrl: null,
        userRole: [],
        lastLoginDate: null,
        registrationDate: new Date(),
        money: 1000,
        isStudent: true
    });
    iUser2.salt = iUser.generateSalt();
    iUser2.hash = iUser.generateHash("123456");
    iUser2.save();
    logger.warn("created user");
}

var go = function() {
    co(function*() {
        var adminId;
        var userId;

        try {
            admin = yield userHelper.findUsername("Admin");
            user = yield userHelper.findUsername("User");

            var iSystemMessage = new systemMessage({
                message: "This is a test system message .... should also be in a toastr",
                date: new Date(),
                priority: 5,
                adminId: admin._id
            });
            iSystemMessage.save();

            var iUserMessage = new userMessage({
                message: "Hello Mate!!! Cool dude",
                date: new Date(),
                priority: 3,
                adminId: null,
                fromUserId: user._id,
                toUserId: admin._id
            });
            iUserMessage.save();

        } catch (e) {
            console.log("error in the engine room.");
            console.log(e);
            throw e;
        }

        /*    var iUserRole = new userRole({
                RoleId: String,
                RoleName: String,
                RoleDescription: String
            });
            iUserRole.save();*/

        /*    var iUserRating = new userRating({

            });
            iUserRating.save();*/

        /* yield sleep(1000);*/
    });
}

setTimeout(function() {
    system();
}, 1000);
setTimeout(function() {
    system();
    go();
}, 1000);

module.exports = {
    go: go,
    system: system
}
