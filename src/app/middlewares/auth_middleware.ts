import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../../data/dto/request/user_request";
import { prismaClient } from "../utils/database";
import { ErrorResponse } from "../../data/dto/response/error_response";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.get("X-API-TOKEN");

    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token,
            },
        });

        if (user) {
            req.user = user;
            next();
            return;
        }
    }

    const message: string = "Unauthorized";
    const response: ErrorResponse<string> = {
        status: 401,
        errors: message,
    };

    res.status(401).json(response).end();
};
