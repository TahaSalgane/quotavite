import { Schema, model } from 'mongoose';
export interface QuoteInterface {
    content: string;
    author: string;
    likes: string[];
    tags: any;
    likes_count: number;
}

const QuoteSchema = new Schema<QuoteInterface>(
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
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);
QuoteSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'quoteId',
    localField: '_id',
});
const Quote: any = model('Quote', QuoteSchema);

export default Quote;
