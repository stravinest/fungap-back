const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const Board = require('./board');
const Celebrity = require('./celebrity');
const Comment = require('./comment');
const Like = require('./like');
const Mbti_relationship = require('./mbti_relationship');
const User = require('./user');
const Game = require('./game');
const Game_comment = require('./game_comment');
const Game_like = require('./game_like');
const Game_count = require('./game_count');

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
db.Game = Game;
db.Game_comment = Game_comment;
db.Game_like = Game_like;
db.Game_count = Game_count;

Board.init(sequelize);
Celebrity.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);
Mbti_relationship.init(sequelize);
User.init(sequelize);
Game.init(sequelize);
Game_comment.init(sequelize);
Game_like.init(sequelize);
Game_count.init(sequelize);

Board.associate(db);
Celebrity.associate(db);
Comment.associate(db);
Like.associate(db);
Mbti_relationship.associate(db);
User.associate(db);
Game.associate(db);
Game_comment.associate(db);
Game_like.associate(db);
Game_count.associate(db);

module.exports = db;
