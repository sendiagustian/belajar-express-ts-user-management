import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../errors/response_error";
import { ErrorResponse } from "../../data/dto/response/error_response";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        const message: string = `Validation Error : ${JSON.stringify(error)}`;

        const response: ErrorResponse<string> = {
            status: 400,
            errors: message,
        };

        res.status(400).json(response);
    } else if (error instanceof ResponseError) {
        const message: string = error.message;

        const response: ErrorResponse<string> = {
            status: error.status,
            errors: message,
        };

        res.status(error.status).json(response);
    } else {
        const message: string = error.message;

        const response: ErrorResponse<string> = {
            status: 500,
            errors: message,
        };

        res.status(500).json(response);
    }
};
