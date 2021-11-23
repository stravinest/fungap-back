const authController = require('./auth-controller');
const boardController = require('./board-controller');
const commentController = require('./comment-controller');
const userController = require('./user-controller');
const mypageController = require('./mypage-controller');
const mbtiController = require('./mbti-controller');
const chatController = require('./chat-controller');
const gameController = require('./game-controller');
const gameCommController = require('./game-comment-controller');
const adminController = require('./admin-controller')
// const univBoardController = require('./univ-board-controller');
// const utilController = require('./util-controller');

module.exports = {
  authController,
  boardController,
  commentController,
  userController,
  mypageController,
  mbtiController,
  chatController,
  gameController,
  gameCommController,
  adminController,
  // freeBoardController,
  // univBoardController,
  // utilController,
};
