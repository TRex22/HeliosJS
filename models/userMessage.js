var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var userMessageSchema = mongoose.Schema({
    	message: String,
    	priority: Number,
    	date: Date,
    	adminId: String,
    	fromUserId: String,
    	toUserId: String,
        previousMessageId: String
}, { strict: false, collection: 'UserMessage' });

userMessageSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('UserMessage', userMessageSchema);
var userMessage = mongoose.model('UserMessage');

module.exports = userMessage;