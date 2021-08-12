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
  .post(uploadAvatar.single("avatar"), postEdit); // localhost:4000/users/edit
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePasswored)
  .post(postChangePassword); // localhost:4000/users/change-password
userRouter.get("/github/start", publicMiddleware, startLoginGithub); // github에서 사용자 정보를 받아오기 위해 사용자를 github page로 보내는 router
userRouter.get("/github/finish", publicMiddleware, finishLoginGithub); // github에서 사용자 정보를 받아와 login을 마무리 하기 위한 router
userRouter.get("/:id", see); // localhost:4000/users/:id (id = 각 model의 id가 들어갈 변수)

export default userRouter;
