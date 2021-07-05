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
    - [CRUD](#crud)
    - [model 생성](#model-생성)


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
- 터미널 창에 `git init` 설치
- github에서 repository 생성
- 터미널 창에 `git remote add [github repository url]` 설치

### package.json 파일 생성
- 터미널 창에 `npm init` 설치
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

    // server에 접속이 성공하면 실행 될 콜백함수
    const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

    // 외부에서 서버에 접속할 때 허용할 포트 설정, 접속에 성공하면 실행 될 콜백함수
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
    imput(name='name', placeholder='Name', type='text') <!-- name 속성은 req.body에 key값이 된다.-->
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
    user[id].name = name
    return res.redirect('/')
  })

```

## route
- `.route()`메소드를 이용하면 하나의 경로에 get, post request를 모두 처리해야 할 때 더 짧은 코드로 작성할 수 있다.
```js

   app.route('/').get().post()
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
- `.use()` 메소드
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

  const Router = express.Router();
  const userRouter = express.Router();

  const handleHome = (req, res) => res.send('Home')
  const handleEditUser = (req, res) => res.send('Edit User')

  app.use('/', Rotuer);
  app.use('/users', userRouter);

  Router.get('/', handleHome)
  userRouter.get('/edit', handleEditUser)

```
 - - `.use()`를 사용해 각 카테고리별 대표 경로를 정의하고, 콜백함수로 연결시켜줄 Router를 적용해준다.
    - 사용자가 어떠한 url로 접근 시 그에 해당하는 router로 연결해주고 그 router에서 그 url에 해당하는 controller를 찾아줄것이다.
    - 위의 코드로 예를 들면 사용자가 /users/edit라는 url로 접근한다고 했을 때
    - 먼저 서버는 /users라는 url이 들어오면 app.use의 userRouter를 실행시킨다. 그 다음 userRouter에서 /edit와 일치하는 handleEditUser를 실행시킨다.

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

  const userRouter = express.Router();

  // 해당 router는 /users/:id 와 같다
  userRouter.get('/:id', user);

  export default userRouter;

```
- 예를 들어 브라우저에서 /users/234545 라고 요청이 들어오면 **234545** 이 부분이 `:id`로 인식이 되는  것이고 그에 해당하는 페이지를 응답한다.
- `:id`로 요청 받은 값은 `req.params`로 가져올 수 있다.
  - `{ id: 234545 }` 출력

> 정규표현식을 사용해서 변수에 원하늩 타입만 받을 수 있다.</br>
> `("/:id(\\d+)", )` 숫자 타입의 요청만 받겠다는 것이다.

# Controller
- 어플리케이션의 로직을 담당
- 사용자 요청이 들어왔을 때 그에 해당 하는 데이터를 응답한다.
- `controllers` 폴더를 만들어 controller 파일들을 저장한다.
```js

  // src/controllers/homeController.js

  export const Home = (req, res) => res.send('Home')

```
- default로 export를 하게 되면 하나의 모듈만 할 수 있으므로 각 controller를 export 해준다.
```js
  
  // src/routers/Router.js

  import { Home } from '../controllers/homeController';

  const Router = express.Router();

  Router.get('/', Home);

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

  export const Home = (req, res) => res.render('home');

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

  //- homContorller.js

  export const home = (req, res) => {
    const people = [
      {
        name: 'a',
        age: 25,
        from: 'ko',
      },
      {
        name: 'b',
        age: 29,
        from: 'en',
      },
      {
        name: 'c',
        age: 20,
        from: 'ko',
      },
    ]
    return res.render('home', { people });
  }

```
- mixin 생성
```pug

  //- mixins/people.pug

  mixin people(people)
    div
      h4=people.name
      ul
        li #{people.age} years old
        li from #{people.from}

```
- mixin 사용
```pug

  //- home.pug

  include mixins/people

  main
    each person in people
      +people(person)

```

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

### CRUD
- Create: 생성
- Read: 읽기
- Update: 수정
- Delete: 삭제

### model 생성
- database가 model을 생성하기 위해서 데이터들이 어떻게 구성되는지 알려주어야 한다.
- 데이터들의 형식과 형태(key의 타입)을 설정해준다.
- 예를 들어 데이터베이스에 동영상을 저장한다고 할 때 동영상 model을 생성해본다.
  - models 폴더 -> `Video.js` 파일 생성
    ```js
      
      // Video.js

      import mongoose from 'mongoose';
      
      const videoSchema = new mongoose.Schema({
        title: String,
        description: String,
        createAt: Date,
        hashtags: [{type: String}],
        meta: {
          views: Number,
          rating: Number,
        },
      });

      // model을 생성하는데 model 이름과, 데이터의 형태인 schema로 구성된다.
      const Video = mongoose.model('Video', videoSchema);

      export default Video;

    ```
    - 작성한 스키마를 기준으로 데이터를 DB에 넣기 전에 먼저 검사하고, 스키마에 어긋나는 데이터가 있으면 에러를 발생시킨다.

  - `server.js`파일에 `Video`를 import 해주면 서버를 실행시킬 때 자동으로 실행되고 database에 연결을 시도한다.
    ```js

      // server.js

      import './db';
      // 데이터베이스와 연결이 성공적으로 이루어졌을 때 video model을 인식시킨다.
      import './models/Video';
    
    ```





---------
```js

  // controller.js

    // 우선 임의로 데이터베이스를 배열로 만든다.
    let videos = [
      {
        title: 'First Video',
        rating: 5,
        comments: 2,
        createdAt: '2 minutes ago',
        views:  59,
        id: 1,
      },
      {
        title: 'Second Video',
        rating: 5,
        comments: 2,
        createdAt: '2 minutes ago',
        views:  59,
        id: 2,
      },
    ]

    export const home = (req, res) => {
      return res.render('home', { pageTitle: 'Home', videos })
    }

    export const watch = (req, res)  => {
      // url path에 담겨 있는 정보는 req.params에 저장된다.
      const { id } = req.params;
      // 사용자가 url로 요청한 id에 해당하는 객체 불러오기
      const video = videos[id - 1];
      return res.render('watch', { pageTitle: `Watching ${video.title}`, video})
    }
```

- mixin에 링크를 걸어 해당 url에 부합하는 데이터를 보여주는 페이지로 이동
```pug

  //- mixins/video.pug

  mixin video(video)
    div
      h4
        //- router의 /videos/:id 경로로 갈 수 있게 링크를 만들어준다.
        a(href=`/videos/${id}`)=video.title
      ul
        li #{video.rating}/5.
        li #{video.comments} comments.
        li Posted #{video.createdAt}.
        li #{video.views} views.

```

```pug

  //- watch.pug

  extends base.pug

  block content
    h3 #{video.views} #{video.views === 1 ? 'view' : 'views' }
    a(href=`${video.id}/edit`) Edit Video &rarr;
    //- 경로 젤 앞에 /를 사용하지 않은 이유는 사용하면 루트 경로에서 시작 되게 설정 되기 때문이다.

```