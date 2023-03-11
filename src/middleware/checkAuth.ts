import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { /*ResponseError,*/ CostumeRequest, UserData } from '../utils/type';
dotenv.config();
const secret = process.env.SECRET_OR_KEY_JWT ?? '';
const AuthChecker = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        // const error = new Error('Not authenticated.');
        // (error as ResponseError).statusCode = 401;
        // throw error;
        return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secret);
    } catch (err) {
        // const error = new Error('Not authenticated..');
        // (error as ResponseError).statusCode = 500;
        // throw error;
        return res.status(500).json({ success: false, message: 'Not authenticated.' });
    }
    if (!decodedToken) {
        // const error = new Error('Not authenticated...');
        // (error as ResponseError).statusCode = 401;
        // throw error;
        return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }
    (req as CostumeRequest).userData = {
        _id: (decodedToken as UserData)._id,
        email: (decodedToken as UserData).email,
        username: (decodedToken as UserData).username,
    };
    next();
};

export default AuthChecker;
