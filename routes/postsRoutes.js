import express from "express";
import verifyTokenExistence from "../middlewares/verifyTokenExistence.js";
import {
  publishPost,
  addLike,
  removeLike,
  getPosts,
  deletePost,
  editPost,
  getPostsByUserId
} from "./../controllers/postsController.js"
import validatePostFormat from "./../middlewares/validatePostFormat.js";
import validateLikeFormat from "../middlewares/validateLikeFormat.js";
import validateToken from "../middlewares/validateToken.js";
import validatePostEdit from "../schemas/validatePostEdit.js"; 

const postsRouter = express.Router();

postsRouter.post("/publish", verifyTokenExistence, validatePostFormat, publishPost);
postsRouter.post("/addlike", verifyTokenExistence, validateLikeFormat, addLike);
postsRouter.post("/removelike", verifyTokenExistence, validateLikeFormat, removeLike);
postsRouter.get("/posts", verifyTokenExistence, getPosts);
postsRouter.delete("/post/:id", verifyTokenExistence, deletePost);
postsRouter.put("/posts/edit/:id", validateToken, validatePostEdit, editPost);
postsRouter.get("/posts/:userId", getPostsByUserId);

export default postsRouter;