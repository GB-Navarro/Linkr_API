import express from "express";
import {
  publishPost
} from "./../controllers/postsController.js"

const postsRouter = express.Router();

postsRouter.post("/publish", publishPost);

export default postsRouter;