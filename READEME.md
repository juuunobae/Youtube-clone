# Youtube-Clone

### NodeJS, Express, MongoDB, ES6를 사용하여 youtube clone 하기

# 목차 
- [Youtube-Clone](#youtube-clone)
    - [NodeJS, Express, MongoDB, ES6를 사용하여 youtube clone 하기](#nodejs-express-mongodb-es6를-사용하여-youtube-clone-하기)
- [목차](#목차)
- [Requirements](#requirements)
  - [nodeJS](#nodejs)
  - [npm](#npm)
- [Set Up](#set-up)
  - [NodeJS](#nodejs-1)
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
- [Express Server](#express-server)
  - [서버 만들기](#서버-만들기)
  - [GET](#get)
  - [Middleware](#middleware)


# Requirements
## nodeJS
  - Chorome V8 Javascript 엔진으로 빌드된 Javascript 런타임이다.
  - 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적이다.
## npm
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
- **package.json**파일의 **scripts**를 수정해준다.
    ```json
        {
            "scripts": {
                "dev": "nodemon --exec babel-node index.js"
            }
        }
    ```

# Express Server
- 우선 src 폴더를 만들어 코드와 로직의 파일들을 src 폴더에 저장한다.
- 실행시킬 파일이름이 index.js일 필요는 없다. server.js로 바꾼다.

## 서버 만들기
- **express** 모듈을 사용해 **server**를 만들어준다.
```js

    // scr/server.js

    // express 모듈 import
    import express from 'express';

    // 포트를 변수에 대입
    const PORT = 4000;

    // express에서 반환된 application객체를 app 변수에 저장
    const app = express();

    // server에 접속이 성공하면 실행 될 콜백함수
    const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

    // 외부에서 서버에 접속할 때 허용할 포트 설정, 접속에 성공하면 실행 될 콜백함수
    app.listen(PORT, handleListening);
```

## GET
- get은 http 메서드이고, 사용자가 url에 데이터를 담아 서버에게 요청하는 것이다.
- 서버는 get 요청이 오면 `.get()`메서드로 응답을 해준다.
- .get(path, callback);
```js

    // 사용자에게 해당 url에 대한 요청이 들어오면 콜백함수를 실행한다.
    app.get('/', (req, res) => {
        return res.end();

        // res 객체에는 여러가지 메소드가 있다.
    });
    // get 메소드가 실행되면 콜백함수는 express로 부터 req, res 인자를 전달 받는다.
    // 브라우저에서 request를 받으면 response를 return을 해주어 응답해준다.

```
- **`Request Object`**: [Request(요청)]('https://expressjs.com/ko/4x/api.html#req')에 대한 객체
- **`Response Object`**: [Response(응답)]('https://expressjs.com/ko/4x/api.html#res')에 대한 객체

## Middleware
- 사용자의 요청과 서버의 응답 사이에 존재하는 소프트웽어이다.
- handler는 controller이고, 모든 controller가 middleware가 될 수 있다.
- controller에는 req, res 말고 하나의 인자가 더 있는데 next이다.
- next() 함수를 호출하면 해당 controller의 다음 controller가 실행된다.
```js

    // middleware는 next 함수를 호출해야지만 다음 controller로 넘어간다.
    // return을 해버리면 다음 controller로 넘어가지 않고 멈출 것이다.
    const middleware = (req, res, next) => {
        console.log('Middleware');
        // next 함수를 호출하지 않으면 다음 controller는 절대 실행되지 않는다.
        next()
    }

    // 마지막 controller는 res를 return해주어야 한다.
    const handleHome = (req, res) => {
        return res.send('Home')
    }

    // 사용자가 해당 경로로 요쳥을 하면 controller는 순서대로 실행된다. 
    // 다수의 cotroller를 사용할 수 있다.
    app.get('/', middleware, handleHome)

```
- 위 코드처럼 get 메소드안에 **middleware**를 넣으면 그 메소드에만 **middleware**가 동작한다.
- 여러개의 get 메소드에 대해 **middleware**를 동작 시키고 싶으면 `global middleware`를 사용한다.
- `.use()` 메소드
    ```js

        const handleHome = (req, res) => res.send('Home');

        const handleLogin = (req, res) => res.send('Login');
        
        const middleware = (req, res, next) => {
            console.log('middleware');
            next();
        }

        // 위에서 아래로 실행되기 때문에 middleware는 아래에 있는 controller에게만 적용된다.
        app.use(Middleware)
        app.get('/', handleHome)
        app.get('/login', handleLogin)

    ```

    
