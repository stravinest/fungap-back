const { Server } = require('socket.io');
const { sequelize, Sequelize, Chatlog } = require('./models');

module.exports = (httpServer, app) => {
  const io = new Server(httpServer, {
    path: '/socket.io/',
    cors: { origins: '*:*' },
  });

  app.set('io', io);

  //방의 소켓 아이디 수 찾는 것
  function countRoom(roomName) {
    return io.sockets.adapter.rooms.get(roomName)?.size;
  }

  io.on('connection', (socket) => {
    //소켓에서의 미들웨어 느낌  감시자
    socket.onAny((event) => {
      console.log(`소켓 이벤트명: ${event}`);
    });

    //방에 들어가는 이벤트
    socket.on('join_room', (roomName, nickName, userId) => {
      socket.join(roomName);

      socket
        .in(roomName)
        .emit('notice_user_join', nickName, countRoom(roomName));

      //연결을 끊기 직전 발생하는 이벤트
      socket.on('disconnecting', (reason) => {
        socket.rooms.forEach((room) =>
          socket
            .to(room)
            .emit('notice_user_disconnect', room, countRoom(room) - 1)
        );
      });

      //메세지 보내는 이벤트
      socket.on('send_message', async (roomName, nickName, userId, msg) => {
        await Chatlog.create({
          room_name: roomName,
          user_id: userId,
          message: msg,
        });
        //메세지를 방의 다른 소켓들에게 전달.
        socket
          .to(roomName)
          .emit('send_message', roomName, nickName, userId, msg);
      });
    });
  });
};
