
module.exports = function (sequelize,Sequelize) {
    
    let Reset_passwordSchema = {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        hash: {
            type: Sequelize.STRING(256),
        },
        used: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0 
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
        freezeTableName: true,
        timestamps: false
    };
    
    return sequelize.define('reset_password', Reset_passwordSchema, ModelOptions);
};

