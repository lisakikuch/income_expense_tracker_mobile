const User = require("../models/userModel");

exports.getAllUsers = async ({ page = 1, limit = 10 }) => {
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const users = await User.find()
        .select("-password") // Exclude password
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments();
    const pages = Math.ceil(total / limit);

    return { users, total, page, pages };
};