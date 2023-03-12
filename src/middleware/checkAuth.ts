import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ResponseError, CostumeRequest, UserDataInterface } from '../utils/type';
dotenv.config();
const secret = process.env.SECRET_OR_KEY_JWT ?? '';
const AuthChecker = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        (error as ResponseError).statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secret);
    } catch (err) {
        const error = new Error('Not authenticated..');
        (error as ResponseError).statusCode = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated...');
        (error as ResponseError).statusCode = 401;
        throw error;
    }
    (req as CostumeRequest).userData = {
        _id: (decodedToken as UserDataInterface)._id,
        email: (decodedToken as UserDataInterface).email,
        username: (decodedToken as UserDataInterface).username,
        isAdmin: (decodedToken as UserDataInterface).isAdmin,
    };
    next();
};

export default AuthChecker;
