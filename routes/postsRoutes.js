import express from "express";
import verifyTokenExistence from "../middlewares/verifyTokenExistence.js";
import {
  publishPost,
  addLike,
  removeLike,
  getPosts
} from "./../controllers/postsController.js"
import validatePostFormat from "./../middlewares/validatePostFormat.js";
import validateLikeFormat from "../middlewares/validateLikeFormat.js";

const postsRouter = express.Router();

postsRouter.post("/publish", verifyTokenExistence, validatePostFormat, publishPost);
postsRouter.post("/addlike", verifyTokenExistence, validateLikeFormat, addLike);
postsRouter.post("/removelike", verifyTokenExistence, validateLikeFormat, removeLike);
postsRouter.get("/timeline", verifyTokenExistence, getPosts);

export default postsRouter;