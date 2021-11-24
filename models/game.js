const Sequelize = require('sequelize');

module.exports = class Game extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        game_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        game_title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        game_desc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        game_quest1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        game_quest2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        game_delete_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        game_view_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Game',
        tableName: 'games',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Game.hasMany(db.Game_comment, {
      foreignKey: 'game_id',
      sourceKey: 'game_id',
    });
    db.Game.hasMany(db.Game_like, {
      foreignKey: 'game_id',
      sourceKey: 'game_id',
    });
    db.Game.hasMany(db.Game_count, {
      foreignKey: 'game_id',
      sourceKey: 'game_id',
    });
    db.Game.belongsTo(db.User, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'CASCADE',
    });
  }
};
