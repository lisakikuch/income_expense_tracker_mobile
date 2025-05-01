const User = require("../models/userModel");
const generateToken = require('../utils/jwt');

exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const user = new User({ email, password })
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({ 
            message: "User registered successfully", 
            // Sanitize the user obejct
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }, 
            token 
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({email});

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        const token = generateToken(user._id);

        res.status(200).json({ 
            message: "Login successful", 
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }, 
            token 
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    };
};

exports.logout = async (req, res) => {
    res.status(200).json({message: "Logged out successfully"});
};