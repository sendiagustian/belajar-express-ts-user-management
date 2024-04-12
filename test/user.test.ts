import supertest from "supertest";
import { web } from "../src/app/configs/web";
import { logger } from "../src/app/utils//logging";
import { UserTest } from "./test_util";

describe("POST /api/v1/users", () => {
    // afterEach(async () => {
    //   await UserTest.delete();
    // });

    it("should reject register new user. if request is invalid", async () => {
        const response = await supertest(web).post("/api/v1/users").send({
            username: "",
            password: "",
            name: "",
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should register new user", async () => {
        const response = await supertest(web).post("/api/v1/users").send({
            username: "test",
            password: "rahasiabanget",
            name: "test",
        });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });
});

describe("POST /api/v1/users/login", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should be able to login", async () => {
        const response = await supertest(web).post("/api/v1/users/login").send({
            username: "test",
            password: "test",
        });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();
    });

    // it("should reject login if request is invalid", async () => {
    //   const response = await supertest(web).post("/api/v1/users/login").send({
    //     username: "salah",
    //     password: "test",
    //   });

    //   logger.debug(response.body);
    //   expect(response.status).toBe(401);
    //   expect(response.body.errors).toBeDefined();
    // });
});
