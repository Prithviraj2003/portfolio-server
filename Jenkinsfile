pipeline {
    agent any
    
    environment {
        EC2_INSTANCE_IP = 'ec2-3-110-107-83.ap-south-1.compute.amazonaws.com' // Replace with your EC2 instance IP
        EC2_USER = 'ubuntu' // Replace with the appropriate username (e.g., 'ubuntu' for Ubuntu AMIs)
        SSH_KEY = credentials('EC2_SSH_KEY') // Use the credential ID of your SSH private key stored in Jenkins
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
        
        stage('Deploy to EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'EC2_SSH_KEY', keyFileVariable: 'SSH_KEY_FILE')]) {
                        // SSH into EC2 instance and deploy the application
                        sh """
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY_FILE $EC2_USER@$EC2_INSTANCE_IP << EOF
                            cd portfolio-server || mkdir -p portfolio-server && cd portfolio-server
                            
                            # Pull latest changes
                            git pull origin main
                            
                            # Install dependencies
                            npm install
                            
                            # Restart the application (assuming you use PM2 or another process manager)
                            pm2 restart app || pm2 start server.js --name "portfolio-server"
                        EOF
                        """
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment to EC2 succeeded!'
        }
        failure {
            echo 'Deployment to EC2 failed.'
        }
    }
}
