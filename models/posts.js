const Sequelize = require('sequelize');

module.exports = class posts extends Sequelize.Model{
    static init(sequelize){
        return super.init({
			
                content:{
                    type: Sequelize.STRING(50),
                },
                writer:{
                    type: Sequelize.STRING(20),
                }
            
		}, {
            sequelize,
            timestamps: false,
            modelName: 'post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
    }
};