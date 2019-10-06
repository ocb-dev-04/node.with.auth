const jwt = require('jsonwebtoken');

module.exports =  function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verifed = jwt.verify(token, process.env.JWT_KEY);
        req.user = verifed;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}