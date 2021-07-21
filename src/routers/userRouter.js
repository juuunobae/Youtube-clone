import express from "express";
import {
  finishLoginGithub,
  getChangePasswored,
  getEdit,
  logout,
  postChangePassword,
  postEdit,
  see,
  startLoginGithub,
} from "../controllers/userController";
import { protectorMiddleware, publicMiddleware, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout); // localhost:4000/users/login
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit); // localhost:4000/users/:id/edit
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePasswored)
  .post(postChangePassword);
userRouter.get("/github/start", publicMiddleware, startLoginGithub);
userRouter.get("/github/finish", publicMiddleware, finishLoginGithub);
userRouter.get("/:id", see); // localhost:4000/users/:id (id = 각 model의 id가 들어갈 변수)

export default userRouter;
