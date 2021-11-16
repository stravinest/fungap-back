import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';
import User from './user';
import Comment from './comment';
import Like from './like';

class Job_recommendation extends Model {
  public job_recommendation_id!: number;
  public id!: string;
  public message!: string;
  public trigger!: string;
}

Job_recommendation.init(
  {
    job_recommendation_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    id: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.STRING,
    },
    trigger: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Job_recommendation',
    tableName: 'job_recommendations',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {
  db.Job_recommendation.hasMany(db.Obtion, {
    foreignKey: 'job_recommendation_id',
    sourceKey: 'job_recommendation_id',
  });
};

export default Job_recommendation;
