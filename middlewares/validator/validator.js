const Joi = require('joi');
const validate = require("./unit/joi");
const printError = require('./unit/error');

exports.signUp = async (req, res, next) => {
  try {
    const { email, password, confirm_password, nickname, user_image, user_mbti } =
      await validate.validatorSchema.validateAsync(req.body);
      res.locals={ email, password, nickname, user_image, user_mbti }

      next();

  } catch (err) {
    printError(req, err);
    res.status(400).send({ msg: "fail", error: err.message });
  }
}

exports.email = async (req, res, next) => {
  try {
    const { email } = await validate.emailSchema.validateAsync(req.body);
  res.locals = { email }
  next();
  } catch (err) {
    printError(req, err);
    res.status(400).send({ msg: "fail", error: err.message });
  }
  
}

exports.nickname = async (req, res, next) => {
  try {
    const { nickname } = await validate.emailSchema.validateAsync(req.body);
  res.locals = { nickname }
  next();
  } catch (err) {
    printError(req, err);
    res.status(400).send({ msg: "fail", error: err.message });
  }
  
}