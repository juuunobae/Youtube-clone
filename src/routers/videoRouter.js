import express from "express";

const videoRouter = express.Router();

const videoWatch = (req, res) => res.send("<h1> Video Watch </h1>");

videoRouter.get("/watch", videoWatch);

export default videoRouter;
