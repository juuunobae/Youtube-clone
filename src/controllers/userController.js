import User from "../models/User";
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
      errorMessage: "This username/email is already  taken",
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

export const edit = (req, res) => res.send("Edit");

export const remove = (req, res) => res.send("Remove");

// login get method
export const getLogin = (req, res) => {
  // login 페이지 render
  return res.render("login", { pageTitle: "Login" });
};

// login post method
export const postLogin = async (req, res) => {
  const { username, password } = req.body; // 사용자가 form으로 요청한 데이터
  const user = await User.findOne({ username }); // 사용자가 입력한 username과 같은 데이터가 있는 model을 불러와 user에 저장
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

export const logout = (req, res) => res.send("Logout");

export const see = (req, res) => res.send("See User");
