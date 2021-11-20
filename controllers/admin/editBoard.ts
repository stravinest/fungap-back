import { Request, Response } from 'express';
import { User, Board } from '../../models';
import { Reqbodystring } from '../../interface/request';

const editBoardFunc = async (req: Request, res: Response) => {
  try {
    const userId: number = res.locals.userId;
    const { board_id } = req.params;
    const {
      board_title,
      board_image,
      board_desc,
      board_content,
    }: Reqbodystring = req.body;

    await Board.update(
      { board_title, board_image, board_desc, board_content },
      { where: { board_id } }
    );

    res.json({ result: 'success' });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 수정에 실패했습니다.',
    });
  }
};

export default editBoardFunc;
