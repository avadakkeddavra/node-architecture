const jwt = require('jsonwebtoken');
const GlobalModel = require('@model/index');
const User = GlobalModel.users;

class AuthMiddleware {
    
    auth(Request, Response, next) {

        if(!Request.headers.authorization) {
            Response.status(401);
            Response.send('Unauthorized');
            return;
        }

        let token = Request.headers.authorization;
        token = token.replace('Bearer ','');

        jwt.verify(token, process.env.JWT_SECRET, function(Error, Decoded) {
            if(!Error) {
                User.findById(Decoded.id).then(user => {
                    if(user) {
                        Request.auth = {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        }
                        next()
                    } else {
                        Response.status(400);
                        Response.send('This user does not exists')
                    }
                })
            } else {
                Response.status(400);
                Response.send(Error)
            }
        })
    }

}

module.exports = new AuthMiddleware();
    