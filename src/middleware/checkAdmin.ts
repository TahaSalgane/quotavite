import { Request, Response, NextFunction } from 'express';
import { ResponseError, CostumeRequest } from '../utils/type';

const AdminChecker = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CostumeRequest).userData;
    if (user.isAdmin === false) {
        const error = new Error('Not Admin.');
        (error as ResponseError).statusCode = 403;
        throw error;
    }
    next();
};

export default AdminChecker;
