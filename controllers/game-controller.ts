import { Game_count, User, Game_like, Game } from '../models';
import {
  gameAllLogin,
  gameAll,
  gameAllViewLogin,
  gameAllView,
  gameAllPopLogin,
  gameAllPop,
  gameDetailLogin,
  gameDetail,
  gameQuest1,
  gameQuest1All,
  gameQuest2,
  gameQuest2All,
  gameCommentsAll,
} from '../utils/gameQuery';
import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { getComments } from '../utils/gameCommentQuery';

//전체게임조회(최신순)
const getGameAll = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      const game_list = await gameAllLogin(user_id);
      res.status(200).json({ result: 'success', game_list });
    } else {
      const game_list = await gameAll();
      res.status(201).json({ result: 'success', game_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
//전체게임조회(조회수순)
const getGameAllView = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      const game_list = await gameAllViewLogin(user_id);
      res.status(200).json({ result: 'success', game_list });
    } else {
      const game_list = await gameAllView();
      res.status(201).json({ result: 'success', game_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
//전체게임조회(인기순)
const getGameAllPop = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      const game_list = await gameAllPopLogin(user_id);
      res.status(200).json({ result: 'success', game_list });
    } else {
      const game_list = await gameAllPop();
      res.status(201).json({ result: 'success', game_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

//세부게임조회
const getGameDetail = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    const { game_id } = req.params;
    console.log('유저로그인', user_id);
    type Objtype = {
      [index: string]: string | number;
    };
    if (req.cookies['f' + game_id] == undefined) {
      res.cookie('f' + game_id, getUserIP(req), {
        maxAge: 720000, //12분
        // maxAge: 1200000,
      });
      await Game.increment({ game_view_count: +1 }, { where: { game_id } });
    }

    const isGame = await Game.findOne({
      where: { game_id: game_id },
    });

    if (!isGame || isGame.game_delete_code == 1) {
      res.status(400).json({
        result: 'fail',
        errormessage: '게임이 없거나  조회 할수 없습니다.',
      });
      return;
    }

    if (user_id) {
      const game_array = await gameDetailLogin(
        Number(user_id),
        Number(game_id)
      );
      const game = game_array[0];
      console.log(game);

      const game_quest1_mbti: any = await gameQuest1(Number(game_id));
      const game_quest1_all = await gameQuest1All(Number(game_id));

      if (!game_quest1_all) {
        console.log('여기');
      }
      console.log(game_quest1_all[0]);
      const mbti: Objtype = {};
      for (let i = 0; i < game_quest1_mbti.length; i++) {
        mbti[game_quest1_mbti[i].user_mbti] = game_quest1_mbti[i].count;
      }
      const game_quest1 = {
        ...mbti,
        ...game_quest1_all[0],
      };

      const game_quest2_mbti: any = await gameQuest2(Number(game_id));
      const game_quest2_all = await gameQuest2All(Number(game_id));

      const mbti2: Objtype = {};
      for (let i = 0; i < game_quest2_mbti.length; i++) {
        mbti2[game_quest2_mbti[i].user_mbti] = game_quest2_mbti[i].count;
      }
      const game_quest2 = {
        ...mbti2,
        ...game_quest2_all[0],
      };
      console.log(game_quest2_all);

      res
        .status(200)
        .json({ result: 'success', game, game_quest1, game_quest2 });
    } else {
      //비로그인시
      const game_array = await gameDetail(Number(game_id));
      const game = game_array[0];

      const game_quest1_mbti: any = await gameQuest1(Number(game_id));
      const game_quest1_all = await gameQuest1All(Number(game_id));
      console.log('게임퀘스트', game_quest1_mbti);

      const mbti: Objtype = {};
      for (let i = 0; i < game_quest1_mbti.length; i++) {
        mbti[game_quest1_mbti[i].user_mbti] = game_quest1_mbti[i].count;
      }
      console.log(mbti);
      const game_quest1 = {
        ...mbti,
        ...game_quest1_all[0],
      };

      const game_quest2_mbti: any = await gameQuest2(Number(game_id));
      const game_quest2_all = await gameQuest2All(Number(game_id));
      console.log(game_quest2_all[0]);

      const mbti2: Objtype = {};
      for (let i = 0; i < game_quest2_mbti.length; i++) {
        mbti2[game_quest2_mbti[i].user_mbti] = game_quest2_mbti[i].count;
      }
      const game_quest2 = {
        ...mbti2,
        ...game_quest2_all[0],
      };

      res
        .status(201)
        .json({ result: 'success', game, game_quest1, game_quest2 });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

function getUserIP(req: Request) {
  console.log(req.headers);
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return addr;
}

//게임댓글 조회
const getGameComment = async (req: Request, res: Response) => {
  try {
    const { game_id } = req.params;
    const comments = await getComments(Number(game_id));
    console.log(comments);
    res.status(200).json({ result: 'success', comments });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '게시글이 없거나 댓글 조회 할수 없습니다.',
    });
  }
};

//게임등록
const writeGame = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    const { game_title, game_desc, game_quest1, game_quest2 } = req.body;

    if (game_title && game_desc && game_quest1 && game_quest2) {
      //전부다 있는경우
      await Game.create({
        user_id: user_id,
        game_title: game_title,
        game_desc: game_desc,
        game_quest1: game_quest1,
        game_quest2: game_quest2,
      });
      res.status(200).json({ result: 'success' });
      return;
    }

    res
      .status(400)
      .json({ result: 'fail', errormessage: '전부입력하셔야 합니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '.',
    });
  }
};

//게임수정
const editGame = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId; //임의로 user_id 1이 로그인 하였음
    const { game_title, game_desc, game_quest1, game_quest2 } = req.body;
    const { game_id } = req.params;

    if (game_title && game_desc && game_quest1 && game_quest2) {
      const isGame = await Game.findOne({
        where: { game_id: game_id, user_id: user_id },
      });

      if (isGame) {
        //게임이 있으면
        if (isGame.game_delete_code !== 1) {
          //삭제 된게 아니면

          await Game.update(
            {
              game_title: game_title,
              game_desc: game_desc,
              game_quest1: game_quest1,
              game_quest2: game_quest2,
            },
            {
              where: {
                game_id: game_id,
              },
            }
          );
          res.status(200).json({ result: 'success' });
        } else {
          //이미 삭제 된 game
          res
            .status(204)
            .json({ result: 'fail', errormessage: '이미삭제되었습니다.' });
        }
      } else {
        //해당 게임이 없다면
        res
          .status(400)
          .json({ result: 'fail', errormessage: '수정할수없는 game입니다.' });
      }
      return;
    }
    res
      .status(400)
      .json({ result: 'fail', errormessage: '전부입력하셔야 합니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '댓글수정  실패.',
    });
  }
};

//게임삭제
const deleteGame = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    const { game_id } = req.params;
    const isGame = await Game.findOne({
      //내가 쓴 game 인지 확인
      where: { game_id: game_id, user_id: user_id },
    });
    if (isGame) {
      //game 이 있으면
      if (isGame.game_delete_code !== 1) {
        //삭제 된게 아니면
        // //내가 쓴 comment 이면 수정가능
        await Game.update(
          //del code 숫자 수정
          {
            game_delete_code: 1,
          },
          {
            where: {
              game_id: game_id,
            },
          }
        );
        res.status(200).json({ result: 'success' });
      } else {
        res
          .status(204)
          .json({ result: 'fail', errormessage: '이미 삭제되었습니다.' });
      }
    } else {
      //내가쓴게 아니므로//내가 쓴게 아니거나 게임이 없거나

      res.status(202).json({
        result: 'false',
        errormessage: '삭제할수 없는 game입니다.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: 'game삭제  실패.',
    });
  }
};

//게임참여 선택!
const selectGame = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    const { game_id } = req.params;
    const { game_quest } = req.body;

    //독립적임 promise all 해주자
    const isGame = await Game_count.findOne({
      where: { user_id: user_id, game_id: game_id },
    });

    const isUser = await User.findOne({
      //내가 쓴 game 인지 확인
      where: { user_id: user_id },
    });

    if (isGame) {
      //만약 이미 투표를 했었더라면
      if (isGame.game_quest == game_quest) {
        //똑같은 투표가 있을때
        await Game_count.destroy({
          where: { user_id: user_id, game_id: game_id, game_quest: game_quest },
        });
        res
          .status(200)
          .json({ result: 'success', errormessage: '기존투표 제거' });
      } else {
        //다른 투표를 했을때
        await Game_count.update(
          {
            game_quest: game_quest,
          },
          {
            where: { user_id: user_id, game_id: game_id },
          }
        );
        res
          .status(200)
          .json({ result: 'success', errormessage: '기존투표 제거' });
      }
      return;
    }

    if (!isUser) {
      res
        .status(400)
        .json({ result: 'fail', errormessage: 'user정보 없습니다.' });
      return;
    }
    if (!isUser.user_mbti) {
      res
        .status(400)
        .json({ result: 'fail', errormessage: 'user정보에 mbti가 없습니다.' });
      return;
    }

    if (game_quest) {
      //선택이 있는경우
      await Game_count.create({
        user_id: user_id,
        game_id: game_id,
        user_mbti: isUser.user_mbti,
        game_quest: game_quest,
      });
      res.status(200).json({ result: 'success' });
      return;
    }

    res
      .status(400)
      .json({ result: 'fail', errormessage: '선택을 안했습니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '선택된 game이 잘못되었습니다.',
    });
  }
};

const likeGame = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId;
    const { game_id } = req.params;
    console.log('like user', user_id);
    if (user_id) {
      const isLike = await Game_like.findOne({
        where: {
          [Op.and]: { game_id: game_id, user_id: user_id },
        },
      });
      //isLike 가 있으면 delete 없으면 create
      if (isLike) {
        await Game_like.destroy({
          where: {
            [Op.and]: { game_id: game_id, user_id: user_id },
          },
        });
        res.status(200).json({ result: 'success', like_state: false });
      } else {
        const isGame = await Game.findOne({
          //찍고자하는 게시물이 있는지 검사
          where: {
            game_id: game_id,
          },
        });

        if (isGame === null) {
          res
            .status(400)
            .json({ result: 'fail', errormessage: '게임이 없습니다.' });
          return;
        }
        await Game_like.create({
          user_id: user_id,
          game_id: game_id,
        });
        res.status(200).json({ result: 'success', like_state: true });
      }
    } else {
      console.log('여기로 안들어와?');
      res.status(402).json({ result: 'fail', msg: '로그인이 필요합니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormessage: '좋아요 변경 실패';
    });
  }
};

export {
  getGameAll,
  getGameDetail,
  getGameAllView,
  getGameAllPop,
  getGameComment,
  writeGame,
  editGame,
  deleteGame,
  selectGame,
  likeGame,
};
