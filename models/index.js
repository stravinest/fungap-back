const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const Board = require('./board');
const Celebrity = require('./celebrity');
const Comment = require('./comment');
const Like = require('./like');
const Mbti_relationship = require('./mbti_relationship');
const User = require('./user');
const Job_recommendation = require('./job_recommendation');
const Obtion = require('./obtion');
const Chatlog = require('./chatlog');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//시퀄라이즈 쿼리 쓸 때 있어야함
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Board = Board;
db.Celebrity = Celebrity;
db.Comment = Comment;
db.Like = Like;
db.Mbti_relationship = Mbti_relationship;
db.User = User;
db.Job_recommendation = Job_recommendation;
db.Obtion = Obtion;
db.Chatlog = Chatlog;

Board.init(sequelize);
Celebrity.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);
Mbti_relationship.init(sequelize);
User.init(sequelize);
Job_recommendation.init(sequelize);
Obtion.init(sequelize);
Chatlog.init(sequelize);

Board.associate(db);
Celebrity.associate(db);
Comment.associate(db);
Like.associate(db);
Mbti_relationship.associate(db);
User.associate(db);
Obtion.associate(db);
Job_recommendation.associate(db);
Chatlog.associate(db);

module.exports = db;
