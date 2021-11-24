import { Game_comment } from '../models';
import { getComments } from '../utils/getGameComments';
import { Request, Response, NextFunction } from 'express';

//댓글등록
const writeComment = async (req:Request, res:Response) => {
  try {
    const user_id = res.locals.userId;
    const { game_id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      console.log('커멘트 없음');
      res.status(400).json({ result: 'fail', errormessage: '내용입력하세요' });
      return;
    }

    await Game_comment.create({
      user_id: user_id,
      game_id: game_id,
      game_comment: comment,
    });

    const comments = await getComments(Number(game_id));
    console.log(comments);
    res.status(200).json({ result: 'success', comments });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '게시글이 없거나 댓글 등록 할수 없습니다.',
    });
  }
};
//댓글삭제
const deleteComment = async (req:Request, res:Response) => {
  try {
    const user_id = res.locals.userId;
    const { game_id, game_comment_id } = req.params;
    const isComment = await Game_comment.findOne({
      //내가 쓴 comment 인지 확인
      where: {
        game_id: game_id,
        game_comment_id: game_comment_id,
        user_id: user_id,
      },
    });
    if (isComment) {
      console.log(isComment);
      if (isComment.game_comment_delete_code !== 1) {
        //삭제 된게 아니면
        // //내가 쓴 comment 이면 수정가능
        await Game_comment.update(
          //del code 숫자 수정
          {
            game_comment_delete_code: 1,
          },
          {
            where: {
              game_id: game_id,
              game_comment_id: game_comment_id,
              user_id: user_id,
            },
          }
        );
        res.status(200).json({ result: 'success', game_comment_id });
      } else {
        res
          .status(204)
          .json({ result: 'fail', errormessage: '이미 삭제되었습니다.' });
      }
    } else {
      //내가쓴게 아니므로//내가 쓴게 아니거나 커멘트가 없거나

      res.status(202).json({
        result: 'false',
        errormessage: '삭제할수 없는 comment입니다.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '댓글삭제  실패.',
    });
  }
};
//댓글수정
const editComment = async (req:Request, res:Response) => {
  try {
    const user_id = res.locals.userId; //임의로 user_id 1이 로그인 하였음
    const { game_id, game_comment_id } = req.params;
    const { comment } = req.body;
    console.log(game_id, game_comment_id);
    const isComment = await Game_comment.findOne({
      //내가 쓴 comment 인지 확인
      where: {
        game_id: game_id,
        game_comment_id: game_comment_id,
        user_id: user_id,
      },
    });
    if (isComment) {
      //내가 쓴게 맞으면
      console.log(isComment);
      if (isComment.game_comment_delete_code !== 1) {
        //삭제 된게 아니면

        await Game_comment.update(
          {
            game_comment: comment,
          },
          {
            where: {
              game_id: game_id,
              game_comment_id: game_comment_id,
              user_id: user_id,
            },
          }
        );
        res.status(200).json({ result: 'success' });
      } else {
        res
          .status(400)
          .json({ result: 'fail', errormessage: '이미삭제되었습니다.' });
      }
    } else {
      //내가 쓴게 아니면
      res
        .status(400)
        .json({ result: 'fail', errormessage: '수정할수없는 comment입니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '댓글수정  실패.',
    });
  }
};
export {
  deleteComment,
  writeComment,
  editComment,
};
