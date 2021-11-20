import { User, Comment, Like } from '../../models';
import { Op } from 'sequelize';
import { Request, Response } from 'express';

const getCommentFunc = async (req: Request, res: Response) => {
  try {
    const user_id: number = res.locals.userId;

    const users = await User.findOne({
      where: { user_id: user_id },
      include: [{ model: Comment }, { model: Like }],
    });

    const userCount = await User.count({});

    res.json({ result: 'success', users, userCount });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

export default getCommentFunc;
