import express from "express"; // express 모듈 import
import morgan from "morgan"; // logging 모듈 import
import session from "express-session"; // session을 처리하기 위한 모듈 import
import MongoStore from "connect-mongo"; // session을 db에 저장하기 위한 모듈 import

// Router import
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// locals middelware import
import { localsMiddleware } from "./middlewares";

// express application을 app 변수에 저장
const app = express();
// morgan 모듈을 logger 변수에 저장
const logger = morgan("dev");

// template 엔진 종류와 template 파일이 저장되어있는 폴더를 알려준다.
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// session을 추가 하는 미들웨어
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 쿠키에 서명, 환경변수를 불러온다.
    resave: false, // 변경 사항이 없을 때만 저장
    saveUninitialized: false, // 세션을 초기화할 때만 저장
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }), // 세션을 저장할 데이터베이스 추가
  })
);

app.use(localsMiddleware);

// middleware
app.use(logger);

// request.body를 사용하기 위해 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// Routing
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/uploads", express.static("uploads"));

export default app;
