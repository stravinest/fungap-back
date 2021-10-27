const Joi = require('joi');

const checkEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': `메일형식이 잘못되었습니다.`,
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `"a" is a required field`,
    'string.base': `"a" should be a type of 'text'`,
  }),
}).unknown();

module.exports = checkEmailSchema;
