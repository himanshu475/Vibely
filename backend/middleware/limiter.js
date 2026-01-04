const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: {
        msg: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, 
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 login attempts per hour
    message: {
        msg: "Too many login attempts from this IP, please try again in an hour for security reasons"
    }
});

// Export both together using CommonJS syntax
module.exports = {
    globalLimiter,
    authLimiter
};