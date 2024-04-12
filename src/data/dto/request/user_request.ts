import { Request } from "express";
import { User } from "@prisma/client";

export type UserRequest = Request & {
    user?: User;
};
