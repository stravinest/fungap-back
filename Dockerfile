#베이스 이미지 
<<<<<<< HEAD
FROM node:14-alpine
=======
FROM node:14.17.3
>>>>>>> dev

# 앱 디렉터리 생성
COPY    ./package* /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 소스복사
COPY . /usr/src/app 

expose 6000
# 앱 소스 추가

<<<<<<< HEAD

CMD node app.js
# CMD [ "pm2-runtime", "server.js", "-i", "max" ]

=======
CMD pm2 start app.js
# CMD [ "pm2-runtime", "server.js", "-i", "max" ]
>>>>>>> dev
