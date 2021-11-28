node {

  git branch: 'main', url:'https://github.com/fungap/fungap-back.git'

  withCredentials([[$class: 'UsernamePasswordMultiBinding',

     credentialsId: 'docker-hub',

     usernameVariable: 'DOCKER_USER_ID', 

     passwordVariable: 'DOCKER_USER_PASSWORD']]) { 

     stage('Pull') {

           git branch: 'main', url: 'https://github.com/fungap/fungap-back.git'

     }


      stage('Build') {

            sh(script: 'sudo docker-compose build app')

      }

      stage('Tag') {

            sh(script: 'sudo docker tag ${DOCKER_USER_ID}/fungap ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') 
      }
      
      stage('Push') {

            sh(script: 'sudo docker login -u ${DOCKER_USER_ID} -p ${DOCKER_USER_PASSWORD}') 

            sh(script: 'sudo docker push ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}') 

            sh(script: 'sudo docker push ${DOCKER_USER_ID}/fungap:latest')

      }

       stage('image pull') {          
                   script{
                          sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                              sudo docker login -u ${DOCKER_USER_ID} -p ${DOCKER_USER_PASSWORD}'    
                          sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                              sudo docker pull ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}'
                          sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                              sudo docker tag ${DOCKER_USER_ID}/fungap:${BUILD_NUMBER} localhost:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}'
                          sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                              sudo docker push localhost:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}'
                          sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                              sudo docker container exec -i manager docker image pull registry:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}'
                          sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                              sudo docker container exec -i worker01 docker image pull registry:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}'
                          sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                              sudo docker container exec -i worker02 docker image pull registry:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER}'
                        //   sh 'sudo ssh -i ~/.ssh/id_rsa jenkins@34.64.75.136\
                        //       sudo docker container exec -i manager docker service update --image registry:5000/${DOCKER_USER_ID}/fungap:${BUILD_NUMBER} fungap'

                         
                   }
       
           
       }


} 
}

