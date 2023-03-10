import { Request, Response } from 'express';
import Quote from '../models/Quotes';
import { yupValidation, quoteSchema } from '../utils/YupValidation';
const createQuote = async (req: Request, res: Response) => {
    const { content, author, tags } = req.body;
    const bodyValidation = await yupValidation(quoteSchema, { content, author, tags });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const quote = await Quote.create({ content, author, tags });
        return res.status(201).json({ success: true, realData: quote });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getPopulaireQuotes = async (req: Request, res: Response) => {
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
        res.status(200).json(quotes);
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};
const getLatestQuotes = async (req: Request, res: Response) => {
    const PER_PAGE = 10;
    const { pageNumber, tag } = req.query;
    let quotes;
    try {
        if (pageNumber) {
            quotes = await Quote.find()
                .skip((-pageNumber - 1) * PER_PAGE)
                .limit(PER_PAGE)
                .sort({ createdAt: -1 });
        } else if (tag) {
            quotes = await Quote.find({ tags: tag }).sort({ createdAt: -1 });
        } else {
            quotes = await Quote.find({}).sort({ createdAt: -1 }).populate('tags');
        }
        res.status(200).json(quotes);
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};
const getSingleQuote = async (req: Request, res: Response) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            res.status(403).json({ success: false, message: 'quote not found' });
        }
        res.status(200).json(quote);
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};

const deleteQuote = async (req: Request, res: Response) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ success: false, message: 'quote not found' });
        }
        await Quote.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'quote has been deleted successfully' });
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};
const updateQuote = async (req: Request, res: Response) => {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
        return res.status(404).json({ success: false, message: 'quote not found' });
    }
    const { content, author, tags } = req.body;
    const bodyValidation = await yupValidation(quoteSchema, { content, author, tags });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const quote = await Quote.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    content,
                    author,
                    tags,
                },
            },
            { new: true },
        );
        return res.status(201).json({ success: true, quote });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const toggleLike = async (req: Request, res: Response) => {
    let quote = await Quote.findById(req.params.id);
    if (!quote) {
        return res.status(500).json({ success: false, message: 'quote not found' });
    }
    const userID = '640713c5259c37297e284af7';
    const isquoteliked = quote.likes.find((user: number) => user.toString() === userID);
    try {
        if (isquoteliked) {
            quote = await Quote.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likes: userID },
                },
                { new: true },
            );
        } else {
            quote = await Quote.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { likes: userID },
                },
                { new: true },
            );
        }
        return res.status(200).json({ success: true, message: quote });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export { createQuote, getSingleQuote, getLatestQuotes, getPopulaireQuotes, deleteQuote, updateQuote, toggleLike };
