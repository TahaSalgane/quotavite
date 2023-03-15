import { Request, Response } from 'express';

import { load } from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import cron from 'node-cron';
import Quote from '../models/Quotes';
import responseData from '../utils/responseData';
import { CostumeRequest } from '../utils/type';
import { yupValidation, quoteSchema } from '../utils/YupValidation';
const createQuote = async (req: Request, res: Response) => {
    const { content, author, tags } = req.body;
    const bodyValidation = await yupValidation(quoteSchema, { content, author, tags });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const quote = await Quote.create({ content, author, tags });
        const freshQuote = await Quote.findById(quote._id).populate('tags').populate('likes');
        return res.status(201).json({ success: true, realData: freshQuote });
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
                .populate('tags')
                .populate('likes')
                .sort({ createdAt: -1 });
        } else if (tag) {
            quotes = await Quote.find({ tags: tag }).sort({ createdAt: -1 }).populate('tags').populate('likes');
        } else {
            quotes = await Quote.find({}).sort({ createdAt: -1 }).populate('tags').populate('likes');
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
        quote.content = content;
        quote.author = author;
        quote.tags = tags;
        await quote.save();
        const freshQuote = await Quote.findById(quote._id).populate('tags').populate('likes');
        return res.status(201).json({ success: true, realData: freshQuote });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const toggleLike = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = (req as CostumeRequest).userData;
    const userID = userData._id;
    try {
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(500).json({ success: false, message: 'quote not found' });
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
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
const webSrapper = async (req: Request, res: Response) => {
    try {
        const url = 'https://www.brainyquote.com/topics/love-quotes';
        axios
            .get(url)
            .then((response: AxiosResponse) => {
                const cheerioLad = load(response.data);
                const quotes: any[] = [];

                cheerioLad('.bqQt').each((i: number, el: any) => {
                    const quote = cheerioLad(el).find('.b-qt').text().trim();
                    const author = cheerioLad(el).find('.bq-aut').text();
                    console.log(author);
                    quotes.push({ quote, author });
                });
                cron.schedule('1 * * * * *', () => {
                    console.log(quotes);
                });
            })
            .catch((error: Error) => {
                console.log(error);
            });
        return responseData(res, true, 200, null, null);
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export {
    createQuote,
    getSingleQuote,
    getLatestQuotes,
    getPopulaireQuotes,
    deleteQuote,
    updateQuote,
    toggleLike,
    webSrapper,
};
