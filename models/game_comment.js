const Sequelize = require('sequelize');

module.exports = class Game_comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        game_comment_id: {
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
        game_comment: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        game_comment_delete_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Game_comment',
        tableName: 'game_comments',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Game_comment.belongsTo(db.User, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'CASCADE',
    });
    db.Game_comment.belongsTo(db.Game, {
      foreignKey: 'game_id',
      sourceKey: 'game_id',
      onDelete: 'CASCADE',
    });
  }
};
