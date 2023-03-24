import { Schema, model, Document, Types } from 'mongoose';

export interface CommentInterface extends Document {
    quoteId: Types.ObjectId;
    user: Types.ObjectId;
    text: string;
    username: string;
}
const CommentSchema = new Schema<CommentInterface>(
    {
        quoteId: {
            type: Schema.Types.ObjectId,
            ref: 'Quote',
            require: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        text: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
);
const Comment = model('Comment', CommentSchema);
export default Comment;
