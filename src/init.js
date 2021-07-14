// 서버가 시작될 때 제일 처음 실행시켜주어야 한다.
import "dotenv/config";
// 서버가 실행될 때 database와 연결을 시도할 수 있게 db 파일을 import
import "./db";
// database와 연결이 성공했을 때 인식할 수 있게 Video model import
import "./models/Video";
// express application의 설정 코드가 있는 server.js를 import 해준다.
import app from "./server";

// server의 port 번호를 변수에 저장
const PORT = 4000;

// 서버 실행이 성공하면 실행될 콜백함수
const handleListening = () =>
  console.log(`✅Server listening on port http://localhost:${PORT}`);

// 외부에서 서버에 접속할 때 허용할 포트 설정, 서버 실행에 성공하면 실행 될 콜백함수
app.listen(PORT, handleListening);
