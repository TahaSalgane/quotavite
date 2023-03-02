import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../utils/type';
const ErrorHandler = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    if (false) {
        console.log(next);
    }
    console.log('Middleware Error Hadnling');
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
};

export default ErrorHandler;
