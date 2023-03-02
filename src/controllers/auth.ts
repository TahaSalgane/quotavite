import { Request, Response } from 'express';
const User = require('../models/User');

exports.register = async (req: Request, res: Response) => {
    if (false) {
        console.log(req);
    }
    
    const objUsers = {
        username: 'taha',
        email: 'tata@gmail.com',
        password: 'fqfqpf',
    };
    try {
        const user = User.create(objUsers);
        await user.save();
        res.status(200).json({
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
exports.login = (req: Request, res: Response) => {
    if (false) {
        console.log(req);
    }
    res.send('login');
};
