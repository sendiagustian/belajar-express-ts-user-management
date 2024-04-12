import express from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { UserController } from "../../controllers/user_controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.get("/api/v1/users", UserController.getUser);
apiRouter.get("/api/v1/users/username/:username", UserController.getByUsername);
apiRouter.get("/api/v1/users/search", UserController.search);

apiRouter.patch("/api/v1/users/:username", UserController.updateUser);

apiRouter.post("/api/v1/users/logout", UserController.logout);

apiRouter.delete("/api/v1/users", UserController.delete);
