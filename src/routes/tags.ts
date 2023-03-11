import express from 'express';
const router = express.Router();
import { createTag, getAllTag, deleteTag, updateTag, getSingleTag } from '../controllers/TagsController';
import checkAuth from '../middleware/checkAuth';
router.post('/', createTag);
router.get('/', checkAuth, getAllTag);
router.get('/:id', getSingleTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
