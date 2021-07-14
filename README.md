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
  - [POST](#post)
    - [.urlencoded](#urlencoded)
  - [route](#route)
  - [Middleware](#middleware)
    - [global middleware `.use()` 메소드](#global-middleware-use-메소드)
  - [Third party middleware](#third-party-middleware)
    - [Morgan](#morgan)
- [Router](#router)
  - [Dynamic Routing(동적 라우팅)](#dynamic-routing동적-라우팅)
    - [동적 URL](#동적-url)
- [Controller](#controller)
- [Template](#template)
  - [사용하기](#사용하기)
  - [문법](#문법)
    - [javascript 사용](#javascript-사용)
      - [javascript 문법 사용](#javascript-문법-사용)
        - [Conditionals](#conditionals)
        - [Iteration](#iteration)
    - [mixins](#mixins)
      - [express 변수 사용](#express-변수-사용)
    - [Partials](#partials)
    - [Layout](#layout)
- [Database](#database)
  - [mongoDB](#mongodb)
    - [NoSQL](#nosql)
  - [mongoose](#mongoose)
    - [ODM](#odm)
    - [mongoDB에 연결하기](#mongodb에-연결하기)
  - [model 생성](#model-생성)
  - [model 사용](#model-사용)
    - [CRUD](#crud)
    - [**Read**](#read)
    - [.find()](#find)
      - [Callback Function](#callback-function)
      - [Promise](#promise)
    - [.findById()](#findbyid)
    - [**Create**](#create)
    - [.create()](#create-1)
    - [**Update**](#update)
    - [.findByIdAndUpdate()](#findbyidandupdate)
    - [**Delete**](#delete)
    - [.findByIdAndDelete()](#findbyidanddelete)
  - [Middleware](#middleware-1)
    - [.pre()](#pre)
    - [.static()](#static)
  - [Search](#search)
- [에러처리](#에러처리)
  - [async/await 에러](#asyncawait-에러)
- [코드 정리](#코드-정리)
  - [.env 환경변수](#env-환경변수)
- [User Authentication](#user-authentication)
  - [**회원가입**](#회원가입)
    - [User Model 생성](#user-model-생성)
  - [password hash](#password-hash)
    - [bcrypt 사용](#bcrypt-사용)
  - [**Login**](#login)
  - [session & cookie](#session--cookie)
    - [cookie](#cookie)
    - [session](#session)
    - [Session Store](#session-store)


# Requirements
## nodeJS
  - Chorome V8 Javascript 엔진으로 빌드된 Javascript 런타임이다.
  - 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적이다.
## npm
  - Node Package Manader의 약자이다.
  - Javascript 패키지 매니저이고, NodeJS에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할을 하며 설치/관리를 수행할 수 있는 CLI를  제공한다.

# Set Up
## NodeJS
- [NodeJS](https://nodejs.org/en/) 설치

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
- 터미널 창에 `npm install express` 설치
- node_modueles폴더와 package-lock.json파일이 생성된다.
  
#### node_modules
- npm으로 새로운 패키지를 설치하게 되면 node_modules에는 패키지 파일들이 추가 되고, package.json에는 패키지 정보가 추가 된다.
- package.json에 있는 패키지 뿐만 아니라 package.json에 있는 패키지들이 의존하고 있는 패키지 전부를 포함하고 있다.

## Babel
- 최신 자바스크립트 문법을 브라우저가 이해할 수 있는 문법으로 변환해주는 트랜스파일러이다.

### babel install
- NodeJS에서 사용가능한 babel을 설치한다.
- 터미널 창에 `npm install --save-dev @babel/core` 설치
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
- 터미널 창에 `npm install @babel/preset-env --save-dev` 설치
- **package.json**파일에서 babel로 컴파일하는 **scripts**를 작성한다.
    ```json
        {
            "scripts": {
                "dev": "babel-node index.js"
            }
        }
    ```
- 터미널 창에 `npm install @babel/core @babel/node --save-dev` 설치
- `@babel/node`는 코드의 트랜스파일과 실행을 한 번에 할 수 있게 해주는 패키지이다.

## Nodemon
- 서버 파일의 변경이 감지되면 서버를 재시작 시켜주는 패키지이다.

### nodemon install
- 터미널 창에 `npm install nodemon --save-dev` 설치
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

    // server 실행이 성공하면 실행 될 콜백함수
    const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

    // 외부에서 서버가 실행될 때 허용할 포트 설정, 접속에 성공하면 실행 될 콜백함수
    app.listen(PORT, handleListening);
```

## GET
- GET은 http 메소드이고, 사용자가 url에 데이터를 담아 서버에게 요청하는 것이다.
- 브라우저 주소창에 url을 치고 들어가는 것은 브라우저가 서버에게 페이지와 데이터를 request 하는 것과 같다. 누군가가 해당 경로(**path**)로 get request를 보내면 서버는 `.get(path, callback)`메소드의 콜백함수를 실행시키고, 콜백함수는 return으로 응답을 해줘야 한다.
```js

    // '/' = root 경로
    app.get('/', (req, res) => {
        return res.end();

        // res 객체에는 여러가지 메소드가 있다.
    });
    // get 메소드가 실행되면 콜백함수는 express로 부터 req, res 인자를 전달 받는다.
    // 브라우저에서 request를 받으면 response를 return 해주어 응답해준다.

```
- **`Request Object`**: [Request(요청)](https://expressjs.com/ko/4x/api.html#req)에 대한 정보가 담긴 객체
- **`Response Object`**: [Response(응답)](https://expressjs.com/ko/4x/api.html#res)에 대한 정보가 담긴 객체
  
> get 메소드의 path가 **Router**이고, callback이 **Controller**라고 생각하면 된다.

## POST
- POST는 http 메소드이고, 사용자가 파일을 보내거나 database에 있는 값을 바꾸는 무언가를 보낼 때 사용한다.
- Login할 때도 사용

```pug

  //- 

  form(method='POST') <!-- action = 데이터를1 보낼 경로-->
    input(name='name', placeholder='Name', type='text') <!-- name 속성은 req.body에 key값이 된다.-->
    input(vlaue='Save', type='submit')

```
- 타입이 submit인 input을 누르면 현재의 url로 post 요청을 보낸다.
  - 요청을 보내는 url을 바꾸고 싶으면 form의 action 속성으로 지정해 줄 수 있다.
- `form`으로 부터 contorller로 넘어온 정보는 `req.body`에 담겨 있다.
- 하지만 express는 form을 처리하지 못한다. 그러기 위해서는 `.urlencoded`메소드를 이용한다.

### .urlencoded
- 시용자의 요청에 의해 request.boby에 들어오는 데이터를 urlencoded 데이터로 파싱한다.
- 여러가지 옵션을 사용할 수 있다.
```js

  // server.js

  app.use(express.urlencoded({ extended: true }));

```
- `extended` 옵션은 중첩된 객체를 허용할지 말지 정하는 것이다. 허용은 true

- post메소드로 데이터를 처리해준다.
```js

  app.post('/', (req, res) => {
    const { name } = req.body;
    const { id }  = req.params;
    return res.redirect('/')
  })

```

## route
- `.route()`메소드를 이용하면 하나의 경로에 get, post request를 모두 처리해야 할 때 더 짧은 코드로 작성할 수 있다.
```js

   app.route('/').get(getController).post(postController)
   // 사용자가 get request를 보내면 get 메소드가 실행될 것이고, post request를 보내면 post 메소드가 실행될 것이다.

```

## Middleware
- 사용자의 요청과 서버의 응답 사이에 존재하는 소프트웨어이다.
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
- 위 코드처럼 get 메소드안에 **middleware**를 넣으면 그 요청에만 **middleware**가 동작한다.
- 여러개의 get 메소드에 대해 **middleware**를 동작 시키고 싶으면 `global middleware`를 사용한다.

### global middleware `.use()` 메소드
    ```js

        const handleHome = (req, res) => res.send('Home');

        const handleLogin = (req, res) => res.send('Login');
        
        const middleware = (req, res, next) => {
            console.log('middleware');
            next();
        }

        // 위에서 아래로 실행되기 때문에 middleware는 아래에 있는 controller에게만 적용된다.
        // 여러 middleware를 같이 사용할 수 있다. 
        app.use(Middleware)
        app.get('/', handleHome)
        app.get('/login', handleLogin)

    ```

## Third party middleware
- express가 제공하는 built-in middleware가 아닌 추가로 설치하여 사용해야 하는 미들웨어이다.

### Morgan
- 로그 관리를 위한 미들웨어
- `npm install morgan` 설치
```js

  import morgan from 'morgan';

  // morgan은 여러가지 옵션이 있다.
  const logger = morgan('dev');

  app.use(logger);

```

# Router
- 사용자의 요청 경로(path)를 보고 이 요청을 처리할 수 있는 곳(contorller)으로 기능을 전달해주는 역할
- 어플리케이션 엔드 포인트(URI)의 정의, URI가 사용자 요청에 응답하는 방식을 말한다.
- 카테고리 별로 경로를 그룹화한다.</br></br>
- **`express.Router()`** 사용
```js

  // .Router 메소드로 라우터를 만들어준다.
  const Router = express.Router();
  const videoRouter = express.Router();

  // middleware로 라우터 경로를 설정해준다.
  app.use('/', Rotuer);
  app.use('/videos', videoRouter);

  // controller
  const home = (req, res) => res.send('Home')
  const editVideo = (req, res) => res.send('Edit Video')

  // 사용자가 '/'(root url)로 요청했을 때 응답하는 코드
  Router.get('/', home)

  // 사용자가 '/videos/edit' url로 요청했을 때 응답하는 코드
  userRouter.get('/edit', editVideo)

```
- - `.use()`를 사용해 각 카테고리별 대표 경로를 정의하고, 콜백함수로 연결시켜줄 Router를 적용해준다.
    - 사용자가 어떠한 url로 접근 시 그에 해당하는 router로 연결해주고 그 router에서 그 url에 해당하는 controller를 찾아줄것이다.
    - 위의 코드로 예를 들면 사용자가 /videos/edit라는 url로 접근한다고 했을 때
    - 먼저 서버는 /videos url이 들어오면 app.use의 videoRouter 실행시킨다. 그 다음 videoRouter에서 /edit와 일치하는 editVideo 실행시킨다.

- **controllers**와 **routers** 폴더를 만들어서 router 별로 분리하기
  - 각 카테고리 별로 router 파일과 controller 파일을 만든다.
    ```js
      
      // src/routers/Router.js

      import express from 'express';

      const Router = express.Router();

      Router.get('/', )

      export default Router;

    ```
  - server.js에 router파일을 import 해서 사용한다.  
    ```js

      // src/server.js

      import Router from './routers/Router';

      app.use('/', Router);

    ```

## Dynamic Routing(동적 라우팅)
- Routes의 경로에 특정 값을 넣어 해당 페이지로 이동할 수 있게 하는 것을 말한다.

### 동적 URL
- url에 `:(콜론)`을 사용해 변수로 만들어 주고 사용자가 원하는 값을 넣고 요청하면 데이터를 응답한다.
```js

  // src/routers/userRouter.js

  import express from 'express';

  const videoRouter = express.Router();

  // 해당 router는 /users/:id 와 같다
  videoRouter.get('/:id', video);

  export default videoRouter;

```
- 예를 들어 브라우저에서 /videos/234545 라고 요청이 들어오면 **234545** 이 부분이 `:id`로 인식이 되는 것이고 그에 해당하는 페이지를 응답한다.
- `:id`로 요청 받은 값은 `req.params`로 가져올 수 있다.
  - `{ id: 234545 }` 출력

> 정규표현식을 사용해서 변수에 원하늩 타입만 받을 수 있다.</br>

# Controller
- 어플리케이션의 로직을 담당
- 사용자 요청이 들어왔을 때 그에 해당 하는 데이터를 응답한다.
- `controllers` 폴더를 만들어 controller 파일들을 저장한다.
```js

  // src/controllers/homeController.js

  export const home = (req, res) => res.send('Home')

```
- default로 export를 하게 되면 하나의 모듈만 할 수 있으므로 각 controller를 export 해준다.
```js
  
  // src/routers/Router.js

  import { home } from '../controllers/homeController';

  const Router = express.Router();

  Router.get('/', home);

```
- 필요한 모듈을 import 해서 사용한다.

# Template
- 템플릿 엔진이란 템플릿을 읽어 엔진의 문법과 설정에 따라서 파일을 HTML 형식으로 변환시키는 모듈이다.
- 엔진 종류로는 pug과 ejs가 있다.
- `npm install pug` 설치
- express 설정을 해주어야한다.
```js

  // scr/server.js

  // view engine으로 pug을 사용하겠다고 알려주는 것이다.
  app.set('view engine', 'pug');

```

## 사용하기
- express는 기본적으로 process.cwd() + /views 폴더에서 템플릿을 찾는다
  - process.cwd() = node.js를 실행하는 파일(package.json)이 있는 폴더  
- /views 폴더를 만들고, 폴더 안에 pug 파일을 작성한다.
- 다른 폴더에 views를 생성하면 설정을 바꿔주어야 한다.
```js

  app.set('views', process.cwd() + '/src/views')

```
- controller에서 `.render()` 메소드를 이용해 불러온다.
```js

  // src/controllers/homeController.js

  export const home = (req, res) => res.render('home');

```

## 문법
- 하위 태그는 공백으로 구분한다.
```pug

   //- src/views/home.pug

  doctype html
  html(lang='ko')
    head
      title Home
    body
      h1 Home
      footer &copy; 2021 
```

### javascript 사용
- `#{}`안에 변수나 javascript를 사용한다. 
  
#### javascript 문법 사용
```pug

  footer &copy; #{new Date.now().getFullYear()} Wetube

```

##### Conditionals
- javascript의 조건문을 사용할 수 있다.
```pug

  header
    nav
      ul
        //- 사용자의 로그인 여부에 따라 다르게 보여주는 nav를 예를 든 것
        if user.loggedIn
          li
            a(href='/logout') Logout
        else
          li
            a(href='/login') Login

```

##### Iteration
- javascript의 반복문을 사용할 수 있다.
```js

  export const home = (req, res) => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    return res.render('home', { arr });
  }

```
```pug

  //- home.pug

  ul
    each value in arr
      li=value
    //- 1부터 7까지 출력
    else
      li Nothing found.
    //- 배열이 비어있으면 else 문이 실행된다.

```

### mixins
- 같은 형태의 블록이 서로 다른 데이터를 가져야 할 때 사용한다.
```js

  //- homeContorller.js

  export const home = (req, res) => {
    const videos = [
      {
        title: 'a',
        rating: 5,
        views: 46,
      },
      {
        title: 'b',
        rating: 2,
        views: 46,
      },
      {
        title: 'c',
        rating: 0,
        views: 46,
      },
    ]
    return res.render('home', { videos });
  }

```
- mixin 생성
```pug

  //- mixins/people.pug

  mixin videos(video)
    div
      h4=video.title
      h6=video.rating
      h5=video.views

```
- mixin 사용
```pug

  //- home.pug

  include mixins/people

  main
    each video in videos
      +videos(video)

```
- +videos는 mixins 파일의 mixin과 이름이 같아야 한다.

#### express 변수 사용
- controller에서 template으로 변수 넘겨주기
- `.render()`의 두번째 인자로 객체를 넘겨준다.
```js

  // src/controller/homeController.js

  export const home = (req, res) => res.render('home', { pageTitle: 'Home' })

```
- pug에서 변수 받아서 사용하기
```pug

  //- src/views/home.pug
  
  body
      header #{pageTitle}

      header=pageTitle
      //- 태그에 변수 하나만을 사용할 때는 = 으로 사용가능하다.

```

### Partials
- header나 footer같이 여러 페이지에 중복되는 코드를 재사용할 수 있게 해주는 것
- partials 폴더 생성 후 폴더안에 필요한 파일을 작성한다.
```pug

  //- src/views/partials/footer.pug

  footer &copy; #{new Date.now().getFullYear()} 

```
- partials가 필요한 pug 파일에서 `include`로 사용한다.
```pug

  //- src/views/home.pug

  body
    include partials/footer.pug

```

### Layout
- 여러 페이지에서 반복되는 layout 코드를 한 파일에 작성해 다른 페이지에서 확장해서 사용할 수 있다.
- block 키워드로 파일마다 다른 내용을 넣을 수 있게 만들어준다.
  - [block blockName]
```pug

  //- src/views/base.pug

   doctype html
  html(lang='ko')
    head
      title Home
    body
      //- base.pug 파일을 확장해서 사용하는 파일들이 서로 다른 코드를 넣을 수 있게 block을 만든 것
      block content

      include partials/footer.pug
      
```
- `extends` 키워드로 사용
```pug

  //- scr/views/home.pug

  extends base.pug

  //- 확장한 base.pug의 content block에 코드를 넣는다.
  block content
    h1 Home

```

# Database
- mongoDB와 mongoose를 사용한다.

## mongoDB
- 문서지향 저장소를 제공하는 NoSQL 데이터베이스이다.
- 데이터는 Document로 불리고, 데이터들의 집합을 Collection이라고 한다.
- NodeJS와 호환이 좋기 때문에 NodeJS에서 가장 많이 사용되는 데이터베이스이다.
  
### NoSQL
- 관계형 데이터 모델을 사용하지 않고 SQL을 사용하지 않는 데이터베이스 시스템 또는 데이트 스토어
- 단순한 키와 값의 쌍으로 이루어져있는 데이터베이스

## mongoose
- nodeJS에서 mongoDB와 상호작용하기 위해서 필요한 connector
- mongoose를 사용해 javascript로 서버와 mongoDB를 연결할 수 있다.

### ODM
- Object Document Mapping
- 객체와 문서의 1대1 매칭한다는 뜻
- Object는 자바스크립트의 객체이고, Document는 mongDB의 문서이다, 문서를 DB에서 조회할 때 자바스크립트 객체로 바꿔주는 역할이라고 생각하면 된다.
  
### mongoDB에 연결하기
- 터미널 창에 `npm install mongoose` 설치
- 프로젝트 루트 경로에 `db.js` 파일 생성
  -  mongoDB와 연결 해주는 파일
- 터미널에 `mongo`를 입력했을 때 나오는 mongoDB의 url이 연결에 사용된다.
```js

  // db.js

  import mongoose from 'mongoose';

  // server와 mongoDB의 database와 연결해주는 것
  mongoose.connect(mongoURL/dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: ture,
  });

  const db = mongoose.connection;

  const handleError = (error) => console.log('DB Error', error );
  const handelOpen = () => console.log('✅ Connected to DB');

  // database에 에러가 나면 이 이벤트가 발생한다.
  db.on('error', handelError);

  // database에 연결이 성공하면 이 이벤트가 발생한다.
  db.once('open',  handelOpen)

```
- `server.js`파일에 `db`를 import 해주면 서버를 실행시킬 때 자동으로 실행되고 database에 연결을 시도한다.
```js

  // server.js

  // 함수나 모듈을 import 한 것이 아닌 파일 자체를 import 한 것이다.
  import './db';

```

## model 생성
- database가 model을 생성하기 위해서 데이터들이 어떻게 구성되는지 알려주어야 한다.
- 데이터들의 형식과 형태(key의 타입)을 설정해준다.
- 예를 들어 데이터베이스에 동영상을 저장한다고 할 때 동영상 model을 생성해본다.
  - models 폴더 -> `Video.js` 파일 생성
    ```js
      
      // Video.js

      import mongoose from 'mongoose';
      
      const videoSchema = new mongoose.Schema({
        title: {
          type: String,  
          required: true,
          trim: true,
          maxLangth: 80
        },
        description: {
          type: String,  
          required: true,
          trim: true, // 문자열의 좌우 공백을 없애준다.
          maxLength: 140, // 최대 허용 글자 수 => template input 속성도 설정해준다.
        },
        createAt: { 
          type: Date,  // 데이터 타입 설정
          required: true, // true = 필수 값
          default: Date.now // 기본값
        },
        hashtags: [{type: String, trim: true}],
        meta: {
          views: {
            type: Number, 
            default: 0,
          },
          rating: {
            type: Number, 
            default: 0,
          },
        },
      });

      // model을 생성하는데 model 이름과, 데이터의 형태인 schema로 구성된다.
      const Video = mongoose.model('Video', videoSchema);

      export default Video;

    ```
    - 작성한 스키마를 기준으로 데이터를 DB에 넣기 전에 먼저 검사하고, 스키마에 어긋나는 데이터가 있으면 에러를 발생시킨다.
    - 스키마는 타입뿐만 아니라 여러 옵션을 설정할 수 있다.

  - `server.js`파일에 `Video`를 import 해주면 서버를 실행시킬 때 자동으로 실행되고 database에 연결을 시도한다.
  - model을 미리 컴파일 해야지 사용하고 싶을 때 사용할 수 있다.
    ```js

      // server.js

      import './db';
      // 데이터베이스와 연결이 성공적으로 이루어졌을 때 video model을 인식시킨다.
      import './models/Video';
    
    ```

## model 사용
- controller 파일에 model을 import 해준다.
```js

  // controller.js

  import Video from '../models/Video';

```
- mongoose의 model들은 CRUD operation을 돕는 query 관련 function들을 제공한다.

### CRUD
- Create: 생성
- Read: 읽기
- Update: 수정
- Delete: 삭제

### **Read**
### .find()
- document(model)을 찾는 queries 메소드
- **callback function**이나 **promise** 두가지 사용방법이 있다.</br></br>

#### Callback Function
```js

  // controller.js

  import Video from '../models/Video';

  export const home = (req, res) => {
    // 괄호안에 configuration을 넣어주면 된다.
    Video.find({}, (error, videos) => {
      res.render('home', { videos }); // return문이 없어서 render가 실행된다.
    })
    // 중괄호는 search term라고 하고 비어있어으면 모든 값이라는 뜻이다.
    // callback은 데이터 베이스에서 인자로 error와 docs를 넘겨 받는다.
  };

```
- `Video.find({},` 부분까지 database에서 불러온 후 database에서 반응이 있으면 mongoose는 **error**와 **docs**의 값을 불러올 것이다.
- 그렇기 때문에 render메소드를 callback function안에 넣어준다.
- **callback**은 아무것도 **return**되지 않아야 한다.

#### Promise
```js

  // controller.js

  import Video from '../models/Video';
   
  export const home = async(req, res) => {
    try{
      const videos = await Video.find({});
      return res.render('home', { videos });
    } catch(error) {
      console.log(error)
      return null;
    }
  }

```
- **await**를 사용하면 데이터베이스의 응답을 받을 때 까지 다음 코드가 실행되지 않고 기다렸다가 응답이 있으면 다음 코드가 실행된다.
- **await**는 함수안에서만 사용가능하고 그 함수에 async를 작성해주어야 한다.
- promise를 사용하면 error를 처리해 줄 때 try / catch문을 사용하다.
  - try문을 실행하다 error가 발생하면 catch문을 실행한다.


### .findById()
- id로 document(model)을 찾는 queries 메소드
```js

  // controller.js

  import Video from '../models/Video';

  export const detail = async(req, res) => {
    const { id } = req.params
    const video = await Video.findById(id);
    if(!video){
      return res.render('404', { pageTitle: 'Video not found.' });
    } 
    return res.render('detail', { video });
  }

```
> database에 저장될 때 부여해주는 id는 16진수에 24바이트로 되어있다.</br>
> router에 동적 url을 설정해줄 때 `/:id([0-9a-f]{24})`와 같이 정규표현식을 사용할 수 있다.


### **Create**
### .create()
- document(model)을 데이터베이스에 저장하기 위한 queries 메소드
- `.create`는 save()메소드를 실행시킨다.
- 사용자에게 입력받을 폼
```pug

  //- upload.pug

  form(method='POST')
    input(name='title', placeholder='Title', required, type='text', maxlength=20)
    input(name='description', placeholder='Description', required, type='text', maxlength=140)
    input(name='hashtags', placeholder='Hashtags, separated by comma', required, type='text')
    input(type='submit', value='Save')

```
- 사용자의 입력을 받아 database에 upload하는 controller
```js

  // controller.js

  export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;

    // document(model) 생성
    // const video = new Video({
    //   title,
    //   description,
    //   createdAt: Date.now(),
    //   hashtages: hashtags.split(',').map(word => `#${word}`),
    //   meta: {
    //     views: 0,
    //     rating: 0
    //   },
    // })
    // // 생성 후 저장
    // await video.save();


    // create 메소드를 사용하면 생성 후 바로 저장 된다.

    try {
      await Video.create({
        title,
        description,
        hashtages,
      })
      return res.redirect('/');
    } catch(error) {
      console.log(error)
      // 에러가 발생하면 다시 업로드하는 페이지를 랜더한다.
      return res.render('upload', { pageTitle: error });
    }
  }

```

### **Update**
### .findByIdAndUpdate()
- id로 document(model)을 찾고 해당 document를 수정하는 queries 메소드
```js

  // controller.js

  export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
      return res.render('404', { pageTitle: 'Video not found.' });
    } 
    return res.render('edit', { video });
  }

  export const postEdit = async(req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    // exists 메소드는 document의 객체를 받는대신 데이터가 존재하면 true를 리턴한다.
    if(!video){
      return res.render('404', { pageTitle: 'Video not found.' });
    } 
    await Video.findByIdAndUpdate(id, {
      title, 
      description,
      hashtags,
    })
    return res.redirect(`/videos/${id}`);
  }

```

### **Delete**
### .findByIdAndDelete()
- id로 document(model)을 찾고 해당 document를 삭제하는 queries 메소드
```js

  export const deleteVideo = async(req, res) => {
    const { id } = req.params
    await Video.findByIdAndDelete(id)
    return res.redirect('/');
  }

```

- 삭제 Router
```js

  //  router.js

  videoRouter.route('/:id/([0-9a-f]{24})/delete').get(deleteVideo)

```

## Middleware
- document에 이벤트가 발생하기 전이나 후에 어떠한 동작을 실행하는 것
- middleware에 this를 바인딩하여 사용할 수 있고, 훅의 종류에 따라 가리키는 것이 다르다.

### .pre()
- 이벤트가 발생하기 전에 실핼되는 middleware
- `schema.pre([hook], [async function])`
```js

  // Video.js

  import mongoose from 'mongoose';
      
  const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLangth: 80 },
    description: { type: String, required: true, trim: true, maxLength: 140,  },
    createAt: {  type: Date, required: true, default: Date.now },
    hashtags: [{type: String, trim: true}],
    meta: {
      views: { type: Number, default: 0, },
      rating: { type: Number, default: 0, },
    },
  });

  // 아래 middleware는 document가 save()가 실행되기 전 즉, 저장되기 직전에 실행되는 것이다.
  videoSchema.pre('save', async function() {
    this.hashtags = this.hashtags[0].split(',').map(word => word.startsWith('#') ? word : `#${word}`)
  })

  // model이 생성되기 전에 만들어야 한다.

  // model을 생성하는데 model 이름과, 데이터의 형태인 schema로 구성된다.
  const Video = mongoose.model('Video', videoSchema);

  export default Video;

```

- **save hook**이 발생하면 async function이 실행되고 save hook의 this는 현재 저장할 document를 가리키는 것이다.
- document를 가리키는 this는 `validate, save, remove, init(synchronous)` hook에서만 바인딩 되기 때문에 다른 미들웨어 함수에서는 다른 방법을 사용해야 한다. 
- `.static()`을 이용해 메소드를 직접 만들어 document를 변경하는 방법이 있다.

### .static()
- queries 메소드들 같이 원하는 함수를 만들 수 있다.
- schema.static([메소드 이름], [함수])
```js

  // Video.js

  videoSchema.static('formatHashtags', function (hashtags) {
    return hashtags[0].split(',').map(word => word.startsWith('#') ? word : `#${word}`);
  })

```
- import를 하지 않아도 사용할 수 있다.
```js

  // controller.js

  export const postEdit = async(req, res) => {
    await Video.findByIdAndUpdate(id, {
      title, 
      description,
      hashtags: Video.formatHashtags(hashtags),
    })
    return res.render('edit', { video });
  }

```

## Search
- Router
```js

  // Router.js

  Router.get('/serach', search)

```
- controller
```js

  // controller.js

  export const search = async(req, res) => {
    const { keyword } = req.query
    let videos = [];
    if(keyword){
      videos = await Video.find({
        title: {
          // 정규표현식을 이용해 검색 설정을 해줄 수 있다.
          // mongoDB에서 제공하는 operator를 통해 find()에 옵션을 줄 수 있다.
          $regex: new RegExp(keyword, 'i') // 정규표현식 객체 생성자 함수를 사용해 정규표현식 사용
        },
      })
    }
    return res.render('search', { pageTitle: 'Search', videos });
  }

```

- template
```pug

  //- search.pug
  extends base.pug
  include mixins/video

  block content
    form(method='GET')
      input(placeholder='Search by title', type='text', name='keyword')
      input(type='submit', value='Search now')

    div
      each video in videos
        +video(video)

```

# 에러처리
## async/await 에러
- await문에서 에러가 나면 javascript는 더 이상 코드를 실행시키지 않는다.
- try / catch문을 사용하고, 에러가 발생하면 실행될 catch문에 페이지를 다시 랜더하고 페이지에 보여줄 에러 메시지를 넘겨준다.
```js

  // controller.js
  
  export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body

    try {
      throw error
      return res.redirect('/');
    } catch(error) {
      console.log(error)
      // 에러가 발생하면 다시 업로드하는 페이지를 랜더한다.
      return res.render('upload', { pageTitle: 'Upload Video', errorMessage: error._message });
    }
  }

```
- template에서 조건문을 사용해 에러메세지 작성
```pug

  //- upload.pug

  extends base.pug

  block content
    if errorMessage
      span=errorMessage
    form
      input...
      input...

```

# 코드 정리
- 프로그램을 만들면서 코드가 길어지면 여러 파일로 나누는게 좋다.
- `init.js`를 생성하고 데이터베이스와 서버를 실행하는 코드를 옮겨준다.
```js

  // init.js

  import './db';
  import './models/Video';
  import app from './server';

  const PORT = 4000;

  const handleListning = () => console.log(`Server listening on port http://localhost:${PORT}`)

  app.listen(PORT, handleListning);

```
- 기존의 `server.js`파일에는 express application의 configuration에 관련된 코드를 작성한다.
- `package.json`의 script도 바꿔준다.
```js

  "scripts": {
    "dev": "nodemon --exec babel-node src/init.js"
  },

```

## .env 환경변수
- 어느 환경에 배포하느냐에 따라서 다르게 설정해야하는 항목은 보통 운영체제 레벨에서 환경 변수를 통해 관리하게 된다.
- DB password나 API key와 같은 인증 정보는 공개된 코드 저장소에 올리면 안되기 때문에 환경 변수로 저장해놓고 사용하는 것이 일반적이다.
- `npm install dotenv` 설치
```js

  //init.js

  import 'dotenv/config';
  // 서버가 실행될 때 제일 먼저 실행되게 import 해준다.

```
- package.json이 있는 폴더에 `.env` 파일 생성
- .env 파일은 gitignore에 추가
```env

  # .env

  DB_URL=mongodb://127.0.0.1:27017/wetube


```
- 대문자로 작성한다.
```js

  // .js

  mongoose.connect(process.env.DB_URL, {});


```
- `process.env.[변수명]`

# User Authentication
## **회원가입**
### User Model 생성
```js

  // models/User.js

  import mongoose from 'mongoose';

  const userSchema = new mongoose.Schema({
    // unique는 유일한 값을 의미한다.
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: String
  }) 

  const User = mongoose.model('User', userSchema);

  export default User;

``` 
> schema에 unique를 사용하면 경고가 뜬다.
> 경고를 무시해도 되지만 없애고 싶으면 `mongoose.connect`에 `useCreateIndex: true`를 추가하면 된다.

- join template 
```pug

  //- join.pug

  extends base.pug

  block content
    form(method='POST')
      input(placeholder='Name', name='name', type='text', required)
      input(placeholder='Email', name='email', type='email', required)
      input(placeholder='Username', name='username', type='text', required)
      input(placeholder='Password', name='password', type='password', required)
      input(placeholder='Confirm Password', name='password2', type='password', required)
      input(placeholder='Location', name='location', type='text', required)
      input(type='submin', value='Join')
    hr
    div
      span Already have an accout? 
      a(href='/login') Login &rarr;

```
- join controller
```js

  // controller.js

  import User from '../models/User';

  export const getJoin = (req,r es) =>  {
    return res.render('join', { pageTitle: 'Join' })
  }

  export const postJoin = async(req, res) => {
    const { email, username, password, password2, name, location}
    // exists메소드에 $or operator를 사용해 조건중 하나라도 true이면 true를 return한다.
    const exists = await User.exists({ $or: [{ username }, { email }] })

    // 비밀번호와 확인 비밀번호가 같은지 확인
    if(password !== password2){
      // 에러를 출력하고 있는 걸 브라우저는 모르기 때문에 에러를 render할 때는 status메소드를 사용해 status code를 같이 응답해준다.
      return res.status(400).render('join', { pageTitle: 'Join', errorMessage: 'Password confirmation does not match' })
      // template에 에러메시지 표시를 위한 코드를 작성해준다.
    }

    if(exists){
      return res.status(400).render('join', { pageTitle: 'Join', errorMessage: 'This username/email is already  taken' })
      // template에 에러메시지 표시를 위한 코드를 작성해준다.
    }

    try{
      await User.create({
        email,
        username,
        password,
        name,
        location
      })
      return res.redirect('/login')

    }catch(error) {
      return res.status(400). render('join', {  pageTitle: 'Join', errorMessage: error._message })
    }
  }


```
> 콘솔창에 **DeprecationWarning**경고가 뜨면 오래된 기능을 업데이트 하라는 것이다.

- join routing
```js

  // router.js
  import { getJoin, postJoin } from '../controllers/conroller.js';

  Router.route('/join').get(getJoin).post(postJoin)

```

## password hash
###  bcrypt 사용
- 단방향 암호화를 위해 만들어진 해시 함수
- `npm install bcrypt` 설치
```js

  // models/User.js

  import mongoose from 'mongoose';
  import bcrypt from 'bcrypt';

  const userSchema = new mongoose.Schema({
    // unique는 유일한 값을 의미한다.
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: String
  }) 

  userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 5);
  })

  const User = mongoose.model('User', userSchema);

  export default User;
  
```
- .pre 메소드를 사용해 user를 저장하기 전에 password를 해싱해준다.
- bcrypt.hash 함수에 해싱할 데이터를 넣고 몇 번 해싱을 할건지 입력해준다.

## **Login**
- login template
```pug

  //- login.pug

  extends base.pug

  block content
    if (errorMessage)
      span=errorMessage
    form(method='POST')
      input(placeholder='Username', name='username', type='text', required)
      input(placeholder='Password', name='password', type='password', required)
      input(type='submin', value='Login')
    hr
    div
      span Don't have an accout? 
      a(href='/join') Create one now &rarr;

```

- controller
```js

  // controller.js

  import User from '../models/User';
  import bcrypt from 'bcrypt';

  export const getLogin = (req, res) => {
    return res.render('login', { pageTitle: 'Login' })
  }

  export const postLogin = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user){
      return res.status(400).render('login', { 
        pageTitle: 'Login', 
        errorMessage: 'An account with this username does not exists.' })
    }
    const ok = await bcrypt.compare(password, user.password)
    if(!ok){
      return res.status(400).render('login', { 
        pageTitle: 'Login', 
        errorMessage: 'Wrong password' })
    }
    res.redirect('/');
  }
  
```

- Router 변경
```js

  // router.js

  import { getLogin, postLogin } from '../controllers/conroller.js';

  Router.route('/login').get(getLogin).post(postLogin);

```

## session & cookie
### cookie
- 사용자의 정보가 웹서버를 통해 사용자의 컴퓨터에 직접 저장되는 정보의 단위
- session ID를 저장한다.
- Domain: 쿠키가 어디에서 왔는지, 어디로 가야하는지 알려주는 것
- expires/max-age: 만료날짜

### session
- 일정 시간동안 같은 사용자(브라우저)로 부터 들어오는 일련의 요구를 하나의 상태로 보고 그 상태를 일정하게 유지시키는 기술
  - 일정시간은 방문자가 웹브라우저를 통해 웹서버에 접속한 시점으로부터 웹브라우저를 종료하여 연결을 끝내는 시점
- 방문자의 요청에 따른 정보를 웹서가 세션 아이디 파일을 만들어 서비스가 돌아가고 있는 웹서버에 저장하는 것이다.
> [Session & Cookie](https://github.com/juuunobae/TIL/blob/main/Computer%20Science/Session%20%26%20Cookie.md)
- `npm install express-session` 설치
  - express에서 session을 처리할 수 있게 해주는 미들웨어
```js

  // server.js

  import session from 'express-session';

  // router보다 먼저 초기화 해준다.
  app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: false,
  }))

```
- secret: 쿠키에 서명, 해당 서버가 쿠키를 발급했다는 걸 인증하기 위함이다.
- resave: 세션을 변경 사항 없이도 저장할 것인가
- saveUninitialized: 세션을 초기화 전에도 저장할 것인가
  - 로그인 된 사용자(브라우저)만 세션을 저장하려면 false
  - 로그인이 되면서 session 객체가 변경이 되는데 그 때만 저장하겠다는 것이다.
    - 객체가 변경되는 곳
      - 로그인 post method controller
      - `req.session.loggedIn = true; req.session.user = user;`

  </br>
- controller
```js

  // controller.js

  export const postLogin = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user){
      return res.status(400).render('login', { 
        pageTitle: 'Login', 
        errorMessage: 'An account with this username does not exists.' })
    }
    const ok = await bcrypt.compare(password, user.password)
    if(!ok){
      return res.status(400).render('login', { 
        pageTitle: 'Login', 
        errorMessage: 'Wrong password' })
    }

    req.session.loggedIn = true;
    req.session.user = user;
    // req.session.user에 로그인한 user 정보를 넣어주었기 때문에 모든 controller에서 사용할 수 있다.
    
    res.redirect('/');
  }

```
- 방문자가 웹사이트에 방문하면 server에서 session ID를 만들어 브라우저로 보내주고, 브라우저는 쿠키에 session ID만 저장하고 server도 그 session ID와 session data는 서버 session storage에 저장한다.
- 브라우저가 해당 웹사이트의 모든 url에 요청을 보낼 때 마다 session ID를 요청과 함께 보낸다.
  
- 로그인 된 사용자에게만 보여질 template
```pug

  //- base.pug

  if loggedIn
    li
      a(href='/logout') Logout
  else
    li 
      a(href='/join') Join
    li
      a(href='/Login') Login

```

- template에서 req.session 객체를 사용하려면 locals 객체를 이용해 middleware를 만들어준다.
  - locals는 pug에서 접근할 수 있는 객체이고, template에서 전역으로 변수를 사용할 수 있게 해준다.
```js

  // middlewares.js

  export const localasMiddleware = (req, res, next) => {
    // res.locals.[변수명] = [값]
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = 'Wetube';
    next();
  })


  // server.js
  
  import { localsMiddleware } from './localasMiddleware'

  app.use(localsMiddleware)
 
```

### Session Store
- session을 저장하는 곳
- 서버의 session storage는 실제 사용하기 위해 있는 건 아니다.
- 서버가 재식작되면 store도 재시작되기 때문에 브라우저가 가지고 있던 cookie는 유효하지 않게 되어버린다.
- 그렇기 때문에 session을 데이터베이스에 저장해야 한다.
- `npm install connect-mongo` 설치
  - mongoDB의 session store이다.
```js

  // server.js

  import MongoStore frmo 'connect-mongo';

  app.use(session({
    secret: '',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongo: '[mongoDB url]' })
    // store에 session이 저장 될 곳을 설정해줄 수 있다.
  }))

```