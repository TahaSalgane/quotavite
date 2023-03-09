import { Schema, model } from 'mongoose';
interface Quote {
    content: string;
    author: string;
    likes: string[];
    tags: any;
    likes_count: number;
}

const QuoteSchema = new Schema<Quote>(
    {
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
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
    },
    { timestamps: true },
);

const Quote: any = model('Quote', QuoteSchema);

export default Quote;
