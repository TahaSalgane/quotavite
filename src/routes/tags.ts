import express from 'express';
const router = express.Router();
import { createTag, getAllTag, deleteTag, updateTag, getSingleTag } from '../controllers/TagsController';

router.post('/', createTag);
router.get('/', getAllTag);
router.get('/:id', getSingleTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
