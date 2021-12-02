import { Client, RequestParams } from '@elastic/elasticsearch';
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
      index: 'fungapsearch',
      body: {
        query: {
          bool: {
            must:
              {multi_match:{
                  query:`${keywords}`,
                  fields: ["board_title.nori_discard","board_desc.nori_discard","board_content.nori_discard"]
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

    await client.index({
      index: 'search-logs',
      body: {
        keywords: `${keywords}`,
        timestamp: new Date(),
      },
    });

    res.json({ result: 'success', search_board_list: search_board_list });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

export { homeSearchFunc };
