import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

// 프론트엔드에서 오는 qpi 요청을 처리한다.
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView); // video views 카운트를 추가하는 api router
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment); // video의 댓글을 추가하는 api router
apiRouter.delete("/comments/:id([0-9a-f]{24})", deleteComment); // video의 댓글을 삭제하는 api router

export default apiRouter;
