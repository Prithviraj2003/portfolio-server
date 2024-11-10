pipeline {
    agent any
    
    environment {
        HEROKU_APP_NAME = 'prithviraj-portfolio-server' // Replace with your Heroku app name
        HEROKU_API_KEY = credentials('HEROKU_API_KEY') // Use the credential ID created in Jenkins
    }
    
    stages {
        
        stage('Clone Repository') {
            steps {
                // Clone the repository and specify the main branch
                git branch: 'main', url: 'https://github.com/Prithviraj2003/portfolio-server.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        // Install frontend/backend dependencies
                        sh 'npm install'
                    }
                }
            }
        }
        
        stage('Deploy to Heroku') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_API_KEY')]) {
                        sh '''
                        # Login to Heroku
                        echo $HEROKU_API_KEY | heroku auth:token --app $HEROKU_APP_NAME
                        
                        # Deploy to Heroku
                        git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git HEAD:main
                        '''
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment to Heroku succeeded!'
        }
        failure {
            echo 'Deployment to Heroku failed.'
        }
    }
}
