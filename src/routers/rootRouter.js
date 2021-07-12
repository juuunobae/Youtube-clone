import express from "express";
import { getJoin, login, logout, postJoin } from "../controllers/userController";
import { search, home } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home); // localhost:4000/
rootRouter.route("/join").get(getJoin).post(postJoin); // localhost:4000/join ( get request, post request)
rootRouter.get("/login", login); // localhost:4000/login
rootRouter.get("/logout", logout); // localhost:4000/login
rootRouter.get("/search", search); // localhost:4000/login

export default rootRouter;
