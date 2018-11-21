const connection = require('./connection');
const Schema = require('mongoose').Schema;

const ResetPaswordModel = connection.model('reset-password', {
  user: {
    type:Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  used: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = ResetPaswordModel;
