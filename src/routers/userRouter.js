import express from "express";
import { edit, remove, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", see); // localhost:4000/users/:id (id = 각 model의 id가 들어갈 변수)
userRouter.get("/:id/edit", edit); // localhost:4000/users/:id/edit
userRouter.get("/:id/remove", remove); // localhost:4000/users/remove

export default userRouter;
