module.exports = function (db) {
    db.users.hasMany(db.reset_password, {foreignKey: 'user_id'});
}