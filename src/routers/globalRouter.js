import express from "express";

const globalRouter = express.Router();

const Home = (req, res) => res.send("<h1> Home </h1>");

globalRouter.get("/", Home);

export default globalRouter;
