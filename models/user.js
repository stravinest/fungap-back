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
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '아무개',
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
        user_authority: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'public',
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
    db.User.hasMany(db.Chatlog, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
    db.User.hasMany(db.Game, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
    db.User.hasMany(db.Game_comment, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
    db.User.hasMany(db.Game_count, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
    db.User.hasMany(db.Game_like, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
  }
};
