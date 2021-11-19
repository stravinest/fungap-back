import { Board, Like, User, sequelize } from '../../models';

import * as Sequelize from 'sequelize';
import { Request, Response } from 'express';

const getBoardFunc = async (req: Request, res: Response) => {
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

export default getBoardFunc;
