import express from "express";
import {
  edit,
  finishLoginGithub,
  logout,
  see,
  startLoginGithub,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout); // localhost:4000/users/login
userRouter.get("/:id", see); // localhost:4000/users/:id (id = 각 model의 id가 들어갈 변수)
userRouter.get("/:id/edit", edit); // localhost:4000/users/:id/edit
userRouter.get("/github/start", startLoginGithub);
userRouter.get("/github/finish", finishLoginGithub);

export default userRouter;
