import { Request, Response } from 'express';
const Quote = require('../models/Quotes');
exports.createQuote = async (req: Request, res: Response) => {
    try {
        const { content, author, QuoteTags } = req.body;
        const quote = await Quote.create({ content, author, QuoteTags });
        res.status(201).json({ success: true, quote });
    } catch (error: any) {
        res.status(403).json({ success: false, error: error.message });
    }
};
