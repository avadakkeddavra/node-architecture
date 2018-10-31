const express = require('express');
const Router = express.Router();
const AuthController = require('@auth/AuthController');
const AuthMiddleware = require('@middleware/AuthMiddleware');

Router.post('/login', AuthController.login.bind(AuthController))
Router.post('/register', AuthController.register.bind(AuthController))
Router.post('/resetlink', AuthController.requestForResetPassword.bind(AuthController));
Router.get('/check_resetlink/:hash', AuthController.checkResetPasswordLink.bind(AuthController));
Router.post('/reset_password/:hash', AuthController.resetPassword.bind(AuthController))

Router.get('/',AuthMiddleware.auth, function(Request, Response) {
    Response.send(Request.auth)
});
module.exports = Router;