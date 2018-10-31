const Joi = require('joi');

const LoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

const RegisterSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

const CreateResetLinkSchema = Joi.object().keys({
    email: Joi.string().email().required(),
});

const ResetSchema = Joi.object().keys({
    new_password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    repeat_password: Joi.ref('new_password')
});

module.exports = {
    login: LoginSchema,
    register: RegisterSchema,
    resetLink: CreateResetLinkSchema,
    reset: ResetSchema
}