import { Request, Response } from 'express';
import User from '../models/User';
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(403).json({ success: false, message: 'there is users' });
        }
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};
const getSinglUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(403).json({ success: false, message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'user has been deleted successfully' });
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};
const blockUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'user not found' });
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    status: -2,
                },
            },
            { new: true },
        );
        return res.status(201).json({ success: true, user });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
const disabledUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'user not found' });
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
        return res.status(201).json({ success: true, user });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export { getAllUsers, getSinglUser, deleteUser, blockUser, disabledUser };
