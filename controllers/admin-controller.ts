import { User, Board, sequelize, Comment, Like } from '../models';
import * as Sequelize from 'sequelize';
import { Request, Response } from 'express';

const writeBoardFunc = async (req:Request, res:Response) => {
  try {
    const userId = res.locals.userId;
    const { board_title, board_image, board_desc, board_content } = req.body;

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

const getUserFunc = async (req:Request, res:Response) => {
  try {
    const userId = res.locals.userId;
    const users = await User.findAll({});
    const userCount = await User.count({});

    res.json({ result: 'success', users, userCount });
  } catch (err) {
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

const getCommentFunc = async (req:Request, res:Response) => {
  try {
    const user_id = res.locals.userId;

    const users = await User.findOne({
      where: user_id,
      include: [{ model: Comment }, { model: Like }],
    });
    console.log(
      '-----------------------------------------------------------------------------'
    );
    console.log(users);
    console.log(
      '-----------------------------------------------------------------------------'
    );
    // console.log(users.dataValues)
    
    
    // console.log(await users.getLikes({ where: { [Op.in]: user_id } }));
    // console.log(await users.countComments(), '요기다 욘석아!');
    const userCount = await User.count({});

    res.json({ result: 'success', users, userCount });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

const getBoardFunc = async (req:Request, res:Response) => {
  try {
    const user_id = res.locals.userId;

    const query = `
      select t1.board_id, t1.board_title, t1.board_image,t1.board_desc, t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
      (SELECT b.board_id,b.board_title,b.board_image,b.board_desc, b.board_content, b.view_count,count(l.board_id) as like_count
   
      FROM boards AS b
      left OUTER JOIN likes AS l
      ON b.board_id = l.board_id
      WHERE b.board_delete_code = 0
      GROUP BY b.board_id
      ORDER BY b.createdAt DESC) as t1
      join
    
      (select b.board_id, count(c.board_id) as comment_count,
  
      case u.board_id
      when b.board_id then 'true'
      else 'false'
      end as like_state
      FROM boards AS b
      LEFT OUTER JOIN comments AS c
      ON (b.board_id = c.board_id AND c.comment_delete_code=0)
      left outer join likes as u
      on b.board_id = u.board_id and u.user_id = ${user_id}
      group by b.board_id
      ORDER BY b.createdAt DESC) as t2
      on t1.board_id = t2.board_id`;
    const board_list = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log(board_list);
    res.status(200).json({ result: 'success', board_list });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

const editBoardFunc = async (req:Request, res:Response) => {
  try {
    const userId = res.locals.userId;
    const { board_id } = req.params;
    const { board_title, board_image, board_desc, board_content } = req.body;

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

const detailBoardFunc = async (req:Request, res:Response) => {
  try {
    const user_id = res.locals.userId;
    const { board_id } = req.params;

    const query = `
      select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state, JSON_ARRAYAGG(JSON_OBJECT('comment_id', t3.comment_id,'comment', t3.comment, 'user_id',t3.user_id, 'user_image', t3.user_image, 'user_mbti', t3.user_mbti, 'nickname', t3.nickname,'board_id',t3.board_id)) as comments from
      (SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(distinct l.board_id) as like_count,c.comment
      FROM boards AS b
      left OUTER JOIN likes AS l
      ON b.board_id = l.board_id
      left OUTER JOIN comments AS c
      ON b.board_id = c.board_id
      WHERE b.board_delete_code = 0
      GROUP BY b.board_id
      ORDER BY b.createdAt DESC) as t1
      join
      (select b.board_id, count(distinct c.comment_id) as comment_count,
      case u.board_id
      when b.board_id then 'true'
      else 'false'
      end as like_state
      FROM boards AS b
      LEFT OUTER JOIN comments AS c
      ON (b.board_id = c.board_id AND c.comment_delete_code=0)
      left outer join likes as u
      on b.board_id = u.board_id and u.user_id = ${user_id}
      group by b.board_id
      ORDER BY b.createdAt DESC) as t2
      left outer join
      (SELECT c.board_id, c.user_id, u.user_image, u.user_mbti, u.nickname, c.comment_id, c.comment
        FROM boards AS b
        left Outer Join users AS u 
        On b.user_id = u.user_id
        left OUTER JOIN comments AS c
        ON b.board_id = c.board_id
        WHERE b.board_delete_code = 0
        ORDER BY b.createdAt DESC) as t3
      on t1.board_id = t2.board_id AND t1.board_id = t3.board_id 
      WHERE t1.board_id = ${board_id}`;
    const board = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json({ result: 'success', board });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 상세를 불러오는데 실패했습니다.',
    });
  }
};

const deleteBoardFunc = async (req:Request, res:Response) => {
  try {
    const userId = res.locals.userId;
    const board_id = req.params;

    await Board.update({ board_delete_code: 1 }, { where: board_id });

    res.json({ result: 'success' });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 삭제에 실패했습니다.',
    });
  }
};

export {
  getBoardFunc,
  writeBoardFunc,
  editBoardFunc,
  deleteBoardFunc,
  detailBoardFunc,
  getUserFunc,
  getCommentFunc,
};
