import { Request, Response, NextFunction } from 'express';
import Tag from '../models/Tags';
import { yupValidation, tagSchema } from '../utils/YupValidation';
import { CostumeRequest, ResponseError } from '../utils/type';
import responseData from '../utils/responseData';

const createTag = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const bodyValidation = await yupValidation(tagSchema, { name });
    if (!bodyValidation.ok) {
        const error = new Error(bodyValidation.error.message);
        (error as ResponseError).statusCode = 400;
        throw error;
    }
    try {
        const tag = await Tag.create({ name });
        return responseData(res, true, 200, null, tag);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

const getAllTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log((req as CostumeRequest).userData);
        const tags = await Tag.find();
        if (tags) {
            return responseData(res, true, 200, null, tags);
        } else {
            const error = new Error('tags not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const getSingleTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            const error = new Error('tag not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        return responseData(res, true, 200, null, tag);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            const error = new Error('tag not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        await Tag.findByIdAndDelete(req.params.id);
        return responseData(res, true, 200, null, tag);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const updateTag = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const bodyValidation = await yupValidation(tagSchema, { name });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);

    const tag = await Tag.findById(req.params.id);
    if (!tag) {
        const error = new Error('tag not found');
        (error as ResponseError).statusCode = 404;
        throw error;
    }

    try {
        const tag = await Tag.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name,
                },
            },
            { new: true },
        );
        return responseData(res, true, 200, null, tag);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
export { createTag, getAllTag, deleteTag, updateTag, getSingleTag };
