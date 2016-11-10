//A Simple Example
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production 
var bruteforce = new ExpressBrute(store);
 
app.post('/auth',
    bruteforce.prevent, // error 429 if we hit this route too often 
    function (req, res, next) {
        res.send('Success!');
    }
);