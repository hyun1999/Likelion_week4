const Sequelize = require('sequelize');

module.exports = class auth extends Sequelize.Model{
    static init(sequelize){
        return super.init({

                email:{
                    type: Sequelize.STRING(40),
                },
                password:{
                    type: Sequelize.STRING(200),
                }
            
		}, {
            sequelize,
            timestamps: false,
            modelName: 'auth',
            tableName: 'auths',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
    }
};