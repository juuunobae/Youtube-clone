import express from "express";
import { edit, remove, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", see);
userRouter.get("/:id/edit", edit);
userRouter.get("/:id/remove", remove);

export default userRouter;
