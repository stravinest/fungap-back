const Sequelize = require('sequelize');

module.exports = class Celebrity extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        celebrity_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        celebrity_name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        celebrity_image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        celebrity_mbti: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Celebrity',
        tableName: 'celebrities',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {}
};
