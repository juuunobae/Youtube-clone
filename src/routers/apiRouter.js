import express from "express";
import { registerView, createComment } from "../controllers/videoController";

const apiRouter = express.Router();

// video views 카운트를 추가하는 api router
// 프론트엔드에서 오는 qpi 요청을 처리한다.
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;
