# Small short-hand how to start using Jenkins

### Obvious, but i need to write it to remember better:
1) Donwload from https://jenkins.io/doc/pipeline/tour/getting-started/
2) Go to folder where downloaded file located:
```
java -jar jenkins.war --httpPort=8080.
```
3) Go to localhost:8080 and paste password from console (provided during installation)
4) Complete installlation by folowing instructions in the browser

### Jenkins uses language from browser settings. 

5) Add Jenkins file to root of the repo:
```
pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
```

6) push repo to the gihub (with webhook in the repo for public URL (Public url = expose your machine port with ngRok))
7) Jenkins -> New Item -> Enter name -> Multibranch Pipeline -> add source -> HTTPS link from repo -> save

### See Jenkins file with examples in rrot dir of this repo
