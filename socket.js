const { Server } = require('socket.io');
const { Chatlog } = require('./models');
const { sequelize, Sequelize } = require('./models');

module.exports = (httpServer, app) => {
  const io = new Server(httpServer, {
    path: '/socket.io/',
    cors: { origins: '*', credentials: true },
  });

  app.set('io', io);

  //방의 유저수 알려주는 함수 (소켓 아이디 수 찾는 함수)
  function countRoomUser(roomName) {
    return io.sockets.adapter.rooms.get(roomName)?.size;
  }

  let roomIUserList = [];
  let roomEUserList = [];
  let roomFUserList = [];
  let roomTUserList = [];

  //roomName에 맞는 리스트 리턴
  function findRoomUserList(roomName) {
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

  //유저가 나가면 유저리스트에서 빼는 함수
  function spliceUserList(roomName, nickName, userId, index) {
    switch (roomName) {
      case 'I':
        let roomIUseridList = [];
        for (let i = 0; i < roomIUserList.length; i++) {
          roomIUseridList.push(roomIUserList[i].userId);
        }
        index = roomIUseridList.indexOf(userId);
        roomIUserList.splice(index, 1);
        break;
      case 'E':
        let roomEUseridList = [];
        for (let i = 0; i < roomEUserList.length; i++) {
          roomEUseridList.push(roomEUserList[i].userId);
        }
        index = roomEUseridList.indexOf(userId);
        roomEUserList.splice(index, 1);
        break;
      case 'F':
        let roomFUseridList = [];
        for (let i = 0; i < roomFUserList.length; i++) {
          roomFUseridList.push(roomFUserList[i].userId);
        }
        index = roomFUseridList.indexOf(userId);
        roomFUserList.splice(index, 1);
        break;
      case 'T':
        let roomTUseridList = [];
        for (let i = 0; i < roomTUserList.length; i++) {
          roomTUseridList.push(roomTUserList[i].userId);
        }
        index = roomTUseridList.indexOf(userId);
        roomTUserList.splice(index, 1);
        break;
    }
  }

  //처음 소켓서버에 접속하는 이벤트, 소켓을 하나씩 받는다.
  io.on('connection', (socket) => {
    //소켓에서의 미들웨어 느낌  감시자
    socket.onAny((event) => {
      console.log(`소켓 이벤트명: ${event}`);
    });

    //방에 들어가는 이벤트
    socket.on('join_room', (roomName, nickName, userId) => {
      console.log(socket.id);
      console.log(roomName, nickName, userId);

      //roomName 방에 접속시킴
      socket.join(roomName);

      //roomName에 맞는 유저리스트배열에 push
      switch (roomName) {
        case 'I':
          if (!roomIUserList.find((arr) => arr.userId === userId)) {
            roomIUserList.push({ nickName: nickName, userId: userId });
          }
          break;
        case 'E':
          if (!roomEUserList.find((arr) => arr.userId === userId)) {
            roomEUserList.push({ nickName: nickName, userId: userId });
          }
          break;
        case 'F':
          if (!roomFUserList.find((arr) => arr.userId === userId)) {
            roomFUserList.push({ nickName: nickName, userId: userId });
          }
          break;
        case 'T':
          if (!roomTUserList.find((arr) => arr.userId === userId)) {
            roomTUserList.push({ nickName: nickName, userId: userId });
          }
          break;
      }

      //방에 접속함을 알리는 이벤트
      io.sockets
        .to(roomName)
        .emit(
          'notice_user_join',
          nickName,
          findRoomUserList(roomName),
          countRoomUser(roomName)
        );
    });

    //연결을 끊기 직전 발생하는 이벤트
    socket.on('disconnecting', (reason) => {
      socket.rooms.forEach((room) =>
        socket
          .to(room)
          .emit('notice_user_disconnect', room, countRoomUser(room) - 1)
      );
    });

    //유저가 룸 떠났을 때 발생하는 이벤트
    socket.on('user_left', (roomName, nickName, userId) => {
      let index;

      //roomName에 맞는 유저리스트에서 삭제
      spliceUserList(roomName, nickName, userId, index);

      io.sockets
        .to(roomName)
        .emit('notice_user_left', roomName, nickName, userId);

      socket.leave(roomName);
    });

    //유저 목록 보내는 이벤트
    socket.on('current_usercount', async (roomName) => {
      let userList = findRoomUserList(roomName);

      let targetRoomNameSequelizeQuerys = [];

      let resultPromiseall;
      if (userList.length > 0) {
        for (let i = 0; i < userList.length; i++) {
          const targetUserId = userList[i].userId;
          const targetNickName = userList[i].nickName;
          const targetRoomNameSequelizeQuery = new Promise(
            (resolve, reject) => {
              resolve(
                sequelize.query(
                  `SELECT nickname, user_image FROM database_final_project.users where user_id = ${targetUserId} and nickname = '${targetNickName}'`,
                  {
                    type: Sequelize.QueryTypes.SELECT,
                  }
                )
              );
            }
          );
          targetRoomNameSequelizeQuerys.push(targetRoomNameSequelizeQuery);
        }
      }

      await Promise.all(targetRoomNameSequelizeQuerys).then((values) => {
        resultPromiseall = values;
        console.log(values);
      });

      console.log(roomName);
      socket.emit(
        'current_usercount',
        resultPromiseall,
        countRoomUser(roomName)
      );
    });

    //메세지 보내는 이벤트
    socket.on('send_message', async (roomName, nickName, userId, msg) => {
      //메세지 DB에 저장
      await Chatlog.create({
        room_name: roomName,
        user_id: userId,
        message: msg,
      });

      const query = `SELECT user_image FROM users
      WHERE user_id = ${userId}`;

      //유저 이미지 불러오기
      const userImageData = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });

      const userImage = userImageData[0].user_image;

      //메세지를 방의 다른 소켓들에게 전달.
      io.sockets
        .in(roomName)
        .emit('receive_message', roomName, nickName, userId, msg, userImage);
    });
  });
};
