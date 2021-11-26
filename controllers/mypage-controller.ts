import { Board, User, Like, Comment } from '../models';
import { sequelize } from '../models';
import * as Sequelize from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import {
  deleteUser,
  deleteUserComment,
  deleteUserLike,
  selectLikedBoardList,
  selectMyGameList,
} from '../utils/mypageQuery';

//유저 정보 조회
const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userInfo.userId;
    const provider = res.locals.userInfo.provider;

    const userInfo = await User.findOne({
      where: { user_id: userId, provider: provider },
    });
    res.status(200).json({
      result: 'success',
      user: {
        nickname: userInfo?.nickname,
        user_image: userInfo?.user_image,
        user_mbti: userInfo?.user_mbti,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//유저 정보 수정
const patchUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userInfo.userId;
    const provider = res.locals.userInfo.provider;

    const resNickname = req.body.nickname;
    const resUserImage = req.body.user_image;
    const resUserMbti = req.body.user_mbti;

    const userInfo = await User.findOne({
      where: { user_id: userId, provider: provider },
    });
    await User.update(
      {
        nickname: resNickname,
        user_image: resUserImage,
        user_mbti: resUserMbti,
      },
      { where: { user_id: userId } }
    );

    res.status(200).json({
      result: 'success',
      user: {
        nickname: resNickname,
        user_image: resUserImage,
        user_mbti: resUserMbti,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//유저 탈퇴
const deleteUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userInfo.userId;
    const provider = res.locals.userInfo.provider;

    const userInfo = await User.findOne({
      where: { user_id: userId, provider: provider },
    });

    await userInfo?.update({ user_delete_code: 1 });

    //유저 삭제
    deleteUser(userId);
    //유저 댓글 삭제
    deleteUserComment(userId);
    //유저 좋아요 삭제
    deleteUserLike(userId);

    res.status(200).json({
      result: 'success',
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//유저가 좋아요한 리스트
const likedBoardList = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userInfo.userId;

    const likedBoardList = selectLikedBoardList(userId);

    res.status(200).json({
      result: 'success',
      likedBoardList,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

const getMyGameList = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const myGameList = selectMyGameList;

    res.status(200).json({
      result: 'success',
      myGameList,
    });
  } catch (err) {
    console.error(err);
  }
};

export {
  getUserInfo,
  patchUserInfo,
  deleteUserInfo,
  likedBoardList,
  getMyGameList,
};
