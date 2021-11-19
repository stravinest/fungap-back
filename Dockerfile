#베이스 이미지 
FROM node:14.17.3

# 앱 디렉터리 생성
COPY    ./package* /usr/src/app/
WORKDIR /usr/src/app
RUN npm install -g pm2 node-gyp
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 소스복사
COPY . /usr/src/app 

expose 3000
#10초 마다 체크 
HEALTHCHECK --interval=10s CMD wget -qO- localhost:3000

CMD node app.js
# CMD [ "pm2-runtime", "server.js", "-i", "max" ]

