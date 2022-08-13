import express from "express";
import authRouter from "./authRoutes.js"

const router = express.Router();

router.use(authRouter);
router.use(hashTagRouter)

export default router;

