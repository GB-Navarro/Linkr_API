import express from "express";
import exampleRouter from "./routesExample.js";

const router = express.Router();

router.use(exampleRouter);

export default router;