const express = require("express");
const app = express();


const cors = require('cors');
const morgan = require('morgan');

const report = require('./routes/report');
const index = require('./routes/index');
const reports = require('./routes/reports');
const register = require('./routes/register');


const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 'longandhardP4$w0rD';

const jwt = require('jsonwebtoken');

const payload = { email: "user@example.com" };
const secret = process.env.JWT_SECRET;

const token = jwt.sign(payload, secret, { expiresIn: '1h'});

const port = 1337;

// //export JWT_SECRET='longsecret'

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // spara lösenord i databasen.
});

jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
        // not a valid token
    }

    // valid token
});


// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
     console.log(req.method);
     console.log(req.path);
     next();
});
app.use('/', index);
app.use('/report/week', report);
app.use('/reports', reports);
app.use('/register', register);


// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});


// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));