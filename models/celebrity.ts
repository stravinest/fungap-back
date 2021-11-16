import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class Celebrity extends Model {
  public celebrity_id!: number;
  public celebrity_name!: number;
  public celebrity_image!: string;
  public celebrity_mbti!: string;
}

Celebrity.init(
  {
    celebrity_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    celebrity_name: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    celebrity_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    celebrity_mbti: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Celebrity',
    tableName: 'celebrities',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {};

export default Celebrity;
