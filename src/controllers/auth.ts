import { Request, Response } from 'express';
import User from '../models/User';
import { yupValidation, authSchema } from '../utils/YupValidation';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const secret = process.env.SECRET_OR_KEY_JWT ?? '';

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const passwordHashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: passwordHashed });
        res.status(201).json({
            success: true,
            user,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const bodyValidation = await yupValidation(authSchema, { email, password });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'invalid credentials' });
        }
        await bcrypt.compare(password, user?.password, function (err: any, ismatch: any) {
            if (err) {
                return res.status(400).json({ success: false, message: 'invalid credentials' });
            }
            if (ismatch) {
                const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, secret, {
                    expiresIn: '1h',
                });

                return res.status(200).json({ success: true, realData: token });
            } else {
                return res.status(400).json({ success: false, message: 'invalid credentials' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export { login, register };
