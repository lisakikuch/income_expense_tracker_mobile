const jwt = require('jsonwebtoken');

// Access Token
exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

exports.verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Refresh Token
exports.generateRefreshToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"});
};

exports.verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};