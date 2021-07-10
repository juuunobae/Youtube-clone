import mongoose from "mongoose";

// mongDB와 연결
// 터미널에 mongo를 입력했을 때 나오는 url과 /database 이름
mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

// 이벤트 발생 시 콜백함수
const handleError = (error) => console.log("❌DB Error", error);
const handleOpen = () => console.log("✅Connected DB");

// database 연결 시 에러가 발생하면 실행될 이벤트
db.on("error", handleError);

// database 연결 성공 시 실행될 이벤트
db.once("open", handleOpen);
