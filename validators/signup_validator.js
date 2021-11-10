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
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .min(8)
    .required()
    .label('Password')
    .messages({
      'string.pattern.base': `비밀번호는 최소 8 자이상, 최소 하나의 문자 및 하나의 숫자 :`,
      'string.min': `최소 8자 이상이어야 합니다.`,
      'string.empty': `"a" cannot be an empty field`,
      'any.required': `"a" is a required field`,
      'string.base': `"a" should be a type of 'text'`,
    }),
  confirm_password: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({
      'any.only': '비밀번호가 일치하지 않습니다.',
      'string.empty': `"a" cannot be an empty field`,
      'any.required': `"a" is a required field`,
      'string.base': `"a" should be a type of 'text'`,
    }),
}).unknown();

module.exports = signupSchema;
