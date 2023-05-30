const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let result = jwt.verify(token, process.env.token_key);
        req.user = result;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
    }
}

module.exports = { auth }