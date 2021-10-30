const Sequelize = require('sequelize');

module.exports = class Obtion extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
  }
  static associate(db) {
    db.Obtion.belongsTo(db.Job_recommendation, {
      foreignKey: 'job_recommendation_id',
      sourceKey: 'job_recommendation_id',
      onDelete: 'CASCADE',
    });
  }
};
