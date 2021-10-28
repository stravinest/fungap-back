const signup = require('./signup_validator');
const checkEmail = require('./check_email_validator');
const checkNickname = require('./check_nickname_validator');

module.exports = {
  signup,
  checkEmail,
  checkNickname,
};
