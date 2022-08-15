import express from "express";
import authRouter from "./authRoutes.js"
import postsRouter from "./postsRoutes.js";
import userRouter from "./userRoutes.js";
import postUserRouter from "./postUserRouter.js";
import usersRouter from "./usersRouter.js";

const router = express.Router();

router.use(authRouter);
router.use(postsRouter);
router.use(userRouter);
router.use(postUserRouter)
router.use(usersRouter)

export default router;
