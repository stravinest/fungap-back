const { Server } = require('socket.io');
const { sequelize, Sequelize } = require('./models');

module.exports = (httpServer, app) => {
  const io = new Server(httpServer, {
    path: '/socket.io/',
    cors: { origins: '*:*' },
  });

  app.set('io', io);

  io.on('connection', (socket) => {
    //소켓에서의 미들웨어 느낌  감시자
    socket.onAny((event) => {
      console.log(`소켓 이벤트명: ${event}`);
    });

    //방에 들어가는 이벤트
    socket.on('join_room', (roomName, nickName, userId, done) => {
      socket.join(roomName);
      done();
      socket.in(roomName).emit('notice_user_join');

      //연결을 끊기 직전 발생하는 이벤트
      socket.on('disconnecting', (reason) => {
        socket.rooms.forEach((room) =>
          socket.to(room).emit('notice_user_disconnect')
        );
      });

      //메세지 보내는 이벤트
      socket.on('send_message', (roomName, nickName, userId, msg, done) => {
        socket.to(room).emit('send_message', msg);
      });
    });
  });
};
