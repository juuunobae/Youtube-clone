import express from "express";

const userRouter = express.Router();

const userEdit = (req, res) => res.send("<h1> User Edit </h1>");

userRouter.get("/edit", userEdit);

export default userRouter;
