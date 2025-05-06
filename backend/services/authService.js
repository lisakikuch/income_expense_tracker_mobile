const User = require("../models/userModel");
const generateToken = require('../utils/jwt');

exports.registerUser = async ({ email, password }) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);
    return {
        // Sanitize the user obejct
        user: {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        token
    };
};

exports.loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id);

    return {
        // Sanitize the user obejct
        user: {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        token
    };
};