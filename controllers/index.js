const authController = require('./auth-controller');
const boardController = require('./board-controller');
const commentController = require('./comment-controller');
const userController = require('./user-controller');
const mypageController = require('./mypage-controller');
const mbtiController = require('./mbti-controller');
// const univBoardController = require('./univ-board-controller');
// const utilController = require('./util-controller');

module.exports = {
  authController,
  boardController,
  commentController,
  userController,
  mypageController,
  mbtiController,

  // freeBoardController,
  // univBoardController,
  // utilController,
};
