const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');
const errorHandler = require('../utils/error.js');
// const expressAsyncHandler = require('express-async-handler');

const verifyToken = asyncHandler(async(req, res, next) => {
    const token = req.cookies.access_token 
    if(!token) return next(errorHandler(401, 'Invalid or expired token;Login required!'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'Invalid or expired token;Login required!'))

        req.user = user;
        console.log(user)
        next();
    })
})

module.exports = verifyToken


