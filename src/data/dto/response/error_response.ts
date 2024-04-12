export type ErrorResponse<T> = {
    status: number;
    errors: T;
};
