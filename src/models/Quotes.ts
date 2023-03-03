import { Schema, model } from 'mongoose';

interface Quote {
    content: string;
    author: string;
    NumberReact: number;
    NumberComment: number;
    QuoteTags: any;
    DateCreation: Date;
}
const UserSchema = new Schema<Quote>({
    content: {
        type: String,
        required: [true, 'please provide a content'],
    },
    author: {
        type: String,
        required: [true, 'please provide the author'],
    },
    NumberReact: String,
    NumberComment: String,
    QuoteTags: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteTags',
    },
    DateCreation: Date,
});

const quote = model('Quote', UserSchema);

module.exports = quote;
