const Joi = require('joi');

const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

module.exports = {
    schema: schema
}