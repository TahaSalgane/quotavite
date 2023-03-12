import { Schema, model } from 'mongoose';
interface UserInterface {
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    status: number;
    isAdmin: boolean;
}
const UserSchema = new Schema<UserInterface>({
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
    isAdmin: {
        type: Boolean,
        default: false,
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
