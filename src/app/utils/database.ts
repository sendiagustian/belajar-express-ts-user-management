import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "event",
            level: "error",
        },
        {
            emit: "event",
            level: "info",
        },
        {
            emit: "event",
            level: "warn",
        },
    ],
});

prismaClient.$on("query", (e) => {
    logger.info(`query => ${e.query}`);
});

prismaClient.$on("info", (e) => {
    logger.info(e.message);
});

prismaClient.$on("error", (e) => {
    logger.error(e.message);
});

prismaClient.$on("warn", (e) => {
    logger.warn(e.message);
});
