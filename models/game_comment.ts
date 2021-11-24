import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class Game_comment extends Model {
  public game_comment_id!: number;
  public user_id!: number;
  public game_id!: number;
  public game_comment!: string;
  public game_comment_delete_code!: number;
}

Game_comment.init(
      {
        game_comment_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        game_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        game_comment: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        game_comment_delete_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Game_comment',
        tableName: 'game_comments',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  
  export const associate = (db:dbType)=> {
    db.Game_comment.belongsTo(db.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    db.Game_comment.belongsTo(db.Game, {
      foreignKey: 'game_id',
      onDelete: 'CASCADE',
    });
  }
  export default Game_comment;
