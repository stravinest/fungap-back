import { sequelize } from '../models';
import * as Sequelize from 'sequelize';
import { Client } from '@elastic/elasticsearch';
import { errors } from '@elastic/elasticsearch';
import { Request, Response, NextFunction } from 'express';

const client = new Client({
  node: process.env.elastic_node,
  auth: {
    username: process.env.elastic_username!,
    password: process.env.elastic_password!,
    //log: 'trace',
  },
});

const homeSearchFunc = async (req:Request, res:Response) => {
  try {
    const user_id = res.locals.userId;
    const { keyword } = req.query;
    console.log(keyword);
    const keywords = String(keyword).split(' ');

    const board_list = await client.search({
      index: 'fungapsearch',
      body: {
        query: {
          multi_match: {
            query: `${keywords}`,
            fields: ['board_title', 'board_desc', 'board_content'],
          },
        },
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
      (board:any) => board._source
    );

    res.json({ result: 'success', search_board_list: search_board_list });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

export {homeSearchFunc};
