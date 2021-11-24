import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class Chatlog extends Model {
  public chat_id!: number;
  public room_name!: string;
  public user_id!: number;
  public message!: string;
}

Chatlog.init(
  {
    chat_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    room_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Chatlog',
    tableName: 'chatlogs',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {
  db.Chatlog.belongsTo(db.Board, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};

export default Chatlog;
