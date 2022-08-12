import express from "express";
import verifyTokenExistence from "../middlewares/verifyTokenExistence.js";
import {
  publishPost,
  likesManager
} from "./../controllers/postsController.js"
import validatePostFormat from "./../middlewares/validatePostFormat.js";
import validateLikeFormat from "../middlewares/validateLikeFormat.js";

const postsRouter = express.Router();

postsRouter.post("/publish", verifyTokenExistence, validatePostFormat, publishPost);
postsRouter.post("/likes", verifyTokenExistence, validateLikeFormat, likesManager);

export default postsRouter;