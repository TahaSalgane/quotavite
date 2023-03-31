import { Schema, model, Document, Types } from 'mongoose';

export interface VerificationTokenInterface extends Document {
    userId: Types.ObjectId;
    token: string;
}
const VerificationTokenSchema = new Schema<VerificationTokenInterface>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        token: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
);
const VerificationToken = model('VerificationToken', VerificationTokenSchema);
export default VerificationToken;
