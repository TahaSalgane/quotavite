import { Schema, model, Document } from 'mongoose';

export interface TagInterface extends Document {
    name: string;
}
const TagSchema = new Schema<TagInterface>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
});
const Tag = model('Tag', TagSchema);
export default Tag;
