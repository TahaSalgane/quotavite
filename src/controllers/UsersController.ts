import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../utils/type';
import User from '../models/User';
import responseData from '../utils/responseData';
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find({ isAdmin: false });
        if (users) {
            return responseData(res, true, 200, null, users);
        } else {
            const error = new Error('user not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const getSinglUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('user not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        return responseData(res, true, 200, null, user);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('user not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        await User.findByIdAndDelete(req.params.id);
        return responseData(res, true, 200, null, user);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        const error = new Error('user not found');
        (error as ResponseError).statusCode = 404;
        throw error;
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    status: -1,
                },
            },
            { new: true },
        );
        return responseData(res, true, 200, null, user);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const disabledUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        const error = new Error('user not found');
        (error as ResponseError).statusCode = 404;
        throw error;
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    status: 0,
                },
            },
            { new: true },
        );
        return responseData(res, true, 200, null, user);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const activerUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        const error = new Error('user not found');
        (error as ResponseError).statusCode = 404;
        throw error;
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    status: 1,
                },
            },
            { new: true },
        );
        return responseData(res, true, 200, null, user);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
export { getAllUsers, getSinglUser, deleteUser, blockUser, disabledUser, activerUser };
