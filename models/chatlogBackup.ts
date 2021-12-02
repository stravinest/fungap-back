import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class ChatlogBackup extends Model {
  public chat_id!: number;
  public room_name!: string;
  public user_id!: number;
  public message!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

ChatlogBackup.init(
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
    createdAt: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'ChatlogBackup',
    tableName: 'chatlogBackups',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {
  db.Chatlog.belongsTo(db.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};

export default ChatlogBackup;
