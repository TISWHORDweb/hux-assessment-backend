
let { ModelUser } = require('../models');
const { errorHandle } = require('../core');
const jwt = require('jsonwebtoken');

//body safe state
exports.bodyParser = (req, res, next) => {
    if (!Object.keys(req.body).length > 0) throw new errorHandle("the document body is empty", 202);
    else next();
}

//user body guard
exports.bodyGuard = async (req, res, next) => {
    const rToken = req.headers['R-token'];
    if (typeof rToken == 'undefined') throw new errorHandle("Unauthorized Access, Use a valid token and try again", 401);
    //check and decode confirm code validity
    jwt.verify(rToken, process.env.SECRETKEY, (err, decoded) => {

        if (err) {
            throw new errorHandle("Invalid x-token code or token, Use a valid token and try again", 401);
        }

        req.user = decoded; // Attach user data to request object
        next(); // Proceed to the next middleware

    });
}