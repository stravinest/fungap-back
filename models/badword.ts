import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class Badword extends Model {
  public id!: number;
  public badword!: string;
}

Badword.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    badword: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Badword',
    tableName: 'badwords',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {};

export default Badword;
