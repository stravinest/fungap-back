import { Request, Response } from 'express';
import { User } from '../../models';

const situationSearchFunc = async (req: Request, res: Response) => {
  try {
    const userId: number = res.locals.userId;
    const users: User[] = await User.findAll({});
    const userCount: number = await User.count({});

    res.json({ result: 'success', users, userCount });
  } catch (err) {
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

export default situationSearchFunc;
