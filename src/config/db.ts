import mongoose from 'mongoose';
const connectDB = async () => {
    const url = process.env.MONGO_URI ?? '';
    mongoose.set('strictQuery', false);
    await mongoose.connect(url);
    console.log('mongo connected');
};
export default connectDB;
