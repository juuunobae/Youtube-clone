// node에서 fetch를 사용하기 위한 모듈
import fetch from "node-fetch";

// 필요한 html 태그들을 모두 불러온다.
const video = document.querySelector("video"); // video 태그
const playBtn = document.getElementById("play"); // 재샛 버튼 태그
const playBtnIcon = playBtn.querySelector("i"); // 재생 버튼의 아이콘 태그
const muteBtn = document.getElementById("mute"); // 음소거 버튼 태그
const muteBtnIcon = muteBtn.querySelector("i"); // 음소거 버튼 아이콘 태그
const currentTime = document.getElementById("currentTime"); // 현재 시간을 표시하는 태그
const totalTime = document.getElementById("totalTime"); // 비디오의 총 시간을 표시하는 태그
const timeline = document.getElementById("timeline"); // 비디오의 현재 재생 위치를 표시하는 레인지 인풋 태그
const volumeRange = document.getElementById("volume"); // 볼륨 크기를 표시하는 레인지 인풋 태그
const fullscreenBtn = document.getElementById("fullscreen"); // 큰화면 버튼 태그
const fullscreenBtnIcon = fullscreenBtn.querySelector("i"); // 큰화면 버튼 아이콘 태그
const videoControls = document.getElementById("videoControls"); // 비디오 컨트롤 버튼들의 div
const videoContainer = document.getElementById("videoContainer"); // 모든 비디오 태그들의 div

let volumeValue = 0.5; // 마지막 비디오 볼륨을 저장하기 위한 변수
video.volume = volumeValue; // 비디오의 최초 볼륨을 설정

let controlsTimeout = null; // 마우스가 비디오 위에서 떠나면 실행될 타임아웃의 리턴 값을 담기 위한 변수
let contorlsMouseMoveTimeout = null; // 마우스가 비디오 위에서 움직이고 멈췄을 때 실행될 타임아웃의 리턴 값을 담기 위한 변수

// 비디오를 재생, 일시정지 시킬 함수
const videoPlay = () => {
  // 비디오가 일시정시 되어있는 상태이면 실행
  if (video.paused) {
    video.play(); // 비디오를 재생시킨다.
  } else {
    // 비디오가 재생 되고있는 상태이면 실행
    video.pause(); // 비디오를 일시정지시킨다.
  }
  // ? 비디오가 일시정시 되어있는 상태이면 실행 : 비디오가 재생되고 있는 상태이면 실행 = 재생 버튼 아이콘을 변경
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

// 재생버튼을 눌렀을 때 실행될 콜백함수
const handlePlayClick = (e) => videoPlay();

// 비디오를 눌렀을 때 실행될 콜백함수
const handleVideoClickPlay = (e) => videoPlay();

// 스페이스를 눌렀을 때 실행될 콜백함수
const handleSpaceclickPlay = (e) => {
  // 키보드를 눌렀을 때 값이 space이면 실행
  if (e.code === "Space") {
    videoPlay();
  }
};

// 음소거 버튼을 눌렀을 때 실행될 콜백함수
const handleMuteClick = (e) => {
  // 이미 비디오가 음소거 상태일 때 실행
  if (video.muted) {
    video.muted = false; // 음소거 상태 해제
  } else {
    // 음소거 상태가 아닐 때 실행
    video.muted = true; // 음소거 상태 실행
  }
  // ? 비디오가 음소거 이면 실행 : 비디오가 음소거가 아니면 실행 = 음소거 버튼 아이콘을 변경
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  // 비디오가 음소거 이면 0 : 비디오가 음소거가 아니면 이전의 input value = 볼륨의 레인지 인풋 변경
  volumeRange.value = video.muted ? 0 : volumeValue;
};

// 볼륨을 조절할 때 실행될 콜백함수
const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e; // 이벤트가 실행되면서 받은 파라미터 event 객체에서 변경된 input 태그의 value 값을 불러온다.
  video.volume = value; // 비디오의 소리를 value와 같게 바꿔준다.

  // 볼륨조절을 할 때 비디오가 음소거 상태이면 실행
  if (video.muted) {
    video.muted = false; // 비디오 음소거 상태를 해제
    muteBtnIcon.classList = "fas fa-volume-mute"; // 비디오 음소거 버튼 아이콘을 변경
  }

  // 비디오 볼륨이 0이되면 실행
  if (video.volume === 0) {
    muteBtnIcon.classList = "fas fa-volume-mute"; // 비디오 음소거 버튼 아이콘을 변경
  } else {
    // 비디오 볼륨이 0 이상일 때 실행
    volumeValue = value; // 현재 볼륨 크기를 저장하는 전역변수에 value를 저장
    muteBtnIcon.classList = "fas fa-volume-up"; // 비디오 음소거 버튼 아이콘을 변경
  }
};

// 비디오 재생 시간 포맷을 만들어 주는 함수
const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5); // 표시할 시간의 포맷을 00:00으로 만들어준다.

// 비디오가 로딩을 완료하면 실행될 콜백함수
const handleLoadedMatadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration)); // 비디오의 총 시간을 표시할 태그에 넣어준다.
  timeline.max = Math.floor(video.duration); // 현재 재생 위치를 표시하는 레인지 인풋 태그의 max 값을 추가해준다.
};

// 비디오가 재생되고 시간이 흐를 때마다 실행될 콜백함수
const handleTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime)); // 현재 재생시간을 표시하는 태그에 현재 비디오의 재생되는 시점의 시간을 넣어준다.
  timeline.value = Math.floor(video.currentTime); // 현재 재생 위치를 표시하는 레인지 인풋 태그도 바꿔준다.
};

// 비디오의 재생구간을 변경할 때 실행될 콜백함수
const handleTimelinChange = (e) => {
  const {
    target: { value },
  } = e; // 이벤트가 실행되면서 받은 파라미터 event 객체에서 변경된 input 태그의 value 값을 불러온다.
  video.currentTime = value; // 그 value 값으로 비디오의 현재 재생시간을 변경해준다.
};

// 큰화면 버튼을 눌렀을 때 실행될 콜백함수
const handleFullscreenChange = () => {
  // 현재 풀스크릔으로 표시하고 있는 태그가 존재하면 true를 리턴하고, 없으면 null을 반환해 변수에 담아준다.
  const fullscreen = document.fullscreenElement;

  // 풀스크린의 태그가 있으면 실행
  if (fullscreen) {
    document.exitFullscreen(); // 풀스크린 모드로 표시되어 있는 모든 태그를 원래대로 돌려놓는다.
    fullscreenBtnIcon.classList = "fas fa-expand"; // 큰화면 버튼 아이콘을 변경한다.
  } else {
    // 풀스크린의 태그가 없으면 실행
    videoContainer.requestFullscreen(); // 모든 비디오 태그들을 풀스크린 모드로 바꿔준다.
    fullscreenBtnIcon.classList = "fas fa-compress"; // 큰화면 버튼 아이콘을 변경한다.
  }
};

// 타임아웃이 실행시킬 콜백함수
const hideControls = () => videoControls.classList.remove("showing"); // 컨트롤러 태그에서 showing 태그를 지워준다. 컨트롤러가 숨겨진다.

// 모든 비디오 태그를 담고 있는 div위에서 마우스가 움직일 때 실행될 콜백함수
const handleMouseMove = () => {
  // 마우스가 비디오 위에서 떠나면 실행될 타임아웃이 시작되고 있으면 실행
  // 마우스가 비디오 밖으로 나갔다가 3초가 지나기 전 다시 들어오면 실행
  if (controlsTimeout) {
    clearTimeout(controlsTimeout); // 현재 실행되고 있는 타임아웃을 없애준다.
    controlsTimeout = null; // 타임아웃의 리턴값을 담을 변수를 다시 null로 만들어준다.
  }
  // 마우스가 비디오 위에서 움직이고 있을 때 실행될 타임아웃이 시작되고 있으면 실행
  // 마우스가 비디오 위에서 계속 움직이면 계속 실행
  if (contorlsMouseMoveTimeout) {
    clearTimeout(contorlsMouseMoveTimeout); // 현재 실행되고 있는 타임아웃을 없애준다.
    contorlsMouseMoveTimeout = null; // 타임아웃의 리턴값을 담을 변수를 다시 null로 만즐어준다.
  }

  // 비디오 컨트롤러에 showing 클래스를 추가한다.
  videoControls.classList.add("showing"); // showing = 컨트롤러들을 보여주는 것

  // 마우스가 비디오 위에서 멈추고 3뒤에 컨트롤러를 숨길 타임아웃
  // 마우스 움직임 이벤트의 콜백함수의 실행 마지막에 항상 타임아웃이 실행될 것이다.
  // 계속 마우스가 움직이면 타임아웃은 없어질 것이고 3초 이상 마우스가 움직이지 않으면 타임아웃이 실행될 것이다.
  contorlsMouseMoveTimeout = setTimeout(hideControls, 3000);
};

// 모든 비디오 태그를 담고 있는 div위에서 마우스가 떠날 때 실행될 콜백함수
// 마우스가 비디오 밖으로 나가고 3초 뒤 컨트롤러들을 숨기기 위한 함수
const handleMouseLeave = () => {
  // 타임아웃을 실행시키고 변수에 담는다.
  controlsTimeout = setTimeout(hideControls, 3000);
};

// 비디오가 끝나면 실행될 콜백함수
const handleEnded = (e) => {
  // date attribute을 이용해 비디오의 id를 얻어온다.
  const { id } = videoContainer.dataset;
  // 해당 url로 api를 보낸다.
  // POST method로
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

// 이벤트 리스너
window.addEventListener("keydown", handleSpaceclickPlay); // 브라우저에서 키보드를 눌렀을 때 실행될 이벤트
playBtn.addEventListener("click", handlePlayClick); // 재생 버튼 태그를 눌렀을 때 실행될 이벤트
muteBtn.addEventListener("click", handleMuteClick); // 음소거 버튼 태그를 눌렀을 때 실행될 이벤트
volumeRange.addEventListener("input", handleVolumeChange); // 볼륨 크기 조절을 할 때 실행될 이벤트
video.addEventListener("loadeddata", handleLoadedMatadata); // 비디오가 로딩을 완료하면 실행될 이벤트
video.addEventListener("timeupdate", handleTimeupdate); // 비디오가 재생되고 시간이 흐를 때마다 실행될 이벤트
video.addEventListener("click", handleVideoClickPlay); // 비디오를 눌렀을 때 실행될 이벤트
video.addEventListener("ended", handleEnded); // 비디오가 끝나면 실행될 이벤트
timeline.addEventListener("input", handleTimelinChange); // 비디오의 재생위치를 변경할 때 실행될 이벤트
fullscreenBtn.addEventListener("click", handleFullscreenChange); // 큰화면 버튼을 눌렀을 때 실행될 이벤트
videoContainer.addEventListener("mousemove", handleMouseMove); // 모든 비디오 태그를 담고 있는 div위에서 마우스가 움직일 때 실행될 이벤트
videoContainer.addEventListener("mouseleave", handleMouseLeave); // 모든 비디오 태그를 담고 있는 div위에서 마우스가 떠날 때 실행될 이벤트
