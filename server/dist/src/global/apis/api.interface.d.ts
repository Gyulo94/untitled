export interface ApiSuccess<T> {
    statusCode: number;
    method: string;
    path: string;
    message: string;
    body: T | null;
    timestamp: string;
}
export interface ApiError {
    statusCode: number;
    path: string;
    message: string;
    code?: string;
    timestamp: string;
}
export type Api<T> = ApiSuccess<T> | ApiError;
