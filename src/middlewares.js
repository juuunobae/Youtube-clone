// file을 upload 해주기 위해 필요한 미들웨어
import multer from "multer";

// 모든 template에서 변수를 사용할 수 있게 해주는 미들웨어
export const localsMiddleware = (req, res, next) => {
  // locals를 사용하면 template에서 사용할 수 있는 변수를 만들 수 있다.
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn); // 브라우저 session에 저장되어 있는 user의 유무를 불러와 현재 login 된 사용자가 있는 지 확인하는 변수 = login 되어 있으면 true
  res.locals.loggedInUser = req.session.user || {}; // 브라우저 session에 저장되어 었는 사용자 객체를 불러와 저장하는 변수, 없으면 빈객체를 저장한다.
  next();
};

// 로그인 된 사용자만 접근할 수 있는 페이지의 라우터에 적용할 미들웨어
// 로그인 된 사용자가 있으면 next()가 실행된다.
export const protectorMiddleware = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

// 로그인 되지 않은 사용자만 접근할 수 있는 페이지의 라우터에 적용할 미들웨어
// 로그인 된 사용자가 없으면 next()가 실행된다.
export const publicMiddleware = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

// 사용자의 프로필 사진을 업로드 할 때 사용되는 multer
export const uploadAvatar = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000, // 파일의 최대 크기를 지정해준다.
  },
});

// 비디오를 업로드 할 때 사용되는 multer
export const uploadVideo = multer({
  dest: "uploads/videos/",
});
