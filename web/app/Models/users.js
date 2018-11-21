const connection = require('./connection');

const UsersModel = connection.model('Users', {
  name: 'string',
  email: {
    type: String,
    unique: true
  },
  password: 'string'
});


module.exports = UsersModel;
