const Sequelize = require('sequelize');

module.exports = class Chatlog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        chat_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        room_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Chatlog',
        tableName: 'chatlogs',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Chatlog.belongsTo(db.Board, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
      onDelete: 'CASCADE',
    });
  }
};
