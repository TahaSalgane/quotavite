import { Schema, model } from 'mongoose';
interface tag {
    name: string;
}
const TagSchema = new Schema<tag>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
});
const Tag = model('Tag', TagSchema);
module.exports = Tag;
