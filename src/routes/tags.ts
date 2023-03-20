import express from 'express';
const router = express.Router();
import { createTag, getAllTag, deleteTag, updateTag, getSingleTag } from '../controllers/TagsController';

import checkAuth from '../middleware/checkAuth';
import checkAdmin from '../middleware/checkAdmin';

router.post('/', checkAuth, checkAdmin, createTag);
router.get('/', getAllTag);
router.get('/:id', checkAuth, checkAdmin, getSingleTag);
router.put('/:id', checkAuth, checkAdmin, updateTag);
router.delete('/:id', checkAuth, checkAdmin, deleteTag);

export default router;
