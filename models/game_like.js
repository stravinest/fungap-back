const Sequelize = require('sequelize');

module.exports = class Game_like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        game_like_id: {
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
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Game_like',
        tableName: 'game_likes',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Game_like.belongsTo(db.User, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'CASCADE',
    });
    db.Game_like.belongsTo(db.Game, {
      foreignKey: 'game_id',
      sourceKey: 'game_id',
      onDelete: 'CASCADE',
    });
  }
};
