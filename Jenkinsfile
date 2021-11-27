node {

  git branch: 'main', url:'https://github.com/fungap/fungap-back.git'

  withCredentials([[$class: 'UsernamePasswordMultiBinding',

     credentialsId: 'docker-hub',

     usernameVariable: 'DOCKER_USER_ID', 

     passwordVariable: 'DOCKER_USER_PASSWORD']]) { 

     stage('Pull') {

           git branch: 'main', url: 'https://github.com/fungap/fungap-back.git'

     }

      // stage('Unit Test') {

      // }

      stage('Build') {

            sh(script: 'sudo docker-compose build app')

      }

      stage('Tag') {

            sh(script: 'sudo docker tag ${DOCKER_USER_ID}/fungap ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') }

      stage('Push') {

            sh(script: 'sudo docker login -u ${DOCKER_USER_ID} -p ${DOCKER_USER_PASSWORD}') 

             sh(script: 'sudo docker push ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') 

            sh(script: 'sudo docker push ${DOCKER_USER_ID}/fungap:latest')

      }

       stage('image pull') {

           sh(script: 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136')

           sh(script:'sudo systemctl daemon-reload')

           sh(script: 'sudo docker login -u ${DOCKER_USER_ID} -p ${DOCKER_USER_PASSWORD}') 

           sh(script: 'sudo docker pull ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') 

       //    sh(script: 'sudo docker tag ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER} 127.0.0.1:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}')
           
         //  sh(script: 'sudo docker push localhost:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}')
       
           
       }

       stage('registry') {
           sh(script: 'sudo docker container exec -it manager docker pull ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') 
          
           sh(script: 'sudo docker container exec -it worker01 docker pull ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') 
          
           sh(script: 'sudo docker container exec -it worker02 docker pull ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') 

           sh(script: 'sudo docker container exec -it manager docker service update --image ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER} fungap') 

          
           
       }

       stage('update') {

           
           
       }

    } 

}
// Pipeline Script 작성

// 스테이지는 총 6단계로 되어있다. 1. Pull 2. Unit Test(pass) 3. Build 4. Tag 5. Push 6. Deploy로 구성되어 있다. git poll에 있는 url에 자신의 git repository url을 넣어줍니다. withCredentials는 위에서 docker hub 접속을 위해 Credentials를 연결하기 위해 생성한 것과 연결하기 위해 필요합니다. 이 데이터는 Push 작업 시 필요합니다. 이제 각 스테이지에 대한 의미를 알아봅시다.

// Pull: git 소스를 다운로드합니다. 위에서 만든 자신의 프로젝트 git url를 넣어줍니다.

// Build: docker-compose를 이용해 build를 진행합니다.

// Tag: docker image tag를 진행합니다.

// Push: docker hub에 push를 합니다.

// Deploy: docker-compose 명령어로 이미지를 실행합니다.