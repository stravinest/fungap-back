const Sequelize = require('sequelize');

module.exports = class Game_count extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        game_count_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        game_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_mbti: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        game_quest: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Game_count',
        tableName: 'game_counts',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Game_count.belongsTo(db.User, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'CASCADE',
    });
    db.Game_count.belongsTo(db.Game, {
      foreignKey: 'game_id',
      sourceKey: 'game_id',
      onDelete: 'CASCADE',
    });
  }
};
