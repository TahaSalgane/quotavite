import express from 'express';
const router = express.Router();
import { createQuote, getSingleQuote, getLatestQuotes, getPopulaireQuotes } from '../controllers/QuotesController';

router.post('/', createQuote);
router.get('/', getPopulaireQuotes);
router.get('/latest', getLatestQuotes);
router.get('/:id', getSingleQuote);

export default router;
