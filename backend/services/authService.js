const User = require("../models/userModel");
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

exports.registerUser = async ({ email, password }) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const user = new User({ email, password });
    await user.save();

    return {
        // Sanitize the user obejct
        user: {
            _id: user._id,
            email: user.email,
            role: user.role
        },
    };
};

exports.loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid email or password");
    }

    // Generate an access token & refresh token
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    return {
        // Sanitize the user obejct
        user: {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        token,
        refreshToken,
    };
};

exports.refreshAccessToken = async (refreshToken) => {

    try {
        const decoded = verifyRefreshToken(refreshToken);

        const user = await User.findById(decoded.id);
        if (!user) throw new Error("User not found");

        const newAccessToken = generateToken(user._id);
        return { token: newAccessToken };
    
    } catch (err) {
        throw new Error("Invalid or expired refresh Token");
    }
};