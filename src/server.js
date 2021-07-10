import express from "express"; // express 모듈 import
import morgan from "morgan"; // logging 모듈 import

// Router import
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// express application을 app 변수에 저장
const app = express();
// morgan 모듈을 logger 변수에 저장
const logger = morgan("dev");

// template 엔진 종류와 template 파일이 저장되어있는 폴더를 알려준다.
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// middleware
app.use(logger);
// request.body를 사용하기 위해 데이터 파싱
app.use(express.urlencoded({ extended: true }));
// Routing
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
