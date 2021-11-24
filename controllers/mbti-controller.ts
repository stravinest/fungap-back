import { Celebrity, Mbti_relationship } from '../models';
import { Op } from 'sequelize';
import { Request, Response } from 'express';

//유명인 검색 안쓸거 같아서 일단 주석처리 했습니다
// const mbtiCelebrity = async (req, res) => {
//   try {
//     const { mbti } = req.body;
//     const mbti_celebrity = await Celebrity.findOne({
//       attributes: ['celebrity_name', 'celebrity_image', 'celebrity_mbti'],
//       where: { celebrity_mbti: mbti },
//     });
//     if (!mbti_celebrity) {
//       res.status(204).json({
//         result: 'fail',
//         errormessage: '해당 MBTI의 연예인이 없습니다..',
//       });
//       return;
//     }
//     console.log(mbti_celebrity);

//     res.status(200).json({ result: 'success', mbti_celebrity });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       result: 'fail',
//       errormessage: '연예인 검색 실패.',
//     });
//   }
// };

//mbti 궁합테스트
const mbtiTest = async (req: Request, res: Response) => {
  try {
    const { mbti, other_mbti } = req.body;
    const mbti_test = await Mbti_relationship.findOne({
      attributes: ['score', 'content'],
      where: { [Op.and]: [{ my_mbti: mbti }, { other_mbti: other_mbti }] },
    });
    if (!mbti_test) {
      res.status(204).json({
        result: 'fail',
        errormessage: '해당 MBTI  없습니다..',
      });
      return;
    }
    console.log(mbti_test);

    res.status(200).json({ result: 'success', mbti_test });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: 'mbti관계 실패',
    });
  }
};

export {
  mbtiTest,
  // mbtiCelebrity,
};
