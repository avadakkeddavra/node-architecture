const jwt = require('jsonwebtoken');

class JWT {
    sign(Data, secret, options = {}) {
        return jwt.sign(Data, secret, options);
    }
}

module.exports = new JWT();