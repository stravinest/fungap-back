const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_image: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        user_mbti: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_delete_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
    db.User.hasMany(db.Like, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
  }
};
