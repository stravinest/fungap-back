const Sequelize = require('sequelize');

module.exports = class Mbti_relationship extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        mbti_relationship_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        my_mbti: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        other_mbti: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Mbti_relationship',
        tableName: 'mbti_relationships',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {}
};
