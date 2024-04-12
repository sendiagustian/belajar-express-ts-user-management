import express from "express";
import { publicRouter } from "../routes/public_api";
import { errorMiddleware } from "../middlewares/error_middleware";
import { apiRouter } from "../routes/token_api";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
