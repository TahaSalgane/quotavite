import { Request } from 'express';

export interface ResponseError extends Error {
    statusCode?: number;
}
export interface UserData {
    username: string;
    email: string;
    _id: string;
}

export interface CostumeRequest extends Request {
    userData: UserData;
}
