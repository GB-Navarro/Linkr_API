
import express from "express";
import authRouter from "./authRoutes.js"
import postsRouter from "./postsRoutes.js";
import hashTagRouter from "./hashTagRouter.js";

const router = express.Router();

router.use(authRouter);
router.use(postsRouter);
router.use(hashTagRouter)

export default router; 
