import express from "express";
import verifyTokenExistence from "../middlewares/verifyTokenExistence.js";
import {
  publishPost
} from "./../controllers/postsController.js"
import validatePostFormat from "./../middlewares/validatePostFormat.js";

const postsRouter = express.Router();

postsRouter.post("/publish", verifyTokenExistence, validatePostFormat, publishPost);

export default postsRouter;