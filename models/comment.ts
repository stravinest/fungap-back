import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';
import User from './user';
import Board from './board';

class Comment extends Model {
  public comment_id!: number;
  public user_id!: number;
  public board_id!: number;
  public comment!: string;
  public comment_delete_code!: number;
}

Comment.init(
  {
    comment_id: {
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
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comment_delete_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Comment',
    tableName: 'comments',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {
  db.Comment.belongsTo(db.User, {
    foreignKey: 'user_id',
    sourceKey: 'user_id',
    onDelete: 'CASCADE',
  });
  db.Comment.belongsTo(db.Board, {
    foreignKey: 'board_id',
    sourceKey: 'board_id',
    onDelete: 'CASCADE',
  });
};

export default Comment;
