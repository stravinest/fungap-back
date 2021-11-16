import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';
import User from './user';
import Comment from './comment';
import Like from './like';

class Obtion extends Model {
  public obtion_id!: number;
  public job_recommendation_id!: number;
  public value!: string;
  public label!: string;
  public trigger!: string;
}

Obtion.init(
  {
    obtion_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    job_recommendation_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    value: {
      type: Sequelize.STRING,
    },
    label: {
      type: Sequelize.STRING,
    },
    trigger: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Obtion',
    tableName: 'obtions',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {
  db.Obtion.belongsTo(db.Job_recommendation, {
    foreignKey: 'job_recommendation_id',
    onDelete: 'CASCADE',
  });
};

export default Obtion;
