import express from 'express';
const router = express.Router();
import { createComment, getAllComent, deleteComment, updateComment } from '../controllers/CommentsController';

import checkAuth from '../middleware/checkAuth';
import checkAdmin from '../middleware/checkAdmin';

router.get('/', checkAuth, checkAdmin, getAllComent);
router.post('/', checkAuth, createComment);
router.put('/:id', checkAuth, updateComment);
router.delete('/:id', checkAuth, deleteComment);
export default router;
