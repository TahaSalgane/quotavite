import { timeStamp } from 'console';
import { Schema, model } from 'mongoose';

interface Quote {
    content: string;
    author: string;
    likes: string[];
    tags: any;
}
interface tag {
    name: string;
}
const QuoteSchema = new Schema<Quote>({
    content: {
        type: String,
        required: [true, 'please provide a content'],
    },
    author: {
        type: String,
        required: [true, 'please provide the author'],
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag',
        },
    ],
});
const TagSchema = new Schema<tag>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
});

const Quote = model('Quote', QuoteSchema);
const Tag = model('Tag', TagSchema);

module.exports = { Quote, Tag };
