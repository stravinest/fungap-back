import { NextFunction, Request, Response } from 'express';
import { GoogleReq } from '../interface/socialLogin';
import axios from 'axios';

exports.getGoogleUser = async (
  req: GoogleReq,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.body;
  console.log(access_token);

  try {
    const Authorization = `Bearer ${access_token}`;
    const profile = await axios({
      method: 'get',
      url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization,
      },
    });

    req.google = profile.data;
    //console.log(profile.data);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
