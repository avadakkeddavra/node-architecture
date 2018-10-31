const Controller = require('@controller/Controller');

/**
 * Models
 */
const GlobalModel = require('@model/index');
const User =  GlobalModel.users;
const ResetPassword = GlobalModel.reset_password;
/**
 * Schemas
 */
const AuthSchema = require('@schema/AuthSchema');
/**
 *  Libs
 */
const bcrypt = require('bcrypt');
/**
 * Services
 * 
 */
const DefaultService = require('@service/DefaultService');
const JWTService = require('@service/JWTService');

class AuthController extends Controller{

    login(Request,Response) {

        this.Joi.validate(Request.body, AuthSchema.login)
            .then(Data => {
                User.findOne({
                    where: {
                        email: Data.email
                    }
                }).then(async user => {

                    if(user) {
                        const verifyPassword = await bcrypt.compare(Data.password, user.password);
                        if(verifyPassword) {
                            const token = JWTService.sign({
                                name:user.name,
                                id:user.id,
                                email:user.email,
                            }, process.env.JWT_SECRET, { expiresIn:'1h'});

                            Response.send({success: true, token: token})
                        } else {
                            Response.status(400);
                            Response.send({success: false, message: 'Wrong password'})
                        }
                    }

                }).catch(Error => {
                    Response.status(400);
                    Response.send({message: Error.message, stack: Error.stack})
                })
            })
            .catch(Error => {
                Response.status(400);
                Response.send({message: Error.message, stack: Error.stack})
            });
    }
    register(Request, Response) {

        this.Joi.validate(Request.body, AuthSchema.register)
            .then( Data => {
                Data.password = bcrypt.hashSync(Data.password, Number(process.env.SALT_ROUNDS));
                User.create(Data).then(user => {

                    const token = JWTService.sign({
                        name:user.name,
                        id:user.id,
                        email:user.email,
                    }, process.env.JWT_SECRET, { expiresIn:'1h'});

                    Response.send({success: true, token: token})
                }).catch(Error => {
                    Response.status(400);
                    Response.send(Error);
                })
            }).catch( Error => {
                Response.status(400);
                Response.send(Error);
            });
    }

    requestForResetPassword(Request, Response) {
        this.Joi.validate(Request.body, AuthSchema.resetLink).then(Data => {
            User.findOne({
                where: {
                    email: Data.email
                } 
            }).then(async user => {

                if(user) {
                    const createdRequest = await ResetPassword.findOne({
                        where: {
                            user_id: user.id,
                            used: 0
                        }
                    });

                    if(!createdRequest) {
                        ResetPassword.create({
                            user_id: user.id,
                            hash: DefaultService.generateRandomString(100)
                        }).then(reset => {

                            Response.mailer.send('reset_password',{
                                to: user.email,
                                subject: 'Reset password',
                                resetLink: 'http://localhost:3000/check_resetlink/'+reset.hash
                            }, function (err, message) {
                                if(err) {
                                    Response.send(err)
                                    return;
                                }
                                Response.send({success: true});
                            });
                                      
                        }).catch(Error => {
                            Response.send(Error.stack)
                        })
                    } else {
                        Response.send({message: 'You have already requested for a reset password. Check your email and find a reset link'})
                    }
                    
                } else {
                    Response.send({success: false, message: 'There no such user with this email'})
                }

            }).catch(Error => {
                Response.status(400);
                Response.send(Error);
            })
        }).catch(Error => {
            Response.status(400);
            Response.send(Error);
        })
    }

    async checkResetPasswordLink(Request, Response) {
        let check = await ResetPassword.findOne({
            where: {
                hash: Request.params.hash,
                used: 0
            }
        });

        if(check) {
            Response.send({success: true})
        } else {
            Response.send({success: false, message: 'This link has been already used'});
        }
    }

    resetPassword(Request, Response) {
        this.Joi.validate(Request.body, AuthSchema.reset).then(Data => {
            ResetPassword.findOne({
                where: {
                    hash: Request.params.hash
                },
                include: [User]
            }).then(reset => {

                if(reset && reset.used == 0) {
                    reset.user.update({
                        password: bcrypt.hashSync(Data.new_password, Number(process.env.SALT_ROUNDS))
                    }).then(async user => {
                        await reset.update({used: 1});
                        Response.send({success:true, message: "Your password successfully updated"})
                    });
                } else {
                    Response.send({success: false, message: 'This reset link is unavailable'});
                }
            }).catch(Error => {
                Response.send(Error)
            })
            
        }).catch(Error => {
            Response.send(Error)
        }) 
    }
}

module.exports = new AuthController();