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
} from '../controllers/QuotesController';

router.post('/', createQuote);
router.get('/', getPopulaireQuotes);
router.get('/latest', getLatestQuotes);
router.get('/:id', getSingleQuote);
router.delete('/:id', deleteQuote);
router.put('/:id', updateQuote);
router.put('/like/:id', toggleLike);

export default router;
