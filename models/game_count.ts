import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class Game_count extends Model {
  public game_count_id!: number;
  public user_id!: number;
  public game_id!: number;
  public user_mbti!: string;
  public game_quest!: string;
}

Game_count.init(
      {
        game_count_id: {
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
        user_mbti: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        game_quest: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Game_count',
        tableName: 'game_counts',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  
  export const associate=(db: dbType)=> {
    db.Game_count.belongsTo(db.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    db.Game_count.belongsTo(db.Game, {
      foreignKey: 'game_id',
      onDelete: 'CASCADE',
    });
  }

  export default Game_count;