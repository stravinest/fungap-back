const Joi = require('joi');

exports.emailSchema = Joi.object({
  email: Joi.string().email().required(),
}).unknown();

exports.passwordSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,20}$/))
    .required(),
}).unknown();

//회원가입 joi validation
exports.signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,20}$/))
    .required(),
  passwordConfirm: Joi.string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,20}$/))
    .required(),
});
