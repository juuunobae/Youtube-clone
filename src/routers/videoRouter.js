import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); // localhost:4000/videos/:id ( id = 각 model들의 id가 들어갈 변수 )
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); // localhost:4000/videos/:id/edit ( get request, post request )
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo); // localhost:4000/videos/:id/delete
videoRouter.route("/upload").get(getUpload).post(postUpload); // localhost:4000/vidoes/upload ( get request, post request )

export default videoRouter;
