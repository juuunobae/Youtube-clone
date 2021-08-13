import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// 필요한 html 태그들을 모두 불러온다.
const startBtn = document.getElementById("startBtn"); // 녹화 시작 버튼 태그
const video = document.getElementById("preview"); // 녹화 화면을 보여줄 태그

let stream;
let recorder;
let videoFile;

// 다운로 버튼을 누르면 실행될 콜백함수
const handleDownload = async () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/static/ffmpeg-core.js",
    // 404 에러 났을 때 해결 코드
    // '/express.static에서 추가한 url/ffmpeg-core.js'
  });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  await ffmpeg.run(
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement("a"); // a태그를 생성하고 a 변수에 저장
  a.href = mp4Url; // a 태그의 링크를 녹화한 비디오 주소로 설정해준다.
  a.download = "MyRecorder.mp4"; // 링크를 다운로드할 수 있게 해주고, 초기 이름을 지정해준다.
  document.body.appendChild(a); // a태그를 body에 추가해준다.
  a.click(); // a의 클릭을 발생시킨다.

  const thumbA = document.createElement("a"); // a태그를 생성하고 a 변수에 저장
  thumbA.href = thumbUrl; // thumbA 태그의 링크를 녹화한 비디오 주소로 설정해준다.
  thumbA.download = "thumbnail.jpg"; // 링크를 다운로드할 수 있게 해주고, 초기 이름을 지정해준다.
  document.body.appendChild(thumbA); // a태그를 body에 추가해준다.
  thumbA.click(); // a의 클릭을 발생시킨다.
};

// 녹화 중지 버튼을 누르면 실행될 콜백함수
const handleStop = () => {
  startBtn.innerText = "Download Recording"; // 녹화 중지 버튼의 text를 다운로드로 바꿔준다.
  startBtn.removeEventListener("click", handleStop); // 녹화 중지 이벤트를 지운다.
  startBtn.addEventListener("click", handleDownload); // 다운로드 이벤트를 추가한다.
  recorder.stop(); // 녹화를 중지한다. dataavailable 이벤트 발생
};

// 녹화 시작 버튼을 누르면 실행될 콜백함수
const handleStart = () => {
  startBtn.innerText = "Stop Recording"; // 녹화 시작 버튼의 text를 녹화 정지로 바꿔준다.
  startBtn.removeEventListener("click", handleStart); // 녹화 시작 이벤트를 지운다.
  startBtn.addEventListener("click", handleStop); // 녹화 중지 이벤트를 추가한다.

  // 화면에 보여지고 있던 비디오를 기롤하는 객체를 만들어 recorder 변수에 저장한다.
  // (녹화할 데이터, { 옵션 })
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

  // 녹화가 중지되면 실행될 이벤트
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data); // 이벤트가 발생하면서 응답해준 blob 데이터(녹화한 비디오)를 event객체의 키인 data에서 불러와 url로 만들어 videoFile 변수에 저장해준다.
    video.srcObject = null; // 비디오가 참조하는 값을 빈 값으로 만들어 준다.
    video.src = videoFile; // 비디오의 소스 주소를 녹화한 비디오로 변경해준다.
    video.loop = true; // 비디오 무한 반복
    video.play(); // 녹화된 비디오를 재생시켜준다.
  };
  recorder.start(); // 녹화를 시작한다.
};

// 현재 JS 파일이 로드되면 실행
const init = async () => {
  // 사용하는 기기의 장치를 불러와 미디어 입력장치 권한을 요청하고, 미디어의 스트림을 리턴해 stream변수에 저장한다.
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream; // 비디오가 현재 미디어 스트림을 참조하게 한다.
  video.play(); // 비디오를 재생시킨다.
};

// 함수 실행
init();

// 이벤트 리스너
startBtn.addEventListener("click", handleStart); // 녹화 시작 버튼을 누르면 실핻될 이벤트
