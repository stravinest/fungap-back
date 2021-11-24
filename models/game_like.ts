import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class Game_like extends Model {
  public game_like_id!: number;
  public user_id!: number;
  public game_id!: number;
}

Game_like.init(
      {
        game_like_id: {
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
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Game_like',
        tableName: 'game_likes',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  
  export const associate=(db:dbType)=> {
    db.Game_like.belongsTo(db.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    db.Game_like.belongsTo(db.Game, {
      foreignKey: 'game_id',
      onDelete: 'CASCADE',
    });
  }
  export default Game_like;
