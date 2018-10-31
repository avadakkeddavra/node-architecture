let fs = require('file-system');
let path = require('path');

let sequelize = require('./connection').sequelize;
let Sequelize = require('./connection').Sequelize;

let db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js" && file !== 'connection.js' && file !== 'relations');
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));

        db[model.name] = model;
    });



db.sequelize = sequelize;
db.Sequelize = Sequelize;

require('./relations/user')(db);
require('./relations/reset_password')(db);


module.exports = db;