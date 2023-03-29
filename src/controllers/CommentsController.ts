import { NextFunction, Request, Response } from 'express';
import Comment, { CommentInterface } from '../models/Comment';
import User from '../models/User';

import responseData from '../utils/responseData';

import { CostumeRequest, ResponseError } from '../utils/type';
// import { yupValidation, createCommentSchema } from '../utils/YupValidation';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { quoteId, text } = req.body;
    const userData = (req as CostumeRequest).userData;
    const userID = userData._id;
    const profile: any = await User.findById(userID);

    // const bodyValidation = await yupValidation(createCommentSchema, {
    //     quoteId,
    //     text,
    // });
    // if (!bodyValidation.ok) {
    //     const error = new Error(bodyValidation.error.message);
    //     (error as ResponseError).statusCode = 200;
    //     throw error;
    // }
    try {
        const createdComment: CommentInterface = await Comment.create({
            text,
            quoteId,
            user: userData,
            username: profile.username,
        });
        return responseData(res, true, 200, null, createdComment);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const getAllComent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.find().populate('user');
        return responseData(res, true, 200, null, comment);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            const error = new Error('comment not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        const userData = (req as CostumeRequest).userData;
        if (userData.isAdmin || userData._id === comment.user.toString()) {
            await Comment.findByIdAndDelete(req.params.id);
            return responseData(res, true, 200, null, 'comment has been deleted');
        } else {
            return responseData(res, true, 403, null, 'accces denied , not allowed ');
        }
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const { text } = req.body;
        if (!comment) {
            const error = new Error('comment not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        const userData = (req as CostumeRequest).userData;
        if (userData._id != comment.user.toString()) {
            return responseData(res, true, 403, null, '"access denied, only user himself can edit his comment"');
        }
        comment.text = text;
        await comment.save();
        const freshQuote = await Comment.findById(comment._id);
        // const updateComment = await Comment.findByIdAndUpdate(req.params.id, { $set: { text: req.body.text } });
        return responseData(res, true, 200, null, freshQuote);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

export { createComment, getAllComent, deleteComment, updateComment };
