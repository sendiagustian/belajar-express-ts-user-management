import express from "express";
import { UserController } from "../../controllers/user_controller";

export const publicRouter = express.Router();

publicRouter.post("/api/v1/users", UserController.register);
publicRouter.post("/api/v1/users/login", UserController.login);
