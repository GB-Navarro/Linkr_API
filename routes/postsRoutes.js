import express from "express";
import verifyTokenExistence from "../middlewares/verifyTokenExistence.js";
import {
  publishPost,
  addLike
} from "./../controllers/postsController.js"
import validatePostFormat from "./../middlewares/validatePostFormat.js";

const postsRouter = express.Router();

postsRouter.post("/publish", verifyTokenExistence, validatePostFormat, publishPost);
postsRouter.post("/add-like", verifyTokenExistence, addLike);

export default postsRouter;