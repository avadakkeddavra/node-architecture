
module.exports = function (sequelize,Sequelize) {
    
    let UsersSchema = {
        name: {
            type: Sequelize.STRING(64)
        },
        email: {
            type: Sequelize.STRING(256),
            unique: true
        },
        password: {
            type: Sequelize.STRING(256),
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
    };
    
    let ModelOptions = {
        timestamps: false
    };
    
    return sequelize.define('users', UsersSchema, ModelOptions);
};

