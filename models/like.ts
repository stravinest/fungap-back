import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import Comment from './comment';
import User from './user';
import Board from './board';
import { dbType } from '.';

class Like extends Model {
  public like_id!: number;
  public user_id!: number;
  public board_id!: number;
}

Like.init(
  {
    like_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    board_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Like',
    tableName: 'likes',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {
  db.Like.belongsTo(db.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  db.Like.belongsTo(db.Board, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};

export default Like;
