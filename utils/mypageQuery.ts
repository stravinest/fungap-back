import { sequelize } from '../models';
import * as Sequelize from 'sequelize';

// 유저 delete_code 1
export const deleteUser = async (userId: number) => {
  const deleteUserQuery = `UPDATE users As u 
        SET u.user_delete_code = 1
      WHERE u.user_id = ${userId}`;

  await sequelize.query(deleteUserQuery, {
    type: Sequelize.QueryTypes.UPDATE,
  });
};

// 유저가 쓴 코멘트 delete_code 1
export const deleteUserComment = async (userId: number) => {
  const deleteCommentQuery = `UPDATE comments AS c
      LEFT OUTER JOIN users AS u ON c.user_id = u.user_id
        SET c.comment_delete_code = 1 
      WHERE (c.user_id = ${userId})`;

  await sequelize.query(deleteCommentQuery, {
    type: Sequelize.QueryTypes.UPDATE,
  });
};

// 유저가 한 좋아요 삭제
export const deleteUserLike = async (userId: number) => {
  const deleteLikeQuery = `DELETE l
      FROM likes AS l
      LEFT OUTER JOIN users AS u ON l.user_id = u.user_id
      WHERE u.user_id = ${userId}`;

  await sequelize.query(deleteLikeQuery, {
    type: Sequelize.QueryTypes.DELETE,
  });
};

// 유저가 좋아요 한 글 목록 조회
export const selectLikedBoardList = async (userId: number) => {
  const query = `SELECT b.board_id, b.board_title,b.board_content,b.view_count,b.board_image, count(l.board_id) as likeCnt,count(c.board_id) as commentCnt,
    CASE lb.board_id
    WHEN b.board_id THEN 'true'
    ELSE 'false'
    END AS like_state
    
        FROM database_final_project.boards AS b
        LEFT OUTER JOIN database_final_project.comments AS c
        ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
        LEFT OUTER JOIN database_final_project.likes AS l
        ON b.board_id = l.board_id
        LEFT OUTER JOIN database_final_project.likes AS lb
        ON (b.board_id = lb.board_id AND lb.user_id = ${userId})
        WHERE b.board_id = lb.board_id
        GROUP BY b.board_id
        
        ORDER BY b.createdAt DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};

//유저가 만든 게임
export const selectMyGameList = async (userId: number) => {
  const query = `SELECT * FROM database_final_project.games
  WHERE user_id = ${userId}
  ORDER BY createdAt DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
