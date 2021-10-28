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
          allowNull: true,
<<<<<<< HEAD
          unique: true,
=======
>>>>>>> be019c35792193b53db4144522a341a90ebecba6
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
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        user_delete_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        refresh_token: {
          type: Sequelize.STRING,
        },
        provider: {
          type: Sequelize.STRING,
          allowNul: false,
          defaultValue: 'local',
        },
        sns_id: {
          type: Sequelize.STRING,
          allowNull: true,
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
