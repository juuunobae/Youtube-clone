import express from "express"; // express 모듈 import
import morgan from "morgan"; // logging 모듈 import
import session from "express-session"; // session을 처리하기 위한 모듈 import
import MongoStore from "connect-mongo"; // session을 db에 저장하기 위한 모듈 import
import flash from "express-flash"; // 사용자에게 메세지를 전달하기 위한 모듈 import

// Router import
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// locals middelware import
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

// express application을 app 변수에 저장
const app = express();
// morgan 모듈을 logger 변수에 저장
const logger = morgan("dev");

// template 엔진 종류와 template 파일이 저장되어있는 폴더를 알려준다.
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// flash를 사용하기 위한 미들웨어
app.use(flash());

// session을 추가 하는 미들웨어
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 쿠키에 서명, 환경변수를 불러온다.
    resave: false, // 변경 사항이 없을 때만 저장
    saveUninitialized: false, // 세션을 초기화할 때만 저장
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }), // 세션을 저장할 데이터베이스 추가
  })
);

// middleware
app.use(localsMiddleware);
app.use(logger);
// FFmpeg
// Uncaught (in promise) ReferenceError: SharedArrayBuffer is not defined
// 모든 router의 미들웨어로 설정하면 aws에서 파일을 불러올 때 에러가 발생한다.
// upload router에만 미들웨어를 추가 해준다.
// 에러 났을 때 해결 미들웨어
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

// request.body를 사용하기 위해 데이터 파싱
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// 브라우저에서 uploads로 시작하는 url로 접근을 하면 uploads 폴더로 보내준다.
// uploads 폴더는 업로드한 비디오들이 저장되어 있는 폴더
app.use("/uploads", express.static("uploads"));

// static으로 시작하는 url로 접근을 하면 assets 폴더로 보내준다.
// webpack으로 번들링 된 프론트엔드의 js 파일들이 저장되어있는 곳
// template에서 불러올 때 사용된다.
app.use(
  "/static",
  express.static("assets"),
  // 404 에러 났을 때 해결 코드
  express.static("node_modules/@ffmpeg/core/dist")
);

// video views의 카운트를 추가하는 api를 처리하는 router
app.use("/api", apiRouter);

export default app;
