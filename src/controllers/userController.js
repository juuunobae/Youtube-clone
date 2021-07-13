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
    // 에러 status 코드와 에러메시지를 보내고 페이지를 새로 rendering한다.
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match",
    });
  }

  // 현재 입력한 username이나 email과 값이 데이터베이스에 존재
  if (exists) {
    // 에러 status 코드와 에러메시지를 보내고 페이지를 새로 rendering한다.
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

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong password",
    });
  }
  return res.redirect("/");
};

export const logout = (req, res) => res.send("Logout");

export const see = (req, res) => res.send("See User");
