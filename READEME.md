# Youtube-Clone

### NodeJS, Express, MongoDB, ES6를 사용하여 youtube clone 하기

# 목차 
- [Youtube-Clone](#youtube-clone)
    - [NodeJS, Express, MongoDB, ES6를 사용하여 youtube clone 하기](#nodejs-express-mongodb-es6를-사용하여-youtube-clone-하기)
- [목차](#목차)
- [Requirements](#requirements)
- [Set Up](#set-up)
  - [NodeJS](#nodejs)
  - [프로젝트 시작하기](#프로젝트-시작하기)
    - [git 저장소 생성](#git-저장소-생성)
    - [package.json 파일 생성](#packagejson-파일-생성)
  - [Express](#express)
    - [Express install](#express-install)
      - [node_modules](#node_modules)
  - [Babel](#babel)
    - [babel install](#babel-install)
  - [Nodemon](#nodemon)
    - [nodemon install](#nodemon-install)


# Requirements
- nodeJS
  - Chorome V8 Javascript 엔진으로 빌드된 Javascript 런타임이다.
  - 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적이다.
- npm
  - Node Package Manader의 약자이다.
  - Javascript 패키지 매니저이고, NodeJS에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할을 하며 설치/관리를 수행할 수 있는 CLI를  제공한다.

# Set Up
## NodeJS
- [NodeJS]('https://nodejs.org/en/') 설치

## 프로젝트 시작하기
- 프로젝트 폴더를 만들고 폴더안으로 들어간다.
- 프로젝트를 하다보면 여러 패키지들을 사용해야 할 상황이 생기고, 설치한 패키지들을 관리하는 파일은 package.json이다.
  - package.json 문서는 어느 곳에서도 동일한 개발환경을 구축할 수 있게 해준다.

### git 저장소 생성
- 터미널 창에 `git init` 입력
- github에서 repository 생성
- 터미널 창에 `git remote add [github repository url]` 입력

### package.json 파일 생성
- 터미널 창에 `npm init` 입력
- 질문의 답을 완료하면 파일 생성
    - package name : 패키지의 이름이다.
    - version : 패키지의 버전이다.
    - entry porint : 자바스크립트 실행 파일 진입점이다. 보통 마지막으로 module.exports를 하는 파일을 지정한다.
    - test command : 코드를 테스트할 때 입력할 명령어를 의미한다.
    - git repository : 코드를 저장해둔 git 저장소 주소를 의미한다.
    - keywords : 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 해 준다.
    - license : 해당 패키지의 라이선스를 넣어주면 된다.

## Express
- NodeJS를 위한 빠르고 개방적인 간결한 웹 프레임워크
- NodeJS를 사용하여 쉽게 서버를 구성할 수 있게 만든 클래스와 라이브러리의 집합체

### Express install
- 터미널 창에 `npm install express` 입력
- node_modueles폴더와 package-lock.json파일이 생성된다.
  
#### node_modules
- package.json에 있는 패키지 뿐만 아니라 package.json에 있는 패키지들이 의존하고 있는 패키지 전부를 포함하고 있다.
- npm으로 새로운 패키지를 설치하게 되면 package.json과 node_modules에 추가된다.

## Babel
- 최신 자바스크립트 문법을 브라우저가 이해할 수 있는 문법으로 변환해주는 트랜스파일러이다.

### babel install
- NodeJS에서 사용가능한 babel을 설치한다.
- 터미널 창에 `npm install --save-dev @babel/core` 입력
  - `--save-dev` 명령어를 입력하면 package.json 파일의 `devDependencies`에 저장된다.
  - `dependencies`는 프로젝트에 필요한 패키지이고, `devDependencies`는 개발자에게 필요한 패키지이다.
- `babel.config.json` 파일 생성
  - babel 옵션 설정 파일
  - plugin이나 preset을 통해 babel에게 문법 변환 규칙을 알려준다.
  - plugin은 규칙 하나하나를 미세하게 적용할 때, preset은 여러개의 규칙을 한 번에 적용할 때 사용한다.
    ```json
        {
            "presets": ["@babel/preset-env"]
        }
    ```
- 터미널 창에 `npm install @babel/preset-env --save-dev` 입력
- package.json파일에서 babel로 컴파일하는 scripts를 작성한다.
    ```json
        {
            "scripts": {
                "dev": "babel-node index.js"
            }
        }
    ```
- 터미널 창에 `npm install @babel/core @babel/node --save-dev` 입력해서 설치해준다.
- `@babel/node`는 코드의 트랜스파일과 실행을 한 번에 할 수 있게 해주는 패키지이다.

## Nodemon
- 서버 파일의 변경이 감지되면 서버를 재시작 시켜주는 패키지이다.

### nodemon install
- 터미널 창에 `npm install nodemon --save-dev` 입력
- package.json파일의 scripts를 수정해준다.
    ```json
        {
            "scripts": {
                "dev": "nodemon --exec babel-node index.js"
            }
        }
    ```