import { Request, Response } from 'express';
import { Board } from '../../models';
import { IBoard } from '../../interface/board';

const writeBoardFunc = async (req: Request, res: Response) => {
  try {
    const userId: number = res.locals.userId;
    const { board_title, board_image, board_desc, board_content }: IBoard =
      req.body;

    await Board.create({
      user_id: userId,
      board_title,
      board_image,
      board_desc,
      board_content,
    });

    res.json({ result: 'success' });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 작성에 실패했습니다.',
    });
  }
};

export default writeBoardFunc;
