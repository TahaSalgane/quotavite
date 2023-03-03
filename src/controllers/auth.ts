import { Request, Response } from 'express';
const User = require('../models/User');
const yup = require('yup');
const bcrypt = require('bcryptjs');

exports.register = async (req: Request, res: Response) => {
    if (false) {
        console.log(req);
    }

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
    res.send('register');
};
exports.login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const authSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string(),
    });
    try {
        const authValidation = await authSchema.validate(email, password);
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ success: false, error: 'invalid credentials' });
        }
        await bcrypt.compare(password, user.password, function (err: any, ismatch: any) {
            if (err) {
                res.status(400).json({ success: false, message: 'unmatched', authValidation });
            }
            if (ismatch) {
                res.status(200).json({ success: true, message: 'matched' });
            } else {
                res.status(400).json({ success: false, message: 'unmatched' });
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
