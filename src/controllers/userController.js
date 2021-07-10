import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { username, email, name, password, location } = req.body;
  await User.create({
    username,
    email,
    name,
    password,
    location,
  });
  return res.redirect("/login");
};

export const edit = (req, res) => res.send("Edit");

export const remove = (req, res) => res.send("Remove");

export const login = (req, res) => res.send("Login");

export const logout = (req, res) => res.send("Logout");

export const see = (req, res) => res.send("See User");
