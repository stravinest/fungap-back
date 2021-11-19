//로직적 오류가 있다.(타입오류 스트링 * 숫자) 점검할 것 페이징 처리 현재 미사용중으로 알고 있다.(변경될 예정일 듯)
//allboard_list에 대한 인터페이스가 필요

export const getPageNum = async function (
  page: string,
  allboard_list: object[]
) {
  console.log(page);
  const perPage = 5;
  const allPage = parseInt(page) * perPage;
  const pageNum = parseInt(page, 10);
  console.log(pageNum);
  let start_num = 0;
  let last_num = 0;
  if (pageNum === 1) {
    start_num = 0;
    last_num = perPage;
  } else {
    (start_num = (pageNum - 1) * perPage), //3
      (last_num = pageNum * perPage);
  }
  console.log(allboard_list.length);

  if (allboard_list.length < allPage) {
    last_num = allboard_list.length;
  }
  const board_list = [];
  for (let i = start_num; i < last_num; i++) {
    board_list.push(allboard_list[i]);
  }

  return board_list;
  // return new_board_list;
};
