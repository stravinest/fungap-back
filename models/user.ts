import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class User extends Model {
  public user_id?: number; 
  public email!: string;
  public nickname!: string;
  public user_image!: string;
  public user_mbti!: string;
  public password!: string;
  public user_authority!: string;
  public user_delete_code!: number;
  public refresh_token!: string;
  public provider!: string;
  public sns_id!: string;
}
User.init(
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
      allowNull: false,
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

  export const associate=(db:dbType)=> {
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

export default User;