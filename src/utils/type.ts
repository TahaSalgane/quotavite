import { Request } from 'express';
import { Types } from 'mongoose';

export interface ResponseError extends Error {
    statusCode?: number;
}
export interface UserDataInterface {
    _id: string | Types.ObjectId;
    email: string;
    username: string;
    isAdmin: boolean;
}

export interface CostumeRequest extends Request {
    userData: UserDataInterface;
}
