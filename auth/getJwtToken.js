const jwt = require('jsonwebtoken');

function getJwtToken(username) {
    const payload = {
        username
    };
    const secret = process.env.JWT_SECRET || 'is it safe?'

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = getJwtToken;