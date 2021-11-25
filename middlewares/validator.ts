import { loginSchema } from '../validators/login_validator';
import { signupSchema } from '../validators/signup_validator';
import { userEditSchema } from '../validators/mypage_edit_validator';
import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

//--- 2. validators 경로 내 index 파일을 불러와 파라미터로 받은 항목이 있는지 체크한다 ---
export function Validator(validator:string) {
  return async function (req:Request, res:Response, next:NextFunction) {
    try {
      console.log('검사중이야');
      console.log(req.body);
      if(validator==='login'){
        const { error, value } = await loginSchema.validate(req.body);
        console.log(value);
        console.log(error);
        if (error) {
          res.status(401).send({
            result: 'fail',
            errorMessage: error.message,
          });
          return;
        }
        console.log('검사완료');
        next();
      }
      if(validator==='signup'){
        const { error, value } = await signupSchema.validate(req.body);
        console.log(value);
        console.log(error);
        if (error) {
          res.status(401).send({
            result: 'fail',
            errorMessage: error.message,
          });
          return;
        }
        console.log('검사완료');
        next();
      }
      if(validator==='userEdit'){
        const { error, value } = await userEditSchema.validate(req.body);
        console.log(value);
        console.log(error);
        if (error) {
          res.status(401).send({
            result: 'fail',
            errorMessage: error.message,
          });
          return;
        }
        console.log('검사완료');
        next();
      }
      res.status(401).send({
        result: 'fail',
        errorMessage: 'validator 오류'
      });
      return;
      
    } catch (err:any) {
      if (err.isJoi)
        res.status(401).send({
          result: 'fail',
          errorMessage: '입력정보를 다시 확인해주세요.',
        });
    }
  };
};
