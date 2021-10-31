const getBoard = require('./getBoard');
const writeBoard = require('./writeBoard');
const editBoard = require('./editBoard');
const deleteBoard = require('./deleteBoard');
const detailBoard = require('./detailBoard');

console.log(getBoard)
module.exports = {
  getBoard,
  writeBoard,
  editBoard,
  deleteBoard,
  detailBoard,
};
