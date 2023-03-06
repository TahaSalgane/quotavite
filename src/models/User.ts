import { Schema, model } from 'mongoose';
interface User {
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
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
});

const user = model('User', UserSchema);

module.exports = user;
