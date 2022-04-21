var jwt = require('jsonwebtoken');
require('dotenv').config();

async function auth(req, res, next) {
    var token = req.headers['auth'];
    const auth = await jwt.verify(token, process.env.SECRET);
    accountId = auth.id;
    next();
}
module.exports = auth;