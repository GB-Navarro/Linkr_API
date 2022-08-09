import express from "express";
import {
  controllerExample
} from "./../controllers/controllerExample.js";

const exampleRouter = express.Router();

exampleRouter.get("/", controllerExample);

export default exampleRouter;