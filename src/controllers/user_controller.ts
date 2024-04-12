import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user_service";
import { BaseResponse } from "../data/dto/response/base_response";
import { CreateUserRequest } from "../data/dto/request/create_user_request";
import { UserModel } from "../data/models/user_model";
import { LoginUserRequest } from "../data/dto/request/login_user_request";
import { UpdateUserRequest } from "../data/dto/request/user_update_request";
import { MessageResponse } from "../data/dto/response/message_response";
import { logger } from "../app/utils/logging";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const data = await UserService.register(request);

            const response: BaseResponse<UserModel> = {
                status: res.statusCode,
                data: data,
            };

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const data = await UserService.login(request);

            const response: BaseResponse<UserModel> = {
                status: res.statusCode,
                data: data,
            };

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async getUser(_: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserService.gets();

            const response: BaseResponse<UserModel[]> = {
                status: res.statusCode,
                data,
            };

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async getByUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.params.username;
            const data = await UserService.getByUsername(username);

            const response: BaseResponse<UserModel> = {
                status: res.statusCode,
                data,
            };

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const value = req.query.value as string;
            const status = req.query.status as string | undefined;
            const data = await UserService.search(value, status);
            const response: BaseResponse<UserModel[]> = {
                status: res.statusCode,
                data,
            };
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.params.username;
            console.log(req.body);

            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const data = await UserService.updateUser(username, request);

            const response: BaseResponse<UserModel> = {
                status: res.statusCode,
                data,
            };

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username;
            await UserService.logout(username);

            const response: MessageResponse = {
                status: res.statusCode,
                message: "Logout success",
            };

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username;
            await UserService.delete(username);

            const response: MessageResponse = {
                status: res.statusCode,
                message: "User deleted",
            };

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}
