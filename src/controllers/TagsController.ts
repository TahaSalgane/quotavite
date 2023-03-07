import { Request, Response } from 'express';
import Tag from '../models/Tags';
import { yupValidation, categorieSchema } from '../utils/YupValidation';
const createTag = async (req: Request, res: Response) => {
    const { name } = req.body;
    const bodyValidation = await yupValidation(categorieSchema, { name });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const tags = await Tag.create({ name });
        return res.status(201).json({ success: true, tags });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getAllTag = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find();
        if (tags) {
            res.status(200).json(tags);
        } else {
            res.status(403).json({ success: false, message: 'there is a problem' });
        }
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};
const getSingleTag = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            res.status(403).json({ success: false, message: 'tag not found' });
        }
        res.status(200).json(tag);
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};

const deleteTag = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return res.status(404).json({ success: false, message: 'tag not found' });
        }
        await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'tag has been deleted successfully' });
    } catch (error: any) {
        res.status(403).json({ success: false, message: error.message });
    }
};
const updateTag = async (req: Request, res: Response) => {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
        return res.status(404).json({ success: false, message: 'quote not found' });
    }
    const { name } = req.body;
    const bodyValidation = await yupValidation(categorieSchema, { name });
    if (!bodyValidation.ok) return res.json(bodyValidation.error.message);
    try {
        const tag = await Tag.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name,
                },
            },
            { new: true },
        );
        return res.status(201).json({ success: true, tag });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export { createTag, getAllTag, deleteTag, updateTag, getSingleTag };
