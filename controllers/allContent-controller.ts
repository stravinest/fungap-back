import { Board, Game } from '../models';
import { Request, Response } from 'express';
import { any } from 'joi';

const allContent = async (req: Request, res: Response) => {
  try {
    const async_board_list = Board.findAll({
      attributes: ['board_id', 'board_title', 'board_image'],
      order: [['createdAt', 'DESC']],
      limit: 6,
    });

    const async_game_list = Game.findAll({
      attributes: ['game_id', 'game_title', 'game_quest1', 'game_quest2'],
      order: [['createdAt', 'DESC']],
      limit: 6,
    });
    const promises: any = [async_board_list, async_game_list];
    Promise.all(promises).then((result) => {
      res.status(200).json({
        board_list: result[0],
        game_list: result[1],
      });
    });
  } catch (error) {
    res.status(400).json({
      result: 'fail',
      errormessage: '에러발생',
    });
  }
};

export { allContent };
