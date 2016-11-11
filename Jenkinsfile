#!groovy

try {
    properties([[$class: 'BuildDiscarderProperty',
                strategy: [$class: 'LogRotator',
                            artifactDaysToKeepStr: '',
                            artifactNumToKeepStr: '30',
                            daysToKeepStr: '',
                            numToKeepStr: '30']
                ]])
    currentBuild.result = "SUCCESS"
    node('linux') {

        stage('Checkout') {
            checkout scm
        }

        stage('Build') {
            def nodeHome = tool 'node6'
            withEnv(["PATH+NODE=${nodeHome}/bin"]) {
                sh "${nodeHome}/bin/node -v"
                sh "${nodeHome}/bin/npm prune"
                sh "${nodeHome}/bin/npm install"
                sh "${nodeHome}/bin/npm run build"
            }
        }

        if (env.BRANCH_NAME == 'master') {
            stage('Build & Push Docker hub') {
                docker.withRegistry('https://index.docker.io/v1/', 'docker_hub_tzoratto') {
                    def img = docker.build 'tzoratto/faya-frontend:dev'
                    img.push()
                }
            }
        }
    }
}
catch (err) {

    currentBuild.result = "FAILURE"

    mail bcc: '',
    body: "Build number : ${env.BUILD_NUMBER}, error : ${err}. Go to ${env.BUILD_URL}",
    cc: '',
    from: '',
    replyTo: '',
    subject: "${env.JOB_NAME} : pipeline failed",
    to: 'thomas.zoratto@gmail.com'

    throw err
}