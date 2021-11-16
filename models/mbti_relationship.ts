import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from '.';

class Mbti_relationship extends Model {
  public mbti_relationship_id!: number;
  public my_mbti!: string;
  public other_mbti!: string;
  public score!: number;
  public content!: string;
}

Mbti_relationship.init(
  {
    mbti_relationship_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    my_mbti: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    other_mbti: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Mbti_relationship',
    tableName: 'mbti_relationships',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export const associate = (db: dbType) => {};

export default Mbti_relationship;
