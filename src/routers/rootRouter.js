import express from "express";
import { getJoin, login, logout, postJoin } from "../controllers/userController";
import { search, home } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;
