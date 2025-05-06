const authService = require('../services/authService');

exports.createUser = async (req, res) => {
    try {
        const data = await authService.registerUser(req.body);
        res.status(201).json({message: "User registered successfully", ...data});

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const data = await authService.loginUser(req.body);

        res.status(200).json({ message: "Login successful", ...data });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.logout = async (req, res) => {
    res.status(200).json({message: "Logged out successfully"});
};