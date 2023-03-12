import { Response } from 'express';

const responseData = (res: Response, success: boolean, status: number, message?: string | null, realData?: any) => {
    const data = {
        success,
    };
    if (message) (data as any)['message'] = message;
    if (realData) (data as any)['realData'] = realData;
    return res.status(status).json(data);
};

export default responseData;
