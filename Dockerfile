#베이스 이미지 
FROM node:14-alpine 

# 앱 디렉터리 생성
COPY    ./package* /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
RUN npm install -g typescript


# 소스복사
COPY . /usr/src/app 

expose 3000
#10초 마다 체크 
# HEALTHCHECK --interval=10s 
# CMD wget -qO- localhost:3000
RUN npx tsc

CMD node app.js


