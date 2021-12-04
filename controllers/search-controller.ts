import { Client, RequestParams } from '@elastic/elasticsearch';
import { sequelize } from '../models';
import * as Sequelize from 'sequelize';
import { errors } from '@elastic/elasticsearch';
import { Request, Response } from 'express';

const client = new Client({
  node: 'http://34.64.168.183:9200',
  auth: {
    username: process.env.elastic_username!,
    password: process.env.elastic_password!,
    //log: 'trace',
  },
});

const homeSearchFunc = async (req: Request, res: Response) => {
  try {
    const user_id: number = res.locals.userId;
    const { keyword } = req.query;
    let keywords: string[] = [];
    if (keyword && typeof keyword === 'string') {
      console.log(keyword);
      keywords = String(keyword).split(' ');
    }

    const board_list = await client.search({
      index: 'fungapsearch*',
      body: {
        query: {
          bool: {
            must:
              {multi_match:{
                  query:`${keywords}`,
                  fields: ["board_title.nori_discard","board_desc.nori_discard","board_content.nori_discard","game_title"]
                }},
            should: [{
                match:{
                  "board_title.nori_discard": `${keywords}`
                }},{
                match:{
                  "board_desc.nori_discard": `${keywords}`
                }}]
              }
              
            }
      },
    });

    for (let i = 0; i < board_list.body.hits.hits.length; i++) {
      if (board_list.body.hits.hits[i]._source.liked_users.includes(user_id)) {
        board_list.body.hits.hits[i]._source.like_state = true;
      } else {
        board_list.body.hits.hits[i]._source.like_state = false;
      }
    }

    const search_board_list = board_list.body.hits.hits.map(
      (board: any) => board._source
    );

    // await client.index({
    //   index: 'search-logs',
    //   body: {
    //     keywords: `${keywords}`,
    //     timestamp: new Date(),
    //   },
    // });

    res.json({ result: 'success', search_board_list: search_board_list });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

const LikeSearchFunc = async (req: Request, res: Response) => {
  try {
    const user_id: number = res.locals.userId;
    const { keyword } = req.query;
    let keywords: string[] = [];
    if (keyword && typeof keyword === 'string') {
      console.log(keyword);
      keywords = keyword.split(' ');
    }
    // const user_id = req.userId
    // const {keyword} = req.query;
    // console.log(keyword)
    // const keywords = keyword.split(' ')
    const list_keywords = []
    
    for (let i = 0; i < keywords.length; i++) {
      if (i == 0) {
        list_keywords.push(
          `t1.board_title LIKE '%${keywords[i]}%' OR t1.board_content LIKE '%${keywords[i]}%'`
        )
      } else {
        list_keywords.push(
          `OR t1.board_title LIKE '%${keywords[i]}%' OR t1.board_content LIKE '%${keywords[i]}%'`
        )
      }
    }
    
    const newlist_keywords = list_keywords.toString().replace(/,/g, "");
       
    const query = `
    select t1.board_id, t1.board_title, t1.board_image, t1.board_desc, t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_content,b.board_image, b.board_desc, b.view_count,count(l.board_id) as like_count

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
  on b.board_id = u.board_id and u.user_id = '${user_id}'
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  where ${newlist_keywords}`;

    const search_board_list = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
  res.json({ result: 'success', search_board_list });
} catch (err) {
  console.log(err)
  res.status(400).send({
    msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
  });
}
};

const fullTextSearchFunc = async (req: Request, res: Response) => {
  try {
    const user_id: number = res.locals.userId;
    const { keyword } = req.query;
    let keywords: string[] = [];
    if (keyword && typeof keyword === 'string') {
      console.log(keyword);
      keywords = keyword.split(' ');
    }
    // const user_id = req.userId;
    // const { keyword } = req.query;
    // console.log(keyword);
    // const keywords = keyword.split(' ');
    
           
        
    const query = `
      select t1.board_id, t1.board_title, t1.board_image, t1.board_desc, t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
    (SELECT b.board_id,b.board_title,b.board_content,b.board_image, b.board_desc, b.view_count,count(l.board_id) as like_count
 
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
    on b.board_id = u.board_id and u.user_id = '${user_id}'
    group by b.board_id
    ORDER BY b.createdAt DESC) as t2
    join
    (SELECT * FROM boards WHERE MATCH (board_title,board_desc) AGAINST ('${keywords}' IN NATURAL LANGUAGE MODE)) as t3
    on t1.board_id = t2.board_id and t2.board_id = t3.board_id`;

    const search_board = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    
    
    res.json({ result: 'success', search_board_list:search_board });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
}



export {
  homeSearchFunc,
  LikeSearchFunc,
  fullTextSearchFunc,
  
};