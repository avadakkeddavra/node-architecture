module.exports = function (db) {
    db.reset_password.belongsTo(db.users, {foreignKey: 'user_id'});
}