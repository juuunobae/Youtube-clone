import Video from "../models/Video";

// query method, callback function
// Video.find({}, (error, videos) => {
//   res.render("home", { pageTitle: "Home", videos });
// });

// 모든 비디오들이 보일 홈화면
export const home = async (req, res) => {
  // 데이터베이스에서 데이터를 불러올 때 생길 에러에 대비해 try/catch문 사용
  try {
    // 데이터베이스에서 모든 비디오를 불러와 videos 변수에 저장
    const videos = await Video.find({}).sort({ createdAt: "desc" }); // sort를 이용해 내림차순으로 정렬한 것\

    // 불러온 비디오들을 template 변수로 넘겨주고 render
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    // try 문에서 에러가 났을 때 실행
    console.log(error);
    res.end();
  }
};

// 각 비디오들의 상세 페이지
export const watch = async (req, res) => {
  const { id } = req.params; // 비디오의 id 값을 url에서 받아온다.
  const video = await Video.findById(id); // 받아온 id로 그와 일치하는 비디오를 데이터베이스에서 찾아 video 변수에 저장

  // id와 일치하는 video가 없을 때
  // url을 임의로 바꿨을 때
  if (!video) {
    // 에러 status code를 보내고 에러 template을 render한다.
    return res.status(400).render("404", { pageTitle: "Video not found." });
  }

  // 불러온 비디오를 template 변수로 넘겨주고 render
  return res.render("watch", { pageTitle: video.title, video });
};

// 비디오 수정의 get 요청
export const getEdit = async (req, res) => {
  const { id } = req.params; // 비디오의 id 값을 url에서 받아온다.
  const video = await Video.findById(id); // 받아온 id로 그와 일치하는 비디오를 데이터베이스에서 찾아 video 변수에 저장

  // id와 일치하는 video가 없을 때
  // url을 임의로 바꿨을 때
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  // 불러온 비디오를 template 변수로 넘겨주고 render
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

// 비디오 수정의 post 요청 form 처리
export const postEdit = async (req, res) => {
  const { id } = req.params; // 비디오의 id 값을 url에서 받아온다.
  const { title, description, hashtags } = req.body; // 사용자가 form으로 요청한 데이터
  const video = await Video.exists({ _id: id }); // id값과 같은 비디오가 데이터베이스에 있는지 확인

  // id와 일치하는 비디오가 없을 때
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  // url의 id값과 같은 비디오를 찾아서, 사용자가 요청한 form의 데이터를 데이터베이스에 업데이트하고 저장한다.
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags), // 직접 만든 static 함수로 hashtags에 '#'붙여주기
  });

  // 성공적으로 업데이트한 후 해당 비디오의 상세페이지로 redirect
  return res.redirect(`/videos/${id}`);
};

// 비디오 생성 get 요청
export const getUpload = (req, res) => {
  // upload template render
  return res.render("upload", { pageTitle: "Upload Video" });
};

// 비디오 생성 post 요청 form 처리
export const postUpload = async (req, res) => {
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body; // 사용자가 form으로 요청한 데이터

  // model 생성시 생길 에러를 대비해 try/catch문 사용
  try {
    // form에서 받은 데이터로 model을 생성하고 데이터베이스에 저장한다.
    await Video.create({
      title,
      fileUrl,
      description,
      hashtags: Video.formatHashtags(hashtags), // 직접 만든 static 함수로 hashtags에 '#'붙여주기
    });

    // 성공적으로 모델이 생성되면 root 경로로 redirect 한다.
    return res.redirect("/");
  } catch (error) {
    // try문에서 에러가 났을 때 실행

    // error._message의 에러메시지를 변수에 저장
    const errorMessage = error._message;
    // 에러메시지를 tmeplate으로 넘겨주고 render 한다.
    return res.render("upload", { pageTitle: "Upload Video", errorMessage });
  }
};

// 데이터베이스에서 비디오 삭제
export const deleteVideo = async (req, res) => {
  const { id } = req.params; // 비디오의 id 값을 url에서 받아온다.
  await Video.findByIdAndDelete(id); // 받아온 id와 일치하는 데이터를 데이터베이스에서 찾아 삭제한다.
  return res.redirect("/"); // root 경로로 redirect
};

// 비디오 검색
export const search = async (req, res) => {
  const { keyword } = req.query; // get method의 form으로 입력받은 데이터
  let videos = []; // 검색과 일치하는 비디오를 담을 배열 선언
  if (keyword) {
    // keyword에 값이 있으면 실행
    videos = await Video.find({
      // 사용자가 검색한 단어와 데이터베이스 비디오 model들의 title과 일치하는 값을 찾아 배열에 저장
      title: {
        $regex: new RegExp(keyword, "i"),
        // 정규표현식을 사용해서 일치하는 값을 여러 옵션을 찾아낼 수 있다.
      },
    });
  }
  // 찾은 비디오 배열을 template 변수로 넘겨주고 render
  return res.render("search", { pageTitle: `Searching by: ${keyword}`, videos });
};
