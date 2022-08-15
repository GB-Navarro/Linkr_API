import express from "express";
import authRouter from "./authRoutes.js"
import postsRouter from "./postsRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

router.use(authRouter);
router.use(postsRouter);
router.use(userRouter);

export default router;