import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export type UserModel = {
    username: string;
    name: string;
    status: string;
    token?: string;
};

export function toUserModel(user: User): UserModel {
    return {
        name: user.name,
        username: user.username,
        status: user.status,
    };
}
