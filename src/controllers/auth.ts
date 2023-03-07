import { Request, Response } from 'express';
const User = require('../models/User');
import { yupValidation, authSchema } from '../utils/YupValidation';
const bcrypt = require('bcryptjs');

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
            res.status(401).json({ success: false, error: 'invalid credentials' });
        }
        await bcrypt.compare(password, user.password, function (err: any, ismatch: any) {
            if (err) {
                res.status(400).json({ success: false, message: 'invalid credentials' });
            }
            if (ismatch) {
                res.status(200).json({ success: true, message: 'matched' });
            } else {
                res.status(400).json({ success: false, message: 'invalid credentials' });
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export { login, register };
