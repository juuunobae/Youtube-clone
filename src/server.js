// 서버가 실행될 때 database와 연결을 시도할 수 있게 db 파일을 import
import "./db";
// database와 연결이 성공했을 때 인식할 수 있게 Video model import
import "./models/Video";

import express from "express"; // express 모듈 import
import morgan from "morgan"; // logging 모듈 import

// Router import
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// server의 port 번호를 변수에 저장
const PORT = 4000;

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
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// 서버 실행이 성공하면 실행될 콜백함수
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

// 외부에서 서버에 접속할 때 허용할 포트 설정, 서버 실행에 성공하면 실행 될 콜백함수
app.listen(PORT, handleListening);
