import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.";

const server = express();

dotenv.config();

server.use(cors());
server.use(express.json());
server.use(router);

server.listen(process.env.SERVERPORT);