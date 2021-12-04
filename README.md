<h1>🎉차이를 즐기자! Fungap</h1>

![Frame 14120](https://user-images.githubusercontent.com/89460880/144413012-68612fe9-b1f7-428d-8ce9-6fa53c9a3a31.png)

<h2>팀 소개</h2>

 <li> FRONT END : 조성민, 임동건, 김세연
 <li> BACK END : 전은규 , 신성웅, 오정민
 <li> 팀 노션 : 
 <li> 디자인 작업 :

<h2>프로젝트 설명</h2>
사이트 링크:https://fungap.shop

![화면 캡처 2021-12-02 201543](https://user-images.githubusercontent.com/89460880/144414643-bb0c1d4a-9aee-4604-bd2b-f6c137d0fe07.png)

![image](https://user-images.githubusercontent.com/88120776/144158286-65ad9dde-0e7d-41c9-a386-daaad75e7bbf.png)

### back-end 아키텍쳐

- git hub 에 푸쉬가 되면 젠킨스가 docker image를 만들어 docker hub 에 올립니다.<br>
- 만들어진 image를 docker hub에서 젠킨스가 받아와 배포 서버의 registy에 저장을 하고 각 노드에 배포시키며 슬랙으로 알람을 줍니다. <br>
- GCP 컴퓨터 엔진을 배포서버로 두고 있고 컨테이너 오케스트레이션인 docker 스웜으로 각 노드를 관리하고 있습니다.
- database는 아마존 RDS mysql을 사용하고 있으며 검색 엔진으로 elastic을 활용하고 있습니다. <br>
- docker manager node 에서 그라파나와 프로메테우스로 모니터링을 하고 있으며 cpu 사용률이 85%가 넘으면 슬랙으로 알람이 가게 됩니다.<br>
- 서버 앞단에는 nginx 프록시 서버를 두고 https 설정과 뒤에있는 서버의 정보를 감추면서 보안을 강화하고 있습니다.

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

[도커스웜&모니터링](https://github.com/fungap/Appendix-back/blob/main/docker-swarm%26monitoring.md)<br>
[채팅](https://github.com/fungap/Appendix-back/blob/main/chatting.md)<br>
[검색엔진](https://github.com/fungap/Appendix-back/blob/main/search_engin.md)<br>
[소셜로그인](https://github.com/fungap/Appendix-back/blob/main/social-login.md)<br>
[타입스크립트](https://github.com/fungap/Appendix-back/blob/main/typescript.md)<br>
