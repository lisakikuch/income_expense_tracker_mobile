const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next();
    } else {
        res.status(403).json({message: "Not authorized as admin"});
    }
};

module.exports = isAdmin;