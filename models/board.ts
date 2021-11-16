import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';
import User from './user';
import Comment from './comment';
import Like from './like';

class Board extends Model {
  public board_id!: number;
  public user_id!: number;
  public board_title!: string;
  public board_image!: string;
  public board_desc!: string;
  public board_content!: JSON;
  public board_delete_code!: number;
  public view_count!: number;
}

Board.init(
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
      type: Sequelize.JSON,
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

export const associate = (db: dbType) => {
  db.Board.hasMany(db.Comment, {
    foreignKey: 'board_id',
    sourceKey: 'board_id',
  });
  db.Board.hasMany(db.Like, {
    foreignKey: 'board_id',
    sourceKey: 'board_id',
  });
};

export default Board;
