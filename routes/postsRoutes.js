import express from "express";
import {
  publishPost
} from "./../controllers/postsController.js"
import validatePostFormat from "./../middlewares/validatePostFormat.js";

const postsRouter = express.Router();

postsRouter.post("/publish", validatePostFormat, publishPost);

export default postsRouter;