# Fungap
![Frame 14120](https://user-images.githubusercontent.com/89460880/144413012-68612fe9-b1f7-428d-8ce9-6fa53c9a3a31.png)

<<<<<<< HEAD
<h2>팀 소개</h2>

 <li> FRONT END : 조성민, 임동건, 김세연
 <li> BACK END : 전은규 , 신성웅, 오정민
 <li> 팀 노션 : 
 <li> 디자인 작업 :
=======
## 🎊 프로젝트 소개  
#### 📆 개발기간 2021.10.25 ~ 2021.12.03    
> MBTI를 통해 자신과 타인을 이해하고 싶은 MZ세대를 위해,    
> 여러 MBTI 콘텐츠를 제공하여 서로의 차이에 대한 재미를 느낄 수 있는 서비스
>>>>>>> dev

* 사이트 링크: <https://fungap.shop>
* 소개 영상 : <https://www.youtube.com/watch?v=EUYZv5PJMtI>

## 🧑🏻‍💻 팀 구성
- Frontend : 조성민(ENFJ), 임동건(INFJ), 김세연(INFP)
- Backend : 전은규(ENFP), 신성웅(INTP), 오정민(ISTP)
- Designer : 김민경(ESTJ), 김은우(ESFJ)

<<<<<<< HEAD
![image](https://user-images.githubusercontent.com/88120776/144158286-65ad9dde-0e7d-41c9-a386-daaad75e7bbf.png)
=======
## 📃개발프로세스 & ERD
- [git HUb issue&Project](https://github.com/fungap/Appendix-back/blob/main/develop_process.md)
- [ERD](https://github.com/fungap/Appendix-back/blob/main/erd.md)

## 🎨 아키텍쳐
![image](https://user-images.githubusercontent.com/88120776/144158286-65ad9dde-0e7d-41c9-a386-daaad75e7bbf.png)<br><br>
>>>>>>> dev

[아키텍쳐 설명](https://github.com/fungap/Appendix-back/blob/main/architecture.md)<br><br>

<<<<<<< HEAD
- git hub 에 푸쉬가 되면 젠킨스가 docker image를 만들어 docker hub 에 올립니다.<br>
- 만들어진 image를 docker hub에서 젠킨스가 받아와 배포 서버의 registy에 저장을 하고 각 노드에 배포시키며 슬랙으로 알람을 줍니다. <br>
- GCP 컴퓨터 엔진을 배포서버로 두고 있고 컨테이너 오케스트레이션인 docker 스웜으로 각 노드를 관리하고 있습니다.
- database는 아마존 RDS mysql을 사용하고 있으며 검색 엔진으로 elastic을 활용하고 있습니다. <br>
- docker manager node 에서 그라파나와 프로메테우스로 모니터링을 하고 있으며 cpu 사용률이 85%가 넘으면 슬랙으로 알람이 가게 됩니다.<br>
- 서버 앞단에는 nginx 프록시 서버를 두고 https 설정과 뒤에있는 서버의 정보를 감추면서 보안을 강화하고 있습니다.
=======
## 🛠 기술 스텍 및 라이브러리
>>>>>>> dev

### 기술 개발 환경

|         종류          |         이름          |
| :-------------------: | :-------------------: |
|    서버프레임워크     |        Express        |
|       Database        |         Mysql         |
|       모니터링        | 그라파나,프로메테우스 |
|         CI/CD         |        젠킨스         |
| container ocastration |       도커스웜        |
|       검색엔진        |    elastic search     |
|    빌드이미지 저장    |      docker hub       |
|      프록시서버       |         nginx         |
|      부하테스트       |        jmeter         |
|       개발언어        | Javascript,Typescript |

### 주요 라이브러리
<<<<<<< HEAD

|   라이브러리    |       설명        |
| :-------------: | :---------------: |
|      cors       |  교차리소스공유   |
|     dotenv      |  시크릿키 암호화  |
|  jsonwebtoken   | 회원가입 작동방식 |
|    sequelize    |     MySQL ORM     |
|  cookie-parser  |  조회수중복방지   |
|      Mysql      |       Mysql       |
|     bycrypt     |  비밀번호 해쉬화  |
| swagger-autogen |  스웨거 자동생성  |
|       joi       |    유효성검사     |
|     winston     |     로그관리      |
|     morgan      |     로그관리      |
|   nodemailer    |     메일인증      |
|    socket.io    |       채팅        |
|     helmet      |     보안강화      |
|   typescript    |    typescript     |

### appendix<br>

=======
  |라이브러리|설명|
  |:------:|:---:|
|cors|교차리소스공유|
|dotenv|시크릿키 암호화|
|jsonwebtoken|회원가입 작동방식|
|sequelize|MySQL ORM|
|cookie-parser|조회수중복방지|
|Mysql|Mysql|
|bycrypt|비밀번호 해쉬화|
|swagger-autogen|스웨거 자동생성|
|joi|유효성검사|
|winston|로그관리|
|morgan|로그관리|
|nodemailer|메일인증|
|socket.io|채팅|
|helmet|보안강화|
|typescript|typescript|  

## 👓 주요 APi 기능 | Main API
[상세보기](https://github.com/fungap/Appendix-back/blob/main/API.md)
1. 회원가입,소셜로그인(카카오,구글,네이버),이메일 인증(비밀번호 찾기)
2. 채팅,유형별 채팅방(E,i,F,T) 
3. 컨텐츠 검색 (Elastic search)
4. 상황별 MBTI 반응 컨텐츠(좋아요, 조회수, 댓글, 공유)
5. 밸런스게임 MBTI별 투표 컨텐츠(투표, 조회수, 댓글, 좋아요, 공유)
6. MBTi궁합테스트 컨텐츠(공유)

## 🗝트러블 슈팅
[상세보기](https://github.com/fungap/Appendix-back/edit/main/trouble.md)
1. cookie 를 이용한 조회수 중복 방지
2. table 에 없는 like state 값 계산
3. 젠킨스 EC2 에서는 연결이 잘되엇지만 GCP에서는 안되던 

## ✨기술적 챌린지 
>>>>>>> dev
[도커스웜&모니터링](https://github.com/fungap/Appendix-back/blob/main/docker-swarm%26monitoring.md)<br>
[채팅](https://github.com/fungap/Appendix-back/blob/main/chatting.md)<br>
[검색엔진&분석엔진](https://github.com/fungap/Appendix-back/blob/main/search_engin%26Analysis_tool.md)<br>
[소셜로그인](https://github.com/fungap/Appendix-back/blob/main/social-login.md)<br>
[타입스크립트](https://github.com/fungap/Appendix-back/blob/main/typescript.md)<br>
