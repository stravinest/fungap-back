const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        board_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },       
        board_title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        board_image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        board_desc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        board_content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        board_delete_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        view_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        like_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        like_state: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        comment_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Board',
        tableName: 'boards',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Board.hasMany(db.Comment, {
      foreignKey: 'board_id',
      sourceKey: 'board_id',
    });
    db.Board.hasOne(db.Like, {
      foreignKey: 'board_id',
      sourceKey: 'board_id',
    });
  }
};
