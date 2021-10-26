const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': `메일형식이 잘못되었습니다.`,
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `"a" is a required field`,
    'string.base': `"a" should be a type of 'text'`,
  }),
  nickname: Joi.string().required().messages({
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `"a" is a required field`,
    'string.base': `"a" should be a type of 'text'`,
  }),
  user_mbti: Joi.string().required().messages({
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `"a" is a required field`,
    'string.base': `"a" should be a type of 'text'`,
  }),
  password: Joi.string().min(4).required().label('Password').messages({
    'string.min': `최소 네자리 수 이상이어야 합니다.`,
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `"a" is a required field`,
    'string.base': `"a" should be a type of 'text'`,
  }),
  confirm_password: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({
      'any.only': '{{#label}} does not match',
      'string.empty': `"a" cannot be an empty field`,
      'any.required': `"a" is a required field`,
      'string.base': `"a" should be a type of 'text'`,
    }),
}).unknown();

module.exports = signupSchema;
