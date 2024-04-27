module.exports = (req, res, next) => {
    if (req.userRole === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
    }
};