import { Validation } from "../app/validations/validation";
import { UserValidation } from "../app/validations/user_validation";
import { prismaClient } from "../app/utils/database";
import { ResponseError } from "../app/errors/response_error";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { CreateUserRequest } from "../data/dto/request/create_user_request";
import { UserModel, toUserModel } from "../data/models/user_model";
import { LoginUserRequest } from "../data/dto/request/login_user_request";
import { UpdateUserRequest } from "../data/dto/request/user_update_request";
import jwt from "jsonwebtoken";
import { logger } from "../app/utils/logging";

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserModel> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username,
            },
        });

        if (totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "Username already exists");
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest,
        });

        return toUserModel(user);
    }

    static async login(request: LoginUserRequest): Promise<UserModel> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username,
            },
        });

        if (!user) {
            throw new ResponseError(401, "Invalid username or password");
        }

        const passwordMatch = await bcrypt.compare(loginRequest.password, user.password);

        if (!passwordMatch) {
            throw new ResponseError(401, "Invalid username or password");
        }

        const userIsActive = user.status === "active";

        if (!userIsActive) {
            throw new ResponseError(401, "User is not active");
        }

        const secret: jwt.Secret = process.env.JWT_SECRET!;
        const token: string = jwt.sign(toUserModel(user), secret, {});

        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username,
            },
            data: {
                token: token,
            },
        });

        const response = toUserModel(user);

        response.token = user.token!;

        return response;
    }

    static async gets(): Promise<UserModel[]> {
        const users = await prismaClient.user.findMany();

        return users.map(toUserModel);
    }

    static async getByUsername(username: string): Promise<UserModel> {
        const user = await prismaClient.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        return toUserModel(user);
    }

    static async search(searchValue: string, status?: string | undefined): Promise<UserModel[]> {
        let users = await prismaClient.user.findMany({
            where: {
                OR: [{ name: { contains: searchValue } }, { username: { contains: searchValue } }],
            },
        });

        if (status) {
            users = await prismaClient.user.findMany({
                where: {
                    OR: [{ name: { contains: searchValue } }, { username: { contains: searchValue } }],
                    status: status,
                },
            });
        }

        return users.map(toUserModel);
    }

    static async updateUser(username: string, request: UpdateUserRequest): Promise<UserModel> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        const user = await prismaClient.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        if (updateRequest.password) {
            updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
        }

        const updatedUser = await prismaClient.user.update({
            where: {
                username: username,
            },
            data: updateRequest,
        });

        return toUserModel(updatedUser);
    }

    static async logout(username: string): Promise<void> {
        const user = await prismaClient.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        const tokenNotNull = user.token != null;

        if (!tokenNotNull) {
            throw new ResponseError(400, "User already logged out");
        }

        const result = await prismaClient.user.update({
            where: {
                username: username,
            },
            data: {
                token: null,
            },
        });
    }

    static async delete(username: string): Promise<void> {
        const user = await prismaClient.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        await prismaClient.user.update({
            where: {
                username: username,
            },
            data: { status: "deleted" },
        });
    }
}
