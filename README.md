# Fungap
![Frame 14120](https://user-images.githubusercontent.com/89460880/144413012-68612fe9-b1f7-428d-8ce9-6fa53c9a3a31.png)

## 🎊 프로젝트 소개  
#### 📆 개발기간 2021.10.25 ~ 2021.12.03    
> MBTI를 통해 자신과 타인을 이해하고 싶은 MZ세대를 위해,    
> 여러 MBTI 콘텐츠를 제공하여 서로의 차이에 대한 재미를 느낄 수 있는 서비스

* 사이트 링크: <https://fungap.shop>
* 소개 영상 : <https://www.youtube.com/watch?v=EUYZv5PJMtI>

## 🧑🏻‍💻 팀 구성
- Frontend : 조성민(ENFJ), 임동건(INFJ), 김세연(INFP) [프론트앤드 Git-Hub](https://github.com/fungap/fungap-front)
- Backend : 전은규(ENFP), 신성웅(INTP), 오정민(ISTP)
- Designer : 김민경(ESTJ), 김은우(ESFJ)

## 📃개발프로세스 & ERD
- [git HUb issue&Project](https://github.com/fungap/Appendix-back/blob/main/develop_process.md)
- [ERD](https://github.com/fungap/Appendix-back/blob/main/erd.md)

## 🎨 아키텍쳐
![image](https://user-images.githubusercontent.com/88120776/144158286-65ad9dde-0e7d-41c9-a386-daaad75e7bbf.png)<br><br>

[아키텍쳐 설명](https://github.com/fungap/Appendix-back/blob/main/architecture.md)<br><br>

## 🛠 기술 스텍 및 라이브러리

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
  |라이브러리|설명|
  |:------:|:---:|
|cors|교차리소스공유|
|dotenv|시크릿키 암호화|
|jsonwebtoken|회원가입 작동방식|
|sequelize|MySQL ORM|
|cookie-parser|조회수중복방지|
|Mysql|Mysql|
|bycrypt|비밀번호 해쉬화|
|swagger-autogen|API 문서화|
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
[상세보기](https://github.com/fungap/Appendix-back/blob/main/trouble.md)
1. cookie 를 이용한 조회수 중복 방지
2. table 에 없는 like state 값 계산
3. 젠킨스 EC2 에서는 연결이 잘되었지만 GCP에서는 안되던 문제
4. 쿠버네티스 클러스터 셋팅

## ✨기술적 챌린지 
[도커스웜&모니터링](https://github.com/fungap/Appendix-back/blob/main/docker-swarm%26monitoring.md)<br>
[채팅](https://github.com/fungap/Appendix-back/blob/main/chatting.md)<br>
[검색엔진&분석엔진](https://github.com/fungap/Appendix-back/blob/main/search_engin%26Analysis_tool.md)<br>
[소셜로그인](https://github.com/fungap/Appendix-back/blob/main/social-login.md)<br>
[타입스크립트](https://github.com/fungap/Appendix-back/blob/main/typescript.md)<br>

## ☘아쉬웠던 점 && 에필로그
- 원래의 기획, 기술적인 도전과 실패 그리고 오버엔지니어링<br>
첫날 아직은 친하지 않은 팀원들간의 만남이 있은 후 모두 열정적으로 기획을 하고 백앤드 팀원들 과 어떻게 진행할것인지 회의를 했다. 당초에 계획은 처음부터 모든 코드를 서로가 같이 하드 리뷰를 하면서 프로젝트 전반에 내가 모르는 코드가 없게 하는 것 이었다. 1주일 간 passport를 이용한 소셜로그인이나, 기본 api 설계, https 설정 등을 함께 노션에 개념들과 사용근거등을 정리하면서 진행하였다. 그러나 우리는 여러 멘토링을 받으면서 프로젝트의 방향에 대한 의구심을 갖게 되었고 결국 일주일 만에 당초의 기획을 엎게 되어버렸다. 이때 멘탈이 많이 흔들렸던 것 같다. 일주일간의 시간이 거의 증발 했다 시피 했고 남들보다 늦춰진다는 생각이 강했다. 결국엔 2주차에는 같이 리뷰하면서 모든 코드를 같이 짜는 것은 하지 못했고 파트를 나눠서 진행했다. 4주차 부터는 본격적으로 기술적 챌린지를 시도했다. 나는 서버관리 인프라를 맡았는데 쿠버네티스 구축을 시도 했다. 하지만 성공하지 못했고 결국 도커스웜으로 구성을하고 모니터링에는 그라파나 프로메테우스 를 황용했다. 아키텍쳐 면에서 뭔가 탄탄한 근거를 바탕으로 설계하기 보다는 조금 더 깊게 파고 들다보니 보이는 어떤 스팩좋은 기술들에 눈이 많이 갔던 것 같다. 따라서 오버엔지니링이라는 굴레를 벗어나기 힘들다고 생각한다. 다만 여러 멘토링이나 프로젝트 방향들을 잡는 고민들을 할때 결국에 선택한 것은 우리가 하고 싶어했던 것들을 하자 였다. 분명 지금와서 조금은 더 아쉽고 더 근거있는 개발을 했으면 어땠을까 하는 아쉬움이 드는 것도 사실이다.<br><br>
- 프론트3 백앤드3 디자이너 2 협업과 소통<br>
프론트와 백엔드 그리고 디자이너분들까지 이렇게 8명의 단위로 협업을 하는 것이 처음이기도 했기에 처음에는 상당히 낯설었다. 소통하면서 최대한 부드러운 화법을 사용하려고 노력했다. 아무래도 장시간 집중을 하면서 코딩을 하다보면 조그만한 말투나 행동에 쉽게 상처를 줄 수 있을 것 같았다. 개인적인 생각 이지만 우리 팀이 소통과 팀 시너지는 제일 좋았다고 생각한다. 무조건 좋고좋다고 하는 것이 아니라 어떤부분에서는 딱 요구할 수 있는 상황과 거절 할 수 있는 상황에서 적절하게 표현 할 때 가 있다고 생각하는데 이부분도 서로에게 직설적으로 이야기 하고 감정없이 받아들이는 부분이 좋았다고 생각한다.<br><br>
- 하루에 15시간씩 6주??<br>
아침 9시 부터 밤 11시까지 6주간 했다는 것에 뭔가 나도 이렇게 까지 할 수 있구나 하는 생각이 든다. 정말 짧은 시간 동안 많은 것들을 축약적으로 몸속에 집어넣은 느낌이다. 이러한 경험은 여태껏 겪어보지 못했던 경험인 것뿐 아니라 앞으로도 하기 힘든 경험인 것은 확실했다 
