const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/node-architecture');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('Db connection established successfully');
});

module.exports = db;

