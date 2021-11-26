import { Board, Game } from '../models';
import { Request, Response } from 'express';

const allContent = async (req: Request, res: Response) => {
  try {
    // //비동기 (promise all)
    const async_board_list = Board.findAll({
      attributes: ['board_id', 'board_title', 'board_image'],
      order: [['createdAt', 'DESC']],
      where: { board_delete_code: 0 },
      limit: 6,
    });

    const async_game_list = Game.findAll({
      attributes: ['game_id', 'game_title', 'game_quest1', 'game_quest2'],
      order: [['createdAt', 'DESC']],
      where: { game_delete_code: 0 },
      limit: 6,
    });
    const promises: any = [async_board_list, async_game_list];
    Promise.all(promises).then((result) => {
      res.status(200).json({
        board_list: result[0],
        game_list: result[1],
      });
    });

    //동기적 (await))
    // const async_board_list =await Board.findAll({
    //   attributes: ['board_id', 'board_title', 'board_image'],
    //   order: [['createdAt', 'DESC']],
    //   limit: 6,
    // });

    // const async_game_list =await Game.findAll({
    //   attributes: ['game_id', 'game_title', 'game_quest1', 'game_quest2'],
    //   order: [['createdAt', 'DESC']],
    //   limit: 6,
    // });

    //   res.status(200).json({
    //     board_list: async_board_list,
    //     game_list: async_game_list,
    //   });
  } catch (error) {
    res.status(400).json({
      result: 'fail',
      errormessage: '에러발생',
    });
  }
};

export { allContent };
