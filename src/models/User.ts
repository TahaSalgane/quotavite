import { Schema, model } from 'mongoose';
interface User {
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    status: number;
}
const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, 'please provide a username'],
    },
    email: {
        type: String,
        required: [true, 'please provide a email'],
    },
    password: {
        type: String,
        require: [true, 'please add a password'],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    status: {
        type: Number,
        default: 1,
    },
});

const User = model('User', UserSchema);

export default User;
