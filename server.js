import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express();

dotenv.config();

server.use(cors());
server.use(express.json());

server.listen(process.env.SERVERPORT);