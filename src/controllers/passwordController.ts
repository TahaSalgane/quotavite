import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import VerificationToken from '../models/VerificationToken';
import * as bcrypt from 'bcryptjs';

import { yupValidation, resetPassword, validateEmail } from '../utils/YupValidation';
import { ResponseError } from '../utils/type';
import responseData from '../utils/responseData';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail';

const sendResetPasswordLink = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const bodyValidation = await yupValidation(validateEmail, { email });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User with given email dous not exist!');
            (error as ResponseError).statusCode = 400;
            throw error;
        }
        let verificationToken = await VerificationToken.findOne({ userId: user._id });
        if (!verificationToken) {
            verificationToken = new VerificationToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            });
            await verificationToken.save();
        }
        const link = `http://localhost:3000/reset-password/${user._id}/${verificationToken.token}`;
        const htmlTemplate = `<a href="${link}">click here to reset your password</a>`;
        await sendEmail(user.email, 'reset password', htmlTemplate);
        return responseData(res, true, 200, null, 'Password reset link sent to your email,Please check your inbox');
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

const getresetPasswordLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            const error = new Error('invalid link');
            (error as ResponseError).statusCode = 400;
            throw error;
        }

        const verificationToken = await VerificationToken.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!verificationToken) {
            const error = new Error('invalid link');
            (error as ResponseError).statusCode = 400;
            throw error;
        }
        return responseData(res, true, 200, null, 'valid url');
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const resetpassword = async (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmpassword } = req.body;
    const bodyValidation = await yupValidation(resetPassword, { password, confirmpassword });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            const error = new Error('invalid link');
            (error as ResponseError).statusCode = 400;
            throw error;
        }

        const verificationToken = await VerificationToken.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!verificationToken) {
            const error = new Error('invalid link');
            (error as ResponseError).statusCode = 400;
            throw error;
        }
        if (user.status != 0) {
            user.status = 1;
        }
        const passwordHashed = await bcrypt.hash(password, 10);
        user.password = passwordHashed;
        await user.save();
        await VerificationToken.deleteOne();
        return responseData(res, true, 200, null, 'password reset successfully,please log in');
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
export { sendResetPasswordLink, getresetPasswordLink, resetpassword };
