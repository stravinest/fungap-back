const Sequelize = require('sequelize');

module.exports = class Job_recommendation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
  }
  static associate(db) {
    db.Job_recommendation.hasMany(db.Obtion, {
      foreignKey: 'job_recommendation_id',
      sourceKey: 'job_recommendation_id',
    });
  }
};
