import { prismaClient } from "../src/app/utils/database";
import brcypt from "bcrypt";

export class UserTest {
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test",
            },
        });
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                status: "active",
                password: await brcypt.hash("test", 10),
                token: "test",
            },
        });
    }
}
