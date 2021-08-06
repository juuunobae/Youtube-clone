import fetch from "node-fetch";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const volumeRange = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreen");
const fullscreenBtnIcon = fullscreenBtn.querySelector("i");
const videoControls = document.getElementById("videoControls");
const videoContainer = document.getElementById("videoContainer");

let volumeValue = 0.5;
video.volume = volumeValue;

let controlsTimeout = null;
let contorlsMouseMoveTimeout = null;

const videoPlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handlePlayClick = (e) => videoPlay();

const handleVideoClickPlay = (e) => videoPlay();

const handleSpaceclickPlay = (e) => {
  if (e.code === "Space") {
    videoPlay();
  }
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  video.volume = value;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
  if (video.volume === 0) {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
  } else {
    volumeValue = value;
    video.volume = value;
    muteBtnIcon.classList = "fas fa-volume-up";
  }
};

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMatadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelinChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullscreenChange = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullscreenBtnIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullscreenBtnIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (contorlsMouseMoveTimeout) {
    clearTimeout(contorlsMouseMoveTimeout);
    contorlsMouseMoveTimeout = null;
  }
  videoControls.classList.add("showing");
  contorlsMouseMoveTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = (e) => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

window.addEventListener("keydown", handleSpaceclickPlay);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMatadata);
video.addEventListener("timeupdate", handleTimeupdate);
video.addEventListener("click", handleVideoClickPlay);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelinChange);
fullscreenBtn.addEventListener("click", handleFullscreenChange);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
