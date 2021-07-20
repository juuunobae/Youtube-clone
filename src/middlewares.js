import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

export const publicMiddleware = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

export const uploadFiles = multer({
  dest: "uploads/",
});
