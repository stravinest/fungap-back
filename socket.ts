import { Server } from 'socket.io';
import { Chatlog, sequelize } from './models';
import { IChatRoomUserList } from './interface/chat';
import * as http from 'http';
import * as Sequelize from 'sequelize';
import { Ibadwordobjectlist } from './interface/chat';

export default async (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    path: '/socket.io/',
    cors: {
      origin: [
        'http://localhost:3000', // 접근 권한을 부여하는 도메
        'http://fungap.shop',
        'https://localhost:3000',
        'https://fungap.shop',
        'http://velog-clone.shop',
        'https://velog-clone.shop',
      ],
      credentials: true,
    },
  });

  //비속어 목록 불러오기
  const getBadwords = async () => {
    try {
      const badwordlist = await sequelize.query(
        `SELECT badword FROM badwords`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      console.log('비속어 필터링 DB 불러오기 완료');
      return badwordlist;
    } catch (err) {
      console.error(err);
    }
  };

  //비속어가 있는지 체크
  function checkBadword(badwordobjectlist: Ibadwordobjectlist[], msg: string) {
    //비속어만 따로 담을 배열 선언
    let badwordlist = [];

    //오브젝트의 value 값만 badwordlist 배열에 다시 담는다
    for (let i = 0; i < badwordobjectlist.length; i++) {
      badwordlist.push(badwordobjectlist[i].badword);
    }

    const target = msg.split(' ');

    //비속어가 있는지에 대한 결과
    let isExistBadword = false;

    //비속어 목록과 비교해서 있으면 결과를 true로
    for (let i = 0; i < badwordlist.length; i++) {
      if (target.includes(badwordlist[i])) {
        isExistBadword = true;
      }
    }

    return isExistBadword;
  }

  //방의 유저수 알려주는 함수 (소켓 아이디 수 찾는 함수)
  function countRoomUser(roomName: string): number {
    return io.sockets.adapter.rooms.get(roomName)?.size || 0;
  }

  let roomIUserList: IChatRoomUserList[] = [];
  let roomEUserList: IChatRoomUserList[] = [];
  let roomFUserList: IChatRoomUserList[] = [];
  let roomTUserList: IChatRoomUserList[] = [];

  //roomName에 맞는 유저리스트 리턴
  function findChatroomUserList(roomName: string) {
    switch (roomName) {
      case 'I':
        return roomIUserList;
      case 'E':
        return roomEUserList;
      case 'F':
        return roomFUserList;
      case 'T':
        return roomTUserList;
    }
  }

  //유저가 채팅방 나가면 유저리스트에서 빼는 함수
  function spliceUserList(
    roomName: string,
    nickName: string,
    userId: number,
    index: number
  ) {
    switch (roomName) {
      case 'I':
        let roomIUseridList = [];
        for (let i = 0; i < roomIUserList.length; i++) {
          roomIUseridList.push(roomIUserList[i].userId);
        }
        index = roomIUseridList.indexOf(userId);
        if (index !== -1) {
          roomIUserList.splice(index, 1);
        }

        break;
      case 'E':
        let roomEUseridList = [];
        for (let i = 0; i < roomEUserList.length; i++) {
          roomEUseridList.push(roomEUserList[i].userId);
        }
        index = roomEUseridList.indexOf(userId);
        if (index !== -1) {
          roomEUserList.splice(index, 1);
        }

        break;
      case 'F':
        let roomFUseridList = [];
        for (let i = 0; i < roomFUserList.length; i++) {
          roomFUseridList.push(roomFUserList[i].userId);
        }
        index = roomFUseridList.indexOf(userId);
        if (index !== -1) {
          roomFUserList.splice(index, 1);
        }

        break;
      case 'T':
        let roomTUseridList = [];
        for (let i = 0; i < roomTUserList.length; i++) {
          roomTUseridList.push(roomTUserList[i].userId);
        }
        index = roomTUseridList.indexOf(userId);
        if (index !== -1) {
          roomTUserList.splice(index, 1);
        }

        break;
    }
  }

  // 유저가 io 연결 끊으면 끊어지기전에 모든 유저리스트에서 삭제하는 함수
  function deleteDisconnectUserList(index: number, sid: string) {
    //I방 삭제
    let roomIUseridList = [];
    for (let i = 0; i < roomIUserList.length; i++) {
      roomIUseridList.push(roomIUserList[i].sid);
    }
    index = roomIUseridList.indexOf(sid);
    if (index !== -1) {
      roomIUserList.splice(index, 1);
    }

    //E방 삭제
    let roomEUseridList = [];
    for (let i = 0; i < roomEUserList.length; i++) {
      roomEUseridList.push(roomEUserList[i].sid);
    }
    index = roomEUseridList.indexOf(sid);
    if (index !== -1) {
      roomEUserList.splice(index, 1);
    }

    //F방 삭제
    let roomFUseridList = [];
    for (let i = 0; i < roomFUserList.length; i++) {
      roomFUseridList.push(roomFUserList[i].sid);
    }
    index = roomFUseridList.indexOf(sid);
    if (index !== -1) {
      roomFUserList.splice(index, 1);
    }

    //T방 삭제
    let roomTUseridList = [];
    for (let i = 0; i < roomTUserList.length; i++) {
      roomTUseridList.push(roomTUserList[i].sid);
    }
    index = roomTUseridList.indexOf(sid);
    if (index !== -1) {
      roomTUserList.splice(index, 1);
    }
  }

  //룸네임에 맞는 유저리스트에 유저 추가
  function pushUserlist(
    roomName: string,
    nickName: string,
    userId: number,
    sid: string
  ) {
    switch (roomName) {
      case 'I':
        if (!roomIUserList.find((arr) => arr.userId === userId)) {
          roomIUserList.push({ nickName: nickName, userId: userId, sid: sid });
        }
        break;
      case 'E':
        if (!roomEUserList.find((arr) => arr.userId === userId)) {
          roomEUserList.push({ nickName: nickName, userId: userId, sid: sid });
        }
        break;
      case 'F':
        if (!roomFUserList.find((arr) => arr.userId === userId)) {
          roomFUserList.push({ nickName: nickName, userId: userId, sid: sid });
        }
        break;
      case 'T':
        if (!roomTUserList.find((arr) => arr.userId === userId)) {
          roomTUserList.push({ nickName: nickName, userId: userId, sid: sid });
        }
        break;
    }
  }

  // 비속어 필터링에서 비속어 목록 불러오기
  let badwords: any = await getBadwords();

  //유저 이미지 불러오는 함수
  const getUserImage = async (userList: IChatRoomUserList[] | undefined) => {
    let targetRoomNameSequelizeQuerys: any[] = [];
    let resultPromiseall;
    //promise.all 돌릴 배열 생성 (유저아이디별 유저이미지 가져오기)
    if (userList!.length > 0) {
      for (let i = 0; i < userList!.length; i++) {
        const targetUserId = userList![i].userId;
        const targetNickName = userList![i].nickName;
        const targetRoomNameSequelizeQuery = new Promise((resolve, reject) => {
          resolve(
            sequelize.query(
              `SELECT nickname, user_image, user_mbti FROM database_final_project.users where user_id = ${targetUserId} and nickname = '${targetNickName}'`,
              {
                type: Sequelize.QueryTypes.SELECT,
              }
            )
          );
        });
        targetRoomNameSequelizeQuerys.push(targetRoomNameSequelizeQuery);
      }
    }

    await Promise.all(targetRoomNameSequelizeQuerys).then((values) => {
      resultPromiseall = values;
    });

    return resultPromiseall;
  };

  //처음 소켓서버에 접속하는 이벤트, 소켓을 하나씩 받는다.
  io.on('connection', (socket) => {
    //소켓에서의 미들웨어 느낌  감시자
    socket.onAny((event) => {
      console.log(`소켓 이벤트명: ${event}`);
    });

    socket.on('join_room', (roomName) => {
      //roomName 방에 접속시킴
      socket.join(roomName);
    });

    socket.on('left_room', (roomName) => {
      socket.leave(roomName);
    });

    //채팅방에 들어가는 이벤트
    socket.on('join_chat', async (roomName, nickName, userId) => {
      console.log(roomName, nickName, userId);

      const sid = socket.id;

      //룸네임에 맞는 유저리스트에 유저 추가
      pushUserlist(roomName, nickName, userId, sid);

      //채팅방 안의 유저리스트 불러오기
      let userList = findChatroomUserList(roomName);

      console.log(userList);

      //채팅방 안의 유저들의 유저닉네임과 이미지를 받아오기
      let resultPromiseall = await getUserImage(userList);

      console.log(resultPromiseall);
      //현재 채팅방에 있는 유저닉네임과 유저이미지 유저 수 보내주기
      io.sockets
        .to(roomName)
        .emit('current_usercount', resultPromiseall, countRoomUser(roomName));

      //방에 접속함을 알리는 이벤트
      io.sockets
        .to(roomName)
        .emit(
          'notice_user_join',
          nickName,
          findChatroomUserList(roomName),
          countRoomUser(roomName)
        );
    });

    //연결을 끊기 직전 발생하는 이벤트
    socket.on('disconnecting', async (reason) => {
      let index = -1;
      const sid = socket.id;
      deleteDisconnectUserList(index, sid);

      //I채팅방에 조인되어 있었는지 확인
      if (socket.rooms.has('I')) {
        //I채팅방 안의 유저리스트 불러오기
        const userIList = findChatroomUserList('I');

        //I채팅방 안의 유저들의 유저닉네임과 이미지를 받아오기
        const roomIUserinfo = await getUserImage(userIList);

        //I방에 유저 나갔음을 전달
        io.sockets
          .to('I')
          .emit('current_usercount', roomIUserinfo, countRoomUser('I'));
      }

      //E채팅방에 조인되어 있었는지 확인
      if (socket.rooms.has('E')) {
        //E채팅방 안의 유저리스트 불러오기
        const userEList = findChatroomUserList('E');

        //E채팅방 안의 유저들의 유저닉네임과 이미지를 받아오기
        const roomEUserinfo = await getUserImage(userEList);

        //E방에 유저 나갔음을 전달
        io.sockets
          .to('E')
          .emit('current_usercount', roomEUserinfo, countRoomUser('E'));
      }

      //F채팅방에 조인되어 있었는지 확인
      if (socket.rooms.has('F')) {
        //F채팅방 안의 유저리스트 불러오기
        const userFList = findChatroomUserList('F');

        //F채팅방 안의 유저들의 유저닉네임과 이미지를 받아오기
        const roomFUserinfo = await getUserImage(userFList);

        //F방에 유저 나갔음을 전달
        io.sockets
          .to('F')
          .emit('current_usercount', roomFUserinfo, countRoomUser('F'));
      }

      //T채팅방에 조인되어 있었는지 확인
      if (socket.rooms.has('T')) {
        //T채팅방 안의 유저리스트 불러오기
        const userTList = findChatroomUserList('T');

        //T채팅방 안의 유저들의 유저닉네임과 이미지를 받아오기
        const roomTUserinfo = await getUserImage(userTList);

        //T방에 유저 나갔음을 전달
        io.sockets
          .to('T')
          .emit('current_usercount', roomTUserinfo, countRoomUser('T'));
      }

      // socket.rooms.forEach((room) =>
      //   socket
      //     .to(room)
      //     .emit('notice_user_disconnect', room, countRoomUser(room) - 1)
      // );
    });

    //유저가 룸 떠났을 때 발생하는 이벤트
    socket.on('user_left', async (roomName, nickName, userId) => {
      // 유저리스트에서의 유저 위치번호
      let index = -1;

      //roomName에 맞는 유저리스트에서 삭제
      spliceUserList(roomName, nickName, userId, index);

      //채팅방 안의 유저리스트 불러오기
      let userList = findChatroomUserList(roomName);

      //채팅방 안의 유저들의 유저닉네임과 이미지를 받아오기
      let resultPromiseall = await getUserImage(userList);

      //현재 채팅방에 있는 유저닉네임과 유저이미지 유저 수 보내주기
      io.sockets
        .to(roomName)
        .emit('current_usercount', resultPromiseall, countRoomUser(roomName));

      //채팅방의 모든유저(자신포함)에게 유저 왔음을 알림
      io.sockets
        .to(roomName)
        .emit('notice_user_left', roomName, nickName, userId);
    });

    //유저 목록 보내는 이벤트
    socket.on('current_usercount', async (roomName) => {
      //채팅방 안의 유저리스트 불러오기
      let userList = findChatroomUserList(roomName);

      //채팅방 안의 유저들의 유저닉네임과 이미지를 받아오기
      let resultPromiseall = await getUserImage(userList);

      //현재 채팅방에 있는 유저닉네임과 유저이미지 유저 수 보내주기
      io.sockets
        .to(roomName)
        .emit('current_usercount', resultPromiseall, countRoomUser(roomName));
    });

    //메세지 보내는 이벤트
    socket.on('send_message', async (roomName, nickName, userId, msg) => {
      try {
        //비속어 감지
        if (checkBadword(badwords, msg)) {
          msg = '비속어가 감지되었습니다';
        } else {
          //메세지 DB에 저장
          await Chatlog.create({
            room_name: roomName,
            user_id: userId,
            message: msg,
          });
        }

        const query = `SELECT user_image, user_mbti FROM users
      WHERE user_id = ${userId}`;

        //유저 이미지 불러오기
        const userImageData: any = await sequelize.query(query, {
          type: Sequelize.QueryTypes.SELECT,
        });

        const userImage = userImageData[0].user_image;
        const userMbti = userImageData[0].user_mbti;

        //메세지를 방의 모든 소켓들(자신포함)에게 전달
        io.sockets
          .to(roomName)
          .emit(
            'receive_message',
            roomName,
            nickName,
            userId,
            msg,
            userImage,
            userMbti
          );
      } catch (err) {
        console.error(err);
      }
    });

    // //알림기능
    // socket.on('notice_new_post', () => {
    //   socket.broadcast.emit('notice_new_post');
    // });
  });
};
