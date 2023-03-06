import { Request, Response } from 'express';
import Quote from '../models/Quotes';
import { yupValidation, quoteSchema } from '../utils/YupValidation';
const createQuote = async (req: Request, res: Response) => {
    const { content, author, tags } = req.body;
    const bodyValidation = await yupValidation(quoteSchema, { content, author, tags });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const quote = await Quote.create({ content, author, tags });
        return res.status(201).json({ success: true, quote });
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
                .skip((+pageNumber - 1) * PER_PAGE)
                .limit(PER_PAGE)
                .sort({ like: 1 });
        } else if (tag) {
            quotes = await Quote.find({ tags: tag }).sort({ like: 1 });
        } else {
            quotes = await Quote.find({}).sort({ like: 1 });
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

export { createQuote, getSingleQuote, getLatestQuotes, getPopulaireQuotes };
