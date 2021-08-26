import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

// join get method controller
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

// join post method controller
export const postJoin = async (req, res) => {
  const { username, email, name, password, password2, location } = req.body; // 사용자가 form으로 요청한 데이터
  const exists = await User.exists({ $or: [{ username }, { email }] }); // 현재 입력한 username과 email과 같은 값이 데이터베이스에 존재하는지 확인, 존재 = true

  // 비밀번화 확인 실패
  if (password !== password2) {
    // 에러 status 코드와 에러메시지를 보내고 페이지를 새로 rendering
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match",
    });
  }

  // 현재 입력한 username이나 email과 값이 데이터베이스에 존재
  if (exists) {
    // 에러 status 코드와 에러메시지를 보내고 페이지를 새로 rendering
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email is already taken",
    });
  }

  // 데이터베이스에 사용자를 새로 만들고 저장하는 코드
  await User.create({
    username,
    email,
    name,
    password,
    location,
  });

  // 회원가입이 성공적으로 완료되면 login하는 페이지로 redirect 시킨다.
  return res.redirect("/login");
};

// login get method
export const getLogin = (req, res) => {
  // login 페이지 render
  return res.render("login", { pageTitle: "Login" });
};

// login post method
export const postLogin = async (req, res) => {
  const { username, password } = req.body; // 사용자가 form으로 요청한 데이터
  const user = await User.findOne({ username, socialOnly: false });
  // password가 없는 social로만 가입한 사람들을 걸러내기 위해 socialOnly가 false인 사용자만 password로 로그인이 가능하게 해주어야 한다.
  // socialOnly가 false이면서 사용자가 입력한 username과 같은 데이터가 있는 model을 불러와 user에 저장
  if (!user) {
    // username을 찾지 못했을 시
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists.",
    });
    // 에러 status 코드와 에러 메시지를 보내고 페이지를 새로 rendering
  }

  // 일치하는 username이 있을 시 다음코드 실행
  const ok = await bcrypt.compare(password, user.password);
  // 사용자가 입혁한  password드를 해싱한 후 데이터베이스의 password와 일치하는지 비교

  if (!ok) {
    // password가 일치 하지 않을 경우 실행
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong password",
    });
    // 에러 status 코드와 에러 메시지를 보내고 페이지를 새로 rendering
  }

  // username, password 모두 일치할 경우 다음 코드 실행
  req.session.loggedIn = true; // session 객체에 로그인이 되었다고 loggedIn = true로 알려준다.
  req.session.user = user; // session 객체에 로그인이 된 user 정보를 추가해준다.

  return res.redirect("/");
  // 로그인이 성공적으로 완료되면 root 페이지로 redirect 시킨다.
};

// github에 사용자 정보를 요청할 때 실행되는 controller
export const startLoginGithub = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize"; // 사용자를 github의 로그인 페이지로 redirect 시키는 기본 url

  // parametes를 정의하는 객체
  // ID를 요청하면서 같이 보낼 데이터들
  const config = {
    client_id: process.env.GH_CLIENT, // github app을 생성할 때 받은 id
    allow_signup: false, // 회원가입 불가
    scope: "read:user user:email", // user정보와 user의 email정보를 요청
  };

  const params = new URLSearchParams(config).toString(); // config 객체를 url로 정보를 보낼 수 있게 만들어준다.
  const finalUrl = `${baseUrl}?${params}`; // 기본 url과 parameters url을 합쳐 사용자 정보를 요청할 최종 url
  return res.redirect(finalUrl); // 현재 controller가 실행될 router 경로로 사용자가 들어오면 최종 url로 redirect
};

// 사용자가 github에 로그인하고 해당 정보를 가지고 callback url로 돌아오면 실행될 controller
export const finishLoginGithub = async (req, res) => {
  // 사용자가 돌아오면서 github에서 준 code도 같이 온다.
  // 받아온 코드로 github에 접근할 수 있는 access token을 받아야 된다.
  const baseUrl = "https://github.com/login/oauth/access_token"; // access token을 요청하는 기본 url

  // parametes를 정의하는 객체
  // access token을 요청하면서 같이 보낼 데이터들
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code, // access token을 요청할 code
  };

  const params = new URLSearchParams(config).toString(); // config 객체를 url로 정보를 보낼 수 있게 만들어준다.
  const finalUrl = `${baseUrl}?${params}`; // 기본 url과 parameters url을 합쳐 access token을 요청할 최종 url

  // access token을 받기 위한 fetch 요청
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST", // POST method로 요청
      headers: {
        Accept: "application/json", // JSON으로 응답받기 위해 headers에 넣어서 요청
      },
    })
  ).json(); // 응답받은 JSON을 tokenRequest에 저장

  console.log(tokenRequest);

  // tokenRequest에 "access_token"가 있으면 실행
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest; //tokenRequest안에 있는 access_token
    const apiUrl = "https://api.github.com"; // github API를 요청하는 url

    // user정보에 대한 github API를 요청하는 fetch
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`, // 받아온 access token을 headers에 넣어서 요청
        },
      })
    ).json(); // 응답담은 JSON을 userData에 저장

    // user의 email 정보에 대한 github API를 요청하는 fetch
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`, // 받아온 access token을 headers에 넣어서 요청
        },
      })
    ).json(); // 응답담은 JSON을 emailData에 저장

    // 응답받은 emailData중에 해당하는 값만 찾아서 emailObj에 저장
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    // 찾는 값이 없으면 실행
    if (!emailObj) {
      return res.redirect("/login");
    }

    // github의 email과 같은 email의 user를 데이터베이스에서 찾고 user에 저장
    let user = await User.findOne({ email: emailObj.email });

    // 같은 email의 user가 없으면 실행
    if (!user) {
      // User model을 새로 생성해준다.
      user = await User.create({
        avatarUrl: userData.avatar_url,
        username: userData.login,
        name: userData.name,
        email: emailObj.email,
        password: "", // github로 로그인하면 비밀번호가 없기 때문에 비워놓는다.
        socialOnly: true, // 비밀번호 변경 링크를 보여주지 않기 위해 체크
        location: userData.location,
      });
    }

    req.session.loggedIn = true; // session 객체에 로그인이 되었다고 loggedIn = true로 알려준다.
    req.session.user = user; // session 객체에 로그인이 된 user 정보를 추가해준다.
    return res.redirect("/");
  } else {
    // user가 있다면 이미 생성된 같은 email이 있기 때문에 새로 생성할 필요가 없다.
    return res.redirect("/login");
  }
};

// 로그아웃 controller
export const logout = (req, res) => {
  // destroy 메소드로 session을 삭제해준다.
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};

// user edit get method
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

// user edit post method
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl, email: sessionEmail, username: sessionUsername },
    }, // 로그인 되어있는 사용자의 정보들
    body: { name, email, username, location }, // form으로 요청 받은 사용자 데이터
    file, // multer에서 넘겨 받은 file 객체
  } = req;

  console.log(file);

  // 로그인된 사용자의 기존 email이나 username과 다른 값이 form 요청으로 들어왔을 때 실행
  // 즉, 사용자가 email이나 username을 바꾸려고 할 때 실행된다.
  if (sessionEmail !== email || sessionUsername !== username) {
    // 데이터베이스에서 form에 입력된 email이나 username이 사용되고 있는 user 객체를 찾아서 findUser에 저장한다.
    const findUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    // 찾은 user가 있고 이 user ID와 session의 id가 다르면 실행
    // 바꾸려는 email이나 username이 이미 데이터베이스에 있으면 변경할 수 없다.
    // 바꾸려는 email이나 username을 가지고 있는 findUser가 현재 로그인 되어있는 사용자가 아니라면(id다르면) 에러 메시지를 띄운다.
    if (findUser && String(findUser._id) !== _id) {
      return res.status(400).render("edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This username/email is already taken",
      });
    }
  }

  // session에 저장(현재 login되어 있는 사용자)되어 있는 id에 해당하는 사용자를 데이터베이스에서 불러와 그 사용자의 정보를 수정해준다.
  const editUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.location : avatarUrl, // file이 있으면 file.path(새로운 사진)를 없으면 avatarUrl(원래 사진)을 저장
      name,
      email,
      username,
      location,
    },
    { new: true } // 수정된 객체를 반환한다.
  );
  req.session.user = editUser; // 수정된 사용자를 session.user에 저장

  return res.redirect("/users/edit");
};

// change-password get method
export const getChangePasswored = (req, res) => {
  // 소셜 로그인 인 사용자는 비밀번호가 없기 때문에 페이지에 접근할 수 없다.
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Can't change password");
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

// change-password post method
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    }, // 로그인되어 세션에 저장되어 있는 사용자의  ID와 password
    body: { currentPassword, newPassword, passwordConfirmation },
    // 사용자가 입력한 현재 password와 변경할 password, 확인할 password
  } = req;

  // 사용자가 입력한 현재 password를 해싱하여 이미 해싱되어 있는 기존 password와 일치하는 지 확인
  const ok = await bcrypt.compare(currentPassword, password);

  // session의 현재 password와 입력한 현재 password가 일치하지 않으면 실행
  if (!ok) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }

  // 변경할 password와 확인할 password가 일치하지 않으면 실행
  if (newPassword !== passwordConfirmation) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confimation",
    });
  }

  // 현재 로그인되어 있는 사용자에게서 얻은 id로 사용자 객체를 데이터베이스에서 불러온다.
  const user = await User.findOne({ _id });
  // 사용자 객체의 password 값을 변경할 password로 바꿔준다.
  user.password = newPassword;
  // 사용자 객체를 데이터베이스에 저장해준다.
  await user.save();
  // 현재 로그인되어 session에 저장되어 있는 사용자 객체의 pssword도 바뀐 password로 바꿔준다.
  req.session.user.password = user.password;
  req.flash("info", "Password updata");
  res.redirect("/users/logout");
};

export const see = async (req, res) => {
  // url에서 id값을 가지고 온다.
  const { id } = req.params;

  // populete를 두번 한것이다.
  // user가 생성한 videos를 populate하고 그 videos를 생성한 owner도 populate한다.
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });

  // 찾는 사용자가 없으면 실행
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found" });
  }
  return res.render("users/profile", { pageTitle: user.name, user });
};
