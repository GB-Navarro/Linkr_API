import express from "express";
import verifyTokenExistence from "../middlewares/verifyTokenExistence.js";
import { getUserDataFromToken } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/user", verifyTokenExistence, getUserDataFromToken);

export default userRouter;