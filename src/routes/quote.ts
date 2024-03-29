import express from 'express';
const router = express.Router();

import {
    createQuote,
    getSingleQuote,
    getLatestQuotes,
    getPopulaireQuotes,
    deleteQuote,
    updateQuote,
    toggleLike,
    getAllOfQuotes,
    searchQuoteController,
} from '../controllers/QuotesController';
import checkAuth from '../middleware/checkAuth';

router.post('/', createQuote);
router.get('/', getPopulaireQuotes);
router.get('/latest', getLatestQuotes);
router.get('/quotes', getAllOfQuotes);
router.get('/searching/', searchQuoteController);
router.get('/:id', getSingleQuote);
router.delete('/:id', deleteQuote);
router.put('/:id', updateQuote);
router.put('/like/:id', checkAuth, toggleLike);

export default router;
