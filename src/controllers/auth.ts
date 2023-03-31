import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { yupValidation, registerSchema, loginSchema } from '../utils/YupValidation';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { ResponseError, UserDataInterface } from '../utils/type';
import responseData from '../utils/responseData';
import VerificationToken from '../models/VerificationToken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail';
const secret = process.env.SECRET_OR_KEY_JWT ?? '';

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const bodyValidation = await yupValidation(registerSchema, { username, email, password });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const checkEmail = await User.findOne({ email: email });
        const checUsername = await User.findOne({ username: username });
        if (checkEmail) {
            const error = new Error('email already exists');
            (error as ResponseError).statusCode = 400;
            throw error;
        }
        if (checUsername) {
            const error = new Error('username already exists');
            (error as ResponseError).statusCode = 400;
            throw error;
        }
        const passwordHashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: passwordHashed });
        console.log(user.email);
        const verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        });
        await verificationToken.save();
        const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`;
        const htmlTemplate = `
            <div>
            <p>Click on the link below to verify your email</p>
            <a href="${link}">Verify</a>
            </div>`;
        await sendEmail(user.email, 'Verify Your Email', htmlTemplate);
        return responseData(res, true, 200, null, 'we sent to you an email , please verify your email adresse ');
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const bodyValidation = await yupValidation(loginSchema, { email, password });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            const error = new Error('invalid credentials');
            (error as ResponseError).statusCode = 400;
            throw error;
        }
        if (user.status === -1) {
            const error = new Error('this user is banned');
            (error as ResponseError).statusCode = 400;
            throw error;
        }
        if (user.status === 0) {
            return responseData(res, true, 400, null, 'we sent to you an email , please verify your email adresse ');
        }
        await bcrypt.compare(password, user?.password, function (err: any, ismatch: any) {
            if (err) {
                const error = new Error('invalid credentials');
                (error as ResponseError).statusCode = 400;
                throw error;
            }
            if (ismatch) {
                const userData = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                } as UserDataInterface;
                const token = jwt.sign(userData, secret, {
                    expiresIn: '1h',
                });
                return responseData(res, true, 200, null, token);
            }
        });
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const verifyUserAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return responseData(res, true, 200, null, 'invalid link');
        }
        const verificationToken = await VerificationToken.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!verificationToken) {
            return responseData(res, true, 200, null, 'invalid link');
        }
        user.status = 1;
        await user.save();

        await VerificationToken.deleteOne();

        return responseData(res, true, 200, null, 'your account verified');
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

export { login, register, verifyUserAccount };
