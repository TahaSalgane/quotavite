import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../utils/type';
const ErrorHanlder = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (false) console.log(next);
    console.log('Middleware Error Hadnling');
    const errStatus = (err as ResponseError).statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        message: errMsg,
    });
};
export default ErrorHanlder;
