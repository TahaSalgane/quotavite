import { NextFunction, Request, Response } from 'express';

import Quote from '../models/Quotes';

import responseData from '../utils/responseData';
import { CostumeRequest, ResponseError } from '../utils/type';
import { yupValidation, quoteSchema } from '../utils/YupValidation';

const createQuote = async (req: Request, res: Response, next: NextFunction) => {
    const { content, author, tags } = req.body;
    const bodyValidation = await yupValidation(quoteSchema, { content, author, tags });
    if (!bodyValidation.ok) {
        const error = new Error(bodyValidation.error.message);
        (error as ResponseError).statusCode = 400;
        throw error;
    }
    try {
        const quote = await Quote.create({ content, author, tags });
        const freshQuote = await Quote.findById(quote._id).populate('tags').populate('likes');
        return responseData(res, true, 200, null, freshQuote);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

const getPopulaireQuotes = async (req: Request, res: Response, next: NextFunction) => {
    const PER_PAGE = 10;
    const { pageNumber, tag } = req.query;
    let quotes;
    try {
        if (pageNumber) {
            quotes = await Quote.find()
                .populate('tags')
                .populate('likes')
                .skip((+pageNumber - 1) * PER_PAGE)
                .limit(PER_PAGE)
                .sort({ like: 1 });
        } else if (tag) {
            quotes = await Quote.find({ tags: tag }).populate('tags').populate('likes').sort({ like: 1 });
        } else {
            quotes = await Quote.find({}).populate('tags').populate('likes').sort({ like: 1 });
        }
        return responseData(res, true, 200, null, quotes);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
// res.sta tus(403).json({ success: false, message: error.message });
const getLatestQuotes = async (req: Request, res: Response, next: NextFunction) => {
    const PER_PAGE = 10;
    const { pageNumber, tag } = req.query;
    let quotes;
    try {
        if (pageNumber) {
            quotes = await Quote.find()
                .skip((-pageNumber - 1) * PER_PAGE)
                .limit(PER_PAGE)
                .populate('tags')
                .populate('likes')
                .sort({ createdAt: -1 });
        } else if (tag) {
            quotes = await Quote.find({ tags: tag }).sort({ createdAt: -1 }).populate('tags').populate('likes');
        } else {
            quotes = await Quote.find({}).sort({ createdAt: -1 }).populate('tags').populate('likes');
        }
        return responseData(res, true, 200, null, quotes);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const getSingleQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            const error = new Error('quote not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        return responseData(res, true, 200, null, quote);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

const deleteQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            const error = new Error('quote not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        await Quote.findByIdAndDelete(req.params.id);
        return responseData(res, true, 200, null, quote);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
const updateQuote = async (req: Request, res: Response, next: NextFunction) => {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
        const error = new Error('quote not found');
        (error as ResponseError).statusCode = 404;
        throw error;
    }
    const { content, author, tags } = req.body;
    const bodyValidation = await yupValidation(quoteSchema, { content, author, tags });
    if (!bodyValidation.ok)
        if (!bodyValidation.ok) {
            const error = new Error(bodyValidation.error.message);
            (error as ResponseError).statusCode = 400;
            throw error;
        }
    try {
        quote.content = content;
        quote.author = author;
        quote.tags = tags;
        await quote.save();
        const freshQuote = await Quote.findById(quote._id).populate('tags').populate('likes');
        return responseData(res, true, 200, null, freshQuote);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};

const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userData = (req as CostumeRequest).userData;
    const userID = userData._id;
    try {
        const quote = await Quote.findById(id);
        if (!quote) {
            const error = new Error('quote not found');
            (error as ResponseError).statusCode = 404;
            throw error;
        }
        const qupteUpdateData = quote.likes.find((user: number) => user.toString() === userID)
            ? {
                  $pull: { likes: userData._id },
              }
            : {
                  $push: { likes: userID },
              };
        await Quote.findByIdAndUpdate(req.params.id, qupteUpdateData, { new: true });
        const freshQuote = await Quote.findById(quote._id).populate('tags').populate('likes');

        return responseData(res, true, 200, null, freshQuote);
    } catch (error: Error | ResponseError | any) {
        next(error);
    }
};
export { createQuote, getSingleQuote, getLatestQuotes, getPopulaireQuotes, deleteQuote, updateQuote, toggleLike };
